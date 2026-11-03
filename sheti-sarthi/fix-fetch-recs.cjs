const fs = require('fs');
let content = fs.readFileSync('src/pages/Recommendations.jsx', 'utf8');

const replacement = `  const fetchRecs = async () => {
    setLoading(true);
    try {
      const safeData = {
        ...formData,
        nitrogen: formData.nitrogen || 0,
        phosphorus: formData.phosphorus || 0,
        potassium: formData.potassium || 0,
        ph: formData.ph || 7.0,
        farmSize: formData.farmSize || 1,
        temperature: formData.temperature || 25,
        rainfall: formData.rainfall || 500
      };
      const data = await getCropRecommendations(safeData);
      setRecommendations(data);
    } catch (err) {
      console.error(err);
      alert('Error connecting to AI Server. Please ensure all fields have valid numbers.');
    } finally {
      setLoading(false);
    }
  };`;

content = content.replace(/const fetchRecs = async \(\) => \{[\s\S]*?setLoading\(false\);\s*\}\s*\};/, replacement);
fs.writeFileSync('src/pages/Recommendations.jsx', content);
