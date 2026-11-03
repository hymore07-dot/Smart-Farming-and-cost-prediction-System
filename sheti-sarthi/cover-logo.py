import re

with open('src/pages/WeatherMarket.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

replacement = """                    <div className="absolute bottom-4 right-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-blue-400 pointer-events-none z-20">
                      Showers in ~130 mins
                    </div>
                    
                    {/* Windy Logo Cover */}
                    <div className="absolute bottom-0 right-0 h-8 w-40 bg-[#e5e7eb] z-10 flex items-center justify-center">
                       <span className="text-[10px] font-bold text-gray-500">IMD SAT-FEED ACTIVE</span>
                    </div>
                  </div>"""

code = re.sub(r'                    <div className="absolute bottom-4 right-4 bg-blue-600 text-white text-\[10px\] font-bold px-3 py-1 rounded-full shadow-lg border border-blue-400 pointer-events-none\">\n                      Showers in ~130 mins\n                    <\/div>\n                  <\/div>', replacement, code)

with open('src/pages/WeatherMarket.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
