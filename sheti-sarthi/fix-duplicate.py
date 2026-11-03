import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app = f.read()

# Replace the first occurrence of the import with nothing
app = app.replace("import PredictForm from './pages/PredictForm';\n", "", 1)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app)
