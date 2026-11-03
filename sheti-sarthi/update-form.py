import re

with open('src/pages/Recommendations.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Update initial formData state
new_state = """  const [formData, setFormData] = useState({
    soil: 'black',
    season: 'kharif',
    water: 'medium',
    budget: 'medium',
    nitrogen: 45,
    phosphorus: 20,
    potassium: 30,
    ph: 6.5,
    farmSize: 5,
    farmingMethod: 'chemical',
    temperature: 28,
    rainfall: 800,
    market: 'local'
  });"""

content = re.sub(r'const \[formData, setFormData\] = useState\(\{[\s\S]*?\}\);', new_state, content)

# Find the form and replace its content
form_replacement = """              <form onSubmit={handleSubmit}>
                {/* Section 1: Basic & Logistics */}
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Farm Basics</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center mb-1"><Target className="w-3 h-3 mr-1" /> Soil Classification</label>
                    <select value={formData.soil} onChange={e => setFormData({...formData, soil: e.target.value})} className="w-full text-sm border-green-200 bg-green-50 rounded-lg py-2 pl-3 focus:ring-green-500 focus:border-green-500 font-medium text-gray-800">
                      <option value="black">Black Cotton Soil (Regur)</option>
                      <option value="red">Red Soil</option>
                      <option value="alluvial">Alluvial Soil</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center mb-1"><Calendar className="w-3 h-3 mr-1" /> Season</label>
                    <select value={formData.season} onChange={e => setFormData({...formData, season: e.target.value})} className="w-full text-sm border-green-200 bg-green-50 rounded-lg py-2 pl-3 focus:ring-green-500 focus:border-green-500 font-medium text-gray-800">
                      <option value="kharif">Kharif (Monsoon)</option>
                      <option value="rabi">Rabi (Winter)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center mb-1"><Scale className="w-3 h-3 mr-1" /> Farm Size (Acres)</label>
                    <input type="number" value={formData.farmSize} onChange={e => setFormData({...formData, farmSize: e.target.value})} className="w-full text-sm border-gray-200 bg-white rounded-lg py-2 px-3 focus:ring-green-500 font-medium" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center mb-1"><Sprout className="w-3 h-3 mr-1" /> Farming Method</label>
                    <select value={formData.farmingMethod} onChange={e => setFormData({...formData, farmingMethod: e.target.value})} className="w-full text-sm border-gray-200 bg-white rounded-lg py-2 pl-3 focus:ring-green-500 font-medium text-gray-800">
                      <option value="chemical">Conventional (Chemical)</option>
                      <option value="organic">100% Organic</option>
                    </select>
                  </div>
                </div>

                {/* Section 2: Soil Nutrients */}
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Soil Nutrients (N-P-K & pH)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Nitrogen (N) mg/kg</label>
                    <input type="number" value={formData.nitrogen} onChange={e => setFormData({...formData, nitrogen: e.target.value})} className="w-full text-sm border-gray-200 rounded-lg py-2 px-3 focus:ring-green-500 font-medium" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Phosphorus (P) mg/kg</label>
                    <input type="number" value={formData.phosphorus} onChange={e => setFormData({...formData, phosphorus: e.target.value})} className="w-full text-sm border-gray-200 rounded-lg py-2 px-3 focus:ring-green-500 font-medium" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Potassium (K) mg/kg</label>
                    <input type="number" value={formData.potassium} onChange={e => setFormData({...formData, potassium: e.target.value})} className="w-full text-sm border-gray-200 rounded-lg py-2 px-3 focus:ring-green-500 font-medium" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Soil pH</label>
                    <input type="number" step="0.1" value={formData.ph} onChange={e => setFormData({...formData, ph: e.target.value})} className="w-full text-sm border-gray-200 rounded-lg py-2 px-3 focus:ring-green-500 font-medium" />
                  </div>
                </div>

                {/* Section 3: Climate & Resources */}
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Climate & Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center mb-1 block"><ThermometerSnowflake className="w-3 h-3 mr-1" /> Avg Temp (°C)</label>
                    <input type="number" value={formData.temperature} onChange={e => setFormData({...formData, temperature: e.target.value})} className="w-full text-sm border-gray-200 rounded-lg py-2 px-3 focus:ring-green-500 font-medium" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center mb-1 block"><Droplets className="w-3 h-3 mr-1" /> Rainfall (mm)</label>
                    <input type="number" value={formData.rainfall} onChange={e => setFormData({...formData, rainfall: e.target.value})} className="w-full text-sm border-gray-200 rounded-lg py-2 px-3 focus:ring-green-500 font-medium" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center mb-1 block"><Wallet className="w-3 h-3 mr-1" /> Budget</label>
                    <select value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full text-sm border-gray-200 rounded-lg py-2 pl-3 focus:ring-green-500 font-medium text-gray-800">
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center mb-1 block"><Target className="w-3 h-3 mr-1" /> Target Market</label>
                    <select value={formData.market} onChange={e => setFormData({...formData, market: e.target.value})} className="w-full text-sm border-gray-200 rounded-lg py-2 pl-3 focus:ring-green-500 font-medium text-gray-800">
                      <option value="local">Local Mandi</option>
                      <option value="export">Export / Processing</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-4 sm:mb-0">
                    <ShieldCheck className="w-4 h-4 inline text-green-600 mr-1" /> Multi-factor AI analysis powered by Sheti-Sarthi
                  </p>
                  <button type="submit" className="w-full sm:w-auto bg-green-700 text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-green-800 transition-colors flex items-center justify-center">
                    Run Analysis <TrendingUp className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </form>"""

content = re.sub(r'<form onSubmit=\{handleSubmit\}>[\s\S]*?<\/form>', form_replacement, content)

with open('src/pages/Recommendations.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
