import re

with open('src/pages/WeatherMarket.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

replacement = """                  <div className="relative flex-grow min-h-[300px] bg-gray-200 border-b border-gray-200">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=%C2%B0C&metricWind=km%2Fh&zoom=6&overlay=radar&product=radar&level=surface&lat=20.39&lon=78.13" 
                      frameBorder="0"
                      title="Live Weather Radar"
                      className="absolute inset-0"
                    ></iframe>
                  </div>"""

code = re.sub(r'<div className="relative flex-grow min-h-\[200px\] bg-gray-200 border-b border-gray-200\">[\s\S]*?<\/div>\n                  <\/div>', replacement, code)

with open('src/pages/WeatherMarket.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
