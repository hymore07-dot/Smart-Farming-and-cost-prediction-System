const fs = require('fs');
let content = fs.readFileSync('src/services/api.js', 'utf8');

const replacement = `import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const predictCropCostAndProfit = async (data) => {
  try {
    const response = await axios.post(\`\${API_BASE_URL}/predict\`, data);
    return response.data;
  } catch (error) {
    console.error("Error predicting cost:", error);
    throw error;
  }
};`;

content = content.replace(/export const predictCropCostAndProfit = async[\s\S]*?1500\);\s*\}\);\s*\};/, replacement);
fs.writeFileSync('src/services/api.js', content);
