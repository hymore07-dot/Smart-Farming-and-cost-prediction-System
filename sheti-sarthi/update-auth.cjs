const fs = require('fs');
let content = fs.readFileSync('src/pages/Auth.jsx', 'utf8');

content = content.replace('const Auth = () => {', 'const Auth = ({ onLogin }) => {');
content = content.replace("navigate('/dashboard');", "if (onLogin) onLogin(); else window.location.href = '/';");

fs.writeFileSync('src/pages/Auth.jsx', content);
