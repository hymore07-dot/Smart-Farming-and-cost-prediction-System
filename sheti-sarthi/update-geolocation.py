import re

with open('src/pages/WeatherMarket.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

state_replacement = """  const [location, setLocation] = useState('Yavatmal');
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState({ lat: 20.39, lon: 78.13 });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
          setLocation("Your Live Location");
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);"""

code = re.sub(r'  const \[location, setLocation\] = useState\(\'Yavatmal\'\);\n  const \[loading, setLoading\] = useState\(true\);', state_replacement, code)

iframe_replacement = """                  <div className="relative flex-grow min-h-[300px] bg-gray-200 border-b border-gray-200">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=%C2%B0C&metricWind=km%2Fh&zoom=8&overlay=radar&product=radar&level=surface&lat=${coords.lat}&lon=${coords.lon}`} 
                      frameBorder="0"
                      title="Live Weather Radar"
                      className="absolute inset-0"
                    ></iframe>"""

code = re.sub(r'                  <div className="relative flex-grow min-h-\[300px\] bg-gray-200 border-b border-gray-200\">\n                    <iframe \n                      width="100%" \n                      height="100%" \n                      src="[^"]+" \n                      frameBorder="0"\n                      title="Live Weather Radar"\n                      className="absolute inset-0"\n                    ><\/iframe>', iframe_replacement, code)

with open('src/pages/WeatherMarket.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
