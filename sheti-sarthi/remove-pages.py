import re

# Update App.jsx
with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app_content = f.read()

app_content = re.sub(r"import Recommendations from '\./pages/Recommendations';\n", "", app_content)
app_content = re.sub(r"import Schedule from '\./pages/Schedule';\n", "", app_content)
app_content = re.sub(r"\s*<Route path=\"/recommendations\" element=\{<Recommendations />\} />", "", app_content)
app_content = re.sub(r"\s*<Route path=\"/schedule\" element=\{<Schedule />\} />", "", app_content)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app_content)

# Update Navbar.jsx
with open('src/components/layout/Navbar.jsx', 'r', encoding='utf-8') as f:
    nav_content = f.read()

nav_content = re.sub(r"\s*\{ name: 'Crop Recommendation', path: '/recommendations' \},", "", nav_content)
nav_content = re.sub(r"\s*\{ name: 'Farming Schedule', path: '/schedule' \},", "", nav_content)

with open('src/components/layout/Navbar.jsx', 'w', encoding='utf-8') as f:
    f.write(nav_content)

# Update Home.jsx
with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home_content = f.read()

home_content = re.sub(r'<Link to="/recommendations"[\s\S]*?</Link>', '', home_content)
home_content = re.sub(r'<Link to="/schedule"[\s\S]*?</Link>', '', home_content)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home_content)
