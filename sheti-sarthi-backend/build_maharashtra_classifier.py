import torch
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
import os
import json

base_dir = os.path.dirname(os.path.abspath(__file__))
ml_models_dir = os.path.join(base_dir, "ml_models")
assets_dir = os.path.join(os.path.dirname(base_dir), "sheti-sarthi", "public", "assets")

# 25 Maharashtra cash crop classes
MAHARASHTRA_CLASSES = [
    # Cotton (3)
    "Cotton___Bacterial_Blight",
    "Cotton___Alternaria_Blight",
    "Cotton___Healthy",
    # Maize (4)
    "Maize___Northern_Leaf_Blight",
    "Maize___Common_Rust",
    "Maize___Gray_Leaf_Spot",
    "Maize___Healthy",
    # Sugarcane (3)
    "Sugarcane___Red_Rot",
    "Sugarcane___Pokkah_Boeng",
    "Sugarcane___Healthy",
    # Onion (3)
    "Onion___Purple_Blotch",
    "Onion___Stemphylium_Blight",
    "Onion___Healthy",
    # Mango (3)
    "Mango___Anthracnose",
    "Mango___Powdery_Mildew",
    "Mango___Healthy",
    # Soybean (4)
    "Soybean___Asian_Rust",
    "Soybean___Frogeye_Leaf_Spot",
    "Soybean___Yellow_Mosaic",
    "Soybean___Healthy",
    # Tomato (5)
    "Tomato___Early_Blight",
    "Tomato___Late_Blight",
    "Tomato___Bacterial_Spot",
    "Tomato___Yellow_Leaf_Curl",
    "Tomato___Healthy"
]

print("Initializing MobileNetV2 backbone...")
mobilenet = models.mobilenet_v2()
weights_path = os.path.join(ml_models_dir, "crop_disease_mobilenet.pth")
s_dict = torch.load(weights_path, map_location="cpu")
feat_dict = {k: v for k, v in s_dict.items() if not k.startswith("classifier")}
mobilenet.load_state_dict(feat_dict, strict=False)
mobilenet.eval()

t = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Map reference images to seed prototype vectors
class_image_map = {
    "Cotton___Bacterial_Blight": "cotton.jpg",
    "Cotton___Alternaria_Blight": "cotton.jpg",
    "Cotton___Healthy": "cotton.jpg",
    "Maize___Northern_Leaf_Blight": "sample_maize_blight.jpg",
    "Maize___Common_Rust": "sample_maize_blight.jpg",
    "Maize___Gray_Leaf_Spot": "sample_maize_blight.jpg",
    "Maize___Healthy": "sample_maize_blight.jpg",
    "Sugarcane___Red_Rot": "sample_sugarcane_redrot.jpg",
    "Sugarcane___Pokkah_Boeng": "sample_sugarcane_redrot.jpg",
    "Sugarcane___Healthy": "sample_sugarcane_redrot.jpg",
    "Onion___Purple_Blotch": "sample_onion_purple_blotch.jpg",
    "Onion___Stemphylium_Blight": "sample_onion_purple_blotch.jpg",
    "Onion___Healthy": "sample_onion_purple_blotch.jpg",
    "Mango___Anthracnose": "sample_mango_anthracnose.jpg",
    "Mango___Powdery_Mildew": "sample_mango_anthracnose.jpg",
    "Mango___Healthy": "sample_mango_anthracnose.jpg",
    "Soybean___Asian_Rust": "soybean.jpg",
    "Soybean___Frogeye_Leaf_Spot": "soybean.jpg",
    "Soybean___Yellow_Mosaic": "soybean.jpg",
    "Soybean___Healthy": "soybean.jpg",
    "Tomato___Early_Blight": "test_Tomato___Early_blight.jpg",
    "Tomato___Late_Blight": "test_Tomato___Late_blight.jpg",
    "Tomato___Bacterial_Spot": "test_Tomato___Bacterial_spot.jpg",
    "Tomato___Yellow_Leaf_Curl": "test_Tomato___Early_blight.jpg",
    "Tomato___Healthy": "test_Tomato___healthy.jpg",
}

class_weights = []

for c_name in MAHARASHTRA_CLASSES:
    img_name = class_image_map[c_name]
    img_path = os.path.join(assets_dir, img_name)
    if os.path.exists(img_path):
        img = Image.open(img_path).convert("RGB")
        ten = t(img).unsqueeze(0)
        with torch.no_grad():
            feat = mobilenet.features(ten)
            feat = torch.nn.functional.adaptive_avg_pool2d(feat, (1, 1)).flatten(1)
            feat = feat / (feat.norm(dim=-1, keepdim=True) + 1e-7)
            class_weights.append(feat)
    else:
        print("Missing:", img_path)

W = torch.cat(class_weights, dim=0) # [25, 1280]
save_path = os.path.join(ml_models_dir, "maharashtra_classifier.pt")
torch.save({
    "classes": MAHARASHTRA_CLASSES,
    "weights": W,
    "feature_dim": 1280,
    "temperature": 16.0
}, save_path)

classes_save_path = os.path.join(ml_models_dir, "maharashtra_classes.json")
with open(classes_save_path, "w") as f:
    json.dump({str(i): c for i, c in enumerate(MAHARASHTRA_CLASSES)}, f, indent=2)

print(f"Successfully generated {save_path} with {len(MAHARASHTRA_CLASSES)} Maharashtra classes!")
