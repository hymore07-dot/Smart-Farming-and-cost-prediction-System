import re

with open('src/pages/WeatherMarket.jsx', 'r', encoding='utf-8') as f:
    lines = f.read().split('\n')

correct_block = """                  <div className="relative flex-grow min-h-[300px] bg-gray-200 border-b border-gray-200">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=%C2%B0C&metricWind=km%2Fh&zoom=6&overlay=radar&product=radar&level=surface&lat=20.39&lon=78.13" 
                      frameBorder="0"
                      title="Live Weather Radar"
                      className="absolute inset-0"
                    ></iframe>
                    
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center shadow-lg pointer-events-none">
                      <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                      Rain Cell Detected (18km West)
                    </div>
                    <div className="absolute bottom-4 right-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-blue-400 pointer-events-none">
                      Showers in ~130 mins
                    </div>
                  </div>"""

lines[163:182] = [correct_block]

with open('src/pages/WeatherMarket.jsx', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))
