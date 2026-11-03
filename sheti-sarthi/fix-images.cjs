const fs = require('fs');
const files = [
  'src/services/api.js',
  'src/pages/Dashboard.jsx',
  'src/pages/DiseaseDetection.jsx',
  'src/pages/Home.jsx',
  'src/pages/WeatherMarket.jsx'
];

files.forEach(path => {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/1\/14\/Soybean\.USDA\.jpg/g, '/assets/soybean.jpg');
  content = content.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/d\/d3\/Cotton_Plant\.jpg/g, '/assets/cotton.jpg');
  content = content.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/a\/af\/Pigeon_pea_1\.jpg/g, '/assets/pigeon_pea.jpg');
  content = content.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/b\/b3\/Soybean_field\.jpg/g, '/assets/drone_view.jpg');
  content = content.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/7\/7b\/Phakopsora_pachyrhizi\.jpg/g, '/assets/disease_leaf.jpg');
  content = content.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/e\/e0\/Clouds_over_the_Atlantic_Ocean\.jpg/g, '/assets/weather_map.jpg');
  content = content.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/1\/17\/Indian_Farmer\.jpg/g, '/assets/indian_farmer.jpg');
  fs.writeFileSync(path, content);
  console.log('Fixed', path);
});
