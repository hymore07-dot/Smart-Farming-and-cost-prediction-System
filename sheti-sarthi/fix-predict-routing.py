import re

# 1. Update App.jsx to include PredictForm
with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app = f.read()

app = re.sub(r"import Dashboard from '\./pages/Dashboard';", "import Dashboard from './pages/Dashboard';\nimport PredictForm from './pages/PredictForm';", app)
app = re.sub(r'<Route path="/dashboard" element=\{<Dashboard />\} />', '<Route path="/predict" element={<PredictForm />} />\n            <Route path="/dashboard" element={<Dashboard />} />', app)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app)

# 2. Update Navbar.jsx to point "Cost & Profit Prediction" to /predict
with open('src/components/layout/Navbar.jsx', 'r', encoding='utf-8') as f:
    nav = f.read()

nav = nav.replace("path: '/dashboard'", "path: '/predict'")

with open('src/components/layout/Navbar.jsx', 'w', encoding='utf-8') as f:
    f.write(nav)

# 3. Update Home.jsx to point /dashboard links to /predict
with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home = f.read()

home = home.replace('to="/dashboard"', 'to="/predict"')

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)

# 4. Add "Edit Parameters" button to Dashboard.jsx
with open('src/pages/Dashboard.jsx', 'r', encoding='utf-8') as f:
    dash = f.read()

# Add a Link to /predict near the top
import_link = "import { useLocation, Link } from 'react-router-dom';"
dash = dash.replace("import { useLocation } from 'react-router-dom';", import_link)

edit_btn = """              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs font-bold text-green-800 uppercase tracking-widest mb-2">
                  <span className="bg-green-200/50 px-2 py-0.5 rounded border border-green-200 mr-2">Kharif Season Forecast</span>
                  <span className="text-gray-500">Forecast Run #KL-88392</span>
                </div>
                <Link to="/predict" className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center">
                  Edit Parameters
                </Link>
              </div>"""

dash = dash.replace('<div className="flex items-center text-xs font-bold text-green-800 uppercase tracking-widest mb-2">\n                <span className="bg-green-200/50 px-2 py-0.5 rounded border border-green-200 mr-2">Kharif Season Forecast</span>\n                <span className="text-gray-500">Forecast Run #KL-88392</span>\n              </div>', edit_btn)

with open('src/pages/Dashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(dash)
