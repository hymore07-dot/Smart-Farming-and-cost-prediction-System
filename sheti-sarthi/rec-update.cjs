const fs = require('fs');
let content = fs.readFileSync('src/services/api.js', 'utf8');

const replacement = `export const getCropRecommendations = async (data) => {
  try {
    const response = await axios.post(\`\${API_BASE_URL}/recommendations\`, data);
    return response.data.recommendations;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};`;

content = content.replace(/export const getCropRecommendations = async[\s\S]*?1500\);\s*\}\);\s*\};/, replacement);
fs.writeFileSync('src/services/api.js', content);
