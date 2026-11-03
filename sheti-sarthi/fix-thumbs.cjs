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
  content = content.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/1\/14\/Soybean\.USDA\.jpg\/800px-Soybean\.USDA\.jpg/g, '/assets/soybean.jpg');
  content = content.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/d\/d3\/Cotton_Plant\.jpg\/800px-Cotton_Plant\.jpg/g, '/assets/cotton.jpg');
  content = content.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/a\/af\/Pigeon_pea_1\.jpg\/800px-Pigeon_pea_1\.jpg/g, '/assets/pigeon_pea.jpg');
  content = content.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/b\/b3\/Soybean_field\.jpg\/800px-Soybean_field\.jpg/g, '/assets/drone_view.jpg');
  content = content.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/7\/7b\/Phakopsora_pachyrhizi\.jpg\/800px-Phakopsora_pachyrhizi\.jpg/g, '/assets/disease_leaf.jpg');
  content = content.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/e\/e0\/Clouds_over_the_Atlantic_Ocean\.jpg\/800px-Clouds_over_the_Atlantic_Ocean\.jpg/g, '/assets/weather_map.jpg');
  content = content.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/1\/17\/Indian_Farmer\.jpg\/800px-Indian_Farmer\.jpg/g, '/assets/indian_farmer.jpg');
  fs.writeFileSync(path, content);
  console.log('Fixed thumbnails in', path);
});
