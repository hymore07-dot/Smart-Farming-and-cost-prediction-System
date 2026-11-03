import re

# Update Dashboard.jsx
with open('src/pages/Dashboard.jsx', 'r', encoding='utf-8') as f:
    dash = f.read()

dash = dash.replace(
    '<Link to="/predict" className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center">',
    '<Link to="/predict" state={{ predictData }} className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center">'
)

with open('src/pages/Dashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(dash)

# Update PredictForm.jsx
with open('src/pages/PredictForm.jsx', 'r', encoding='utf-8') as f:
    form = f.read()

form_import = "import { useNavigate, useLocation } from 'react-router-dom';"
form = form.replace("import { useNavigate } from 'react-router-dom';", form_import)

replacement = """const PredictForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const initialState = location.state?.predictData || {
    crop: 'soybean', area: 5, location: '', irrigation: 'drip', soil: 'black', sowingDate: '',
    seedVariety: 'hybrid', fertilizerType: 'chemical', tractorOwnership: 'rented', storage: 'none',
    laborWage: 350, mandiDistance: 20, subsidy: 0, targetYield: 12, cropGrade: 'A'
  };
  
  const [formData, setFormData] = useState(initialState);"""

form = re.sub(r'const PredictForm = \(\) => \{[\s\S]*?cropGrade: \'A\'\n  \}\);', replacement, form)

with open('src/pages/PredictForm.jsx', 'w', encoding='utf-8') as f:
    f.write(form)
