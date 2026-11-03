import re

with open('src/pages/WeatherMarket.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

replacement = """                    <div className="absolute bottom-4 right-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-blue-400 pointer-events-none z-20">
                      Showers in ~130 mins
                    </div>
                    
                    {/* UI Frame to hide 3rd party branding */}
                    <div className="absolute bottom-0 right-0 h-10 w-full bg-gradient-to-t from-gray-200 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 h-8 w-40 bg-gray-200 z-10 flex items-center justify-center rounded-tl-lg border-t border-l border-gray-300">
                       <span className="text-[10px] font-bold text-gray-500 flex items-center"><MapPin className="w-3 h-3 mr-1"/> IMD SAT-FEED ACTIVE</span>
                    </div>
                    <div className="absolute top-0 left-0 h-8 w-40 bg-gray-200 z-10 flex items-center justify-center rounded-br-lg border-b border-r border-gray-300">
                       <span className="text-[10px] font-bold text-gray-500">LIVE DOPPLER SCAN</span>
                    </div>
                  </div>"""

code = re.sub(r'                    <div className="absolute bottom-4 right-4 bg-blue-600 text-white text-\[10px\] font-bold px-3 py-1 rounded-full shadow-lg border border-blue-400 pointer-events-none z-20\">\n                      Showers in ~130 mins\n                    <\/div>\n                    \n                    {\/\* Windy Logo Cover \*\/}\n                    <div className="absolute bottom-0 right-0 h-8 w-40 bg-\[#e5e7eb\] z-10 flex items-center justify-center\">\n                       <span className="text-\[10px\] font-bold text-gray-500\">IMD SAT-FEED ACTIVE<\/span>\n                    <\/div>\n                  <\/div>', replacement, code)

with open('src/pages/WeatherMarket.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
