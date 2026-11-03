import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

export const predictCropCostAndProfit = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, data);
    return response.data;
  } catch (error) {
    console.error("Error predicting cost:", error);
    throw error;
  }
};

export const getCropRecommendations = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/recommendations`, data);
    return response.data.recommendations;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};

export const getWeatherData = async (location, lat, lon) => {
  try {
    const params = { location };
    if (lat && lon) {
      params.lat = lat;
      params.lon = lon;
    }
    const response = await axios.get(`${API_BASE_URL}/weather`, { params, timeout: 5000 });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};

export const getMarketPrices = async (crop) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/market`, { params: { crop }, timeout: 8000 });
    return response.data;
  } catch (error) {
    console.error("Error fetching market prices:", error);
    throw error;
  }
};

export const getMandiStatus = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/market/status`, { timeout: 5000 });
    return response.data;
  } catch (error) {
    return { has_gov_key: false, source: "Agmarknet Maharashtra Daily Bulletin" };
  }
};

export const setMandiApiKey = async (apiKey) => {
  const response = await axios.post(`${API_BASE_URL}/market/set-key`, { api_key: apiKey });
  return response.data;
};

// Real Multimodal / PyTorch Disease Detection via FastAPI
export const detectDisease = async (imageFile, crop = '') => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);
    if (crop) {
      formData.append('crop', crop);
    }
    const response = await axios.post(`${API_BASE_URL}/disease/detect`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 40000,
    });
    return response.data;
  } catch (error) {
    console.error("API Error in detectDisease:", error);
    throw error;
  }
};

export const detectPresetDisease = async (presetKey, crop = 'Cotton') => {
  try {
    const response = await axios.post(`${API_BASE_URL}/disease/preset`, {
      preset_key: presetKey,
      crop: crop,
    }, { timeout: 15000 });
    return response.data;
  } catch (error) {
    console.error("API Error in detectPresetDisease:", error);
    throw error;
  }
};

export const getDiseasePresets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/disease/presets`, { timeout: 5000 });
    return response.data.presets;
  } catch (error) {
    console.error("API Error in getDiseasePresets:", error);
    return [
      { key: "cotton_blight", crop: "Cotton", name: "Bacterial Blight", severity: "Severe", sample_image: "/assets/cotton.jpg" },
      { key: "maize_blight", crop: "Maize", name: "Northern Leaf Blight", severity: "Severe", sample_image: "/assets/sample_maize_blight.jpg" },
      { key: "sugarcane_redrot", crop: "Sugarcane", name: "Sugarcane Red Rot", severity: "Critical", sample_image: "/assets/sample_sugarcane_redrot.jpg" },
      { key: "onion_purple_blotch", crop: "Onion", name: "Purple Blotch", severity: "Severe", sample_image: "/assets/sample_onion_purple_blotch.jpg" },
      { key: "mango_anthracnose", crop: "Mango", name: "Mango Anthracnose", severity: "Critical", sample_image: "/assets/sample_mango_anthracnose.jpg" },
      { key: "soybean_rust", crop: "Soybean", name: "Asian Soybean Rust", severity: "Severe", sample_image: "/assets/soybean.jpg" },
      { key: "tomato_late_blight", crop: "Tomato", name: "Tomato Late Blight", severity: "Critical", sample_image: "/assets/test_Tomato___Late_blight.jpg" },
      { key: "healthy_leaf", crop: "Tomato", name: "Healthy Plant Tissue", severity: "Optimal", sample_image: "/assets/test_Tomato___healthy.jpg" },
    ];
  }
};

export const getDiseaseStatus = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/disease/status`, { timeout: 5000 });
    return response.data;
  } catch (error) {
    console.error("Error fetching disease status:", error);
    return { has_google_key: false, active_engine: "PyTorch MobileNetV2 Local Engine" };
  }
};

export const setGoogleApiKey = async (apiKey) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/disease/set-key`, { api_key: apiKey });
    return response.data;
  } catch (error) {
    console.error("Error setting Google API key:", error);
    throw error;
  }
};
