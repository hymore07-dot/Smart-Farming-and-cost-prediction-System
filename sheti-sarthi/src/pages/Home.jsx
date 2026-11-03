import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Sprout, CloudSun, Calendar, Activity, CheckCircle2, ShieldCheck, Users, Banknote, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';

const Home = () => {
  return (
    <div className="bg-[#f0faeb] min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center text-green-800 text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-green-600 mr-2"></span>
              Kharif 2026 AI Agro-Advisory Active
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
              Know Your Farming Costs & Assured Profits <span className="text-green-700 underline decoration-green-300 underline-offset-8">Before You Sow</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
              Smart AI estimates your seeds, fertilizer, labor, and irrigation expenses against live mandi market prices so you never farm at a loss.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link to="/predict" className="bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-800 transition-colors shadow-lg shadow-green-900/20 flex items-center justify-center">
                Calculate Cost & Profit Now <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/info" className="bg-white border-2 border-green-200 text-green-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-colors flex items-center justify-center">
                <CloudSun className="w-5 h-5 mr-2" /> View Mandi Rates & Weather
              </Link>
            </div>
            
            <div className="flex items-center space-x-8 text-sm font-semibold text-gray-700">
              <div className="flex items-center"><Users className="w-5 h-5 text-green-600 mr-2" /> 1.4 Lakh+ Farmers Guided</div>
              <div className="flex items-center"><ShieldCheck className="w-5 h-5 text-green-600 mr-2" /> ICAR Verified Crop Models</div>
              <div className="flex items-center"><Banknote className="w-5 h-5 text-green-600 mr-2" /> 100% Free For Marginal Land</div>
            </div>
          </div>

          {/* Hero Widget Preview */}
          <div className="bg-white p-6 rounded-2xl shadow-xl shadow-green-900/5 border border-green-100">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1.5 rounded-full text-green-800 text-xs font-bold border border-green-100">
                <Sprout className="w-4 h-4" /> <span>Live Profit Forecast</span>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-100 px-2 py-1 rounded">Real-time APMC</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="border border-gray-100 p-3 rounded-lg bg-gray-50/50">
                <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Selected Crop</p>
                <p className="text-sm font-bold text-gray-900">Soyabean (JS 335)</p>
              </div>
              <div className="border border-gray-100 p-3 rounded-lg bg-gray-50/50">
                <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Land Parcel</p>
                <p className="text-sm font-bold text-gray-900">2.0 Acres (Loamy Soil)</p>
              </div>
            </div>

            <div className="flex justify-between text-xs font-bold text-gray-500 uppercase mb-2">
              <span>Investment vs Revenue Realization</span>
              <span className="text-green-600">ROI: +171%</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full mb-2 overflow-hidden flex">
              <div className="bg-orange-400 h-full w-[35%]"></div>
              <div className="bg-green-500 h-full w-[65%]"></div>
            </div>
            <div className="flex justify-between text-[10px] font-bold mb-6">
              <span className="text-gray-500"><span className="inline-block w-2 h-2 rounded-full bg-orange-400 mr-1"></span>Input Cost: ₹38,400</span>
              <span className="text-gray-500"><span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>Gross Yield: ₹81,000</span>
            </div>

            <div className="bg-[#e6f7e8] rounded-xl p-5 mb-6 border border-green-200 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] font-bold text-green-800 uppercase mb-1">Projected Clean Net Profit</p>
                <h3 className="text-4xl font-extrabold text-green-700">+₹42,600</h3>
                <p className="text-xs text-green-700/80 mt-1 font-medium">Assumes mandi price at ₹4,275/Qtl</p>
              </div>
              <Sprout className="absolute -right-4 -bottom-4 w-24 h-24 text-green-200/50 rotate-12" />
            </div>

            <Link to="/predict" className="w-full block text-center bg-green-50 text-green-800 py-3 rounded-lg font-bold text-sm border border-green-200 hover:bg-green-100 transition-colors">
              Customize Field Parameters
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-green-200/50">
        <div className="mb-12">
          <p className="text-green-700 text-xs font-bold tracking-widest uppercase mb-2">Complete Agri-Intelligence</p>
          <div className="flex justify-between items-end">
            <h2 className="text-3xl font-extrabold text-gray-900 max-w-xl leading-tight">Engineered For Farm Profitability & Risk Defense</h2>
            <span className="hidden md:flex items-center text-xs font-bold text-green-700 bg-green-100 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4 mr-1" /> Verified State Agri Guidelines
            </span>
          </div>
          <p className="text-gray-600 mt-4 max-w-2xl">Every operational phase covered: from soil testing and seed capital allocation to mandi harvest timing.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feature 1 */}
          <Link to="/predict" className="bg-white p-8 rounded-2xl shadow-sm border border-green-100 hover:border-green-300 hover:shadow-md transition-all group cursor-pointer block">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-green-700 p-3 rounded-xl text-white group-hover:scale-110 transition-transform shadow-sm">
                <Calculator className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase bg-green-50 text-green-700 px-2 py-1 rounded">Smart Agri Engine</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Cost & Profit Prediction Engine</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">Detailed breakdown of field preparation, certified seeds, tractor diesel, drip irrigation electricity, weedicides, and harvesting labor. Aligns projected yield with upcoming seasonal APMC mandi price indices.</p>
            <div className="flex flex-wrap gap-2 text-xs font-bold text-green-800 bg-green-50/50 p-3 rounded-lg border border-green-100">
              <span className="flex items-center"><CheckCircle2 className="w-3 h-3 mr-1 text-green-600" /> Dynamic Labor Rates</span>
              <span className="flex items-center ml-4"><CheckCircle2 className="w-3 h-3 mr-1 text-green-600" /> Subsidy Deductions</span>
              <span className="flex items-center ml-4"><CheckCircle2 className="w-3 h-3 mr-1 text-green-600" /> PDF Balance Sheet</span>
            </div>
          </Link>

          {/* Feature 2 */}
          

          {/* Feature 3 */}
          <Link to="/info" className="bg-white p-8 rounded-2xl shadow-sm border border-green-100 hover:border-green-300 hover:shadow-md transition-all group cursor-pointer block">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-orange-600 p-3 rounded-xl text-white group-hover:scale-110 transition-transform shadow-sm">
                <CloudSun className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase bg-orange-50 text-orange-700 px-2 py-1 rounded">API Integration</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Live Mandi & Weather Radar</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">Real-time APMC procurement rates across neighboring tehsils with 7-day hyper-local rainfall forecasting, frost risk alerts, and spray weather timing windows.</p>
            <div className="flex justify-between items-center text-xs font-bold pt-4 border-t border-gray-100">
              <span className="text-gray-500">Agmarknet direct sync</span>
              <span className="text-orange-600">5,200+ Mandis</span>
            </div>
          </Link>

          {/* Feature 4 & 5 (Half width each) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            

            <Link to="/disease" className="bg-white p-6 rounded-2xl shadow-sm border border-green-100 hover:border-red-300 hover:shadow-md transition-all group cursor-pointer block flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-red-600 p-2.5 rounded-lg text-white shadow-sm">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-bold uppercase bg-red-50 text-red-700 px-1.5 py-0.5 rounded">Computer Vision</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Leaf Disease Scanner</h3>
              <p className="text-gray-600 text-xs leading-relaxed flex-grow mb-4">Snap a quick photograph of infected crop leaves. Instant computer vision identifies rust, blight, or aphids and recommends exact chemical dosage.</p>
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 mt-auto pt-3 border-t border-gray-100">
                <span>Instant Mobile Diagnosis</span>
                <span className="text-green-600">94.8% Accuracy</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-green-700 text-xs font-bold tracking-widest uppercase mb-2">Simple Process</p>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">How Sheti-Sarthi Works in 3 Clear Steps</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">No complicated technical jargon. Input your local farm details and receive an immediate financial execution plan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-[#f0faeb] p-8 rounded-2xl border border-green-100">
              <div className="w-10 h-10 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-black text-xl mb-6">1</div>
              <p className="text-green-700 text-xs font-bold uppercase mb-2">Step 1</p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Select Crop & Land Size</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">Pick from 42+ regional crops (Cereals, Pulses, Oilseeds, Vegetables). Enter your parcel area in Acres, Bigha, Guntha, or Hectares.</p>
              <div className="bg-white/60 p-3 rounded-lg text-xs font-medium text-green-800 flex items-center border border-green-100">
                <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" /> Regional land conversions supported
              </div>
            </div>
            {/* Step 2 */}
            <div className="bg-[#f0faeb] p-8 rounded-2xl border border-green-100">
              <div className="w-10 h-10 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-black text-xl mb-6">2</div>
              <p className="text-green-700 text-xs font-bold uppercase mb-2">Step 2</p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Soil & Irrigation Setup</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">Choose your soil profile (Black Cotton, Red, Alluvial, Sandy Loam) and your watering mode (Borewell Drip, Canal, Sprinkler, or Rainfed).</p>
              <div className="bg-white/60 p-3 rounded-lg text-xs font-medium text-green-800 flex items-center border border-green-100">
                <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" /> Matches power subsidy schedules
              </div>
            </div>
            {/* Step 3 */}
            <div className="bg-[#f0faeb] p-8 rounded-2xl border border-green-100">
              <div className="w-10 h-10 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-black text-xl mb-6">3</div>
              <p className="text-green-700 text-xs font-bold uppercase mb-2">Step 3</p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Audit & Mandi Sync</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">Obtain an itemized expense balance sheet, guaranteed break-even MSP values, and projected return at current mandis with 1-click PDF download.</p>
              <div className="bg-white/60 p-3 rounded-lg text-xs font-medium text-green-800 flex items-center border border-green-100">
                <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" /> Printable farm advisory sheet
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg shadow-green-900/5 border border-green-100 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-shrink-0 relative">
            <img src="/assets/indian_farmer.jpg" alt="Indian Farmer" className="w-40 h-40 rounded-2xl object-cover shadow-md" />
            <div className="absolute -bottom-4 -right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-[10px] font-bold border border-green-200 flex items-center shadow-sm">
              <ShieldCheck className="w-3 h-3 mr-1" /> Verified User
            </div>
          </div>
          <div>
            <div className="flex items-center text-red-600 font-bold text-[10px] uppercase tracking-widest mb-4">
              <span className="w-6 h-[2px] bg-red-600 mr-2"></span> Farmer Experience
            </div>
            <p className="text-xl text-gray-900 font-medium italic leading-relaxed mb-6">
              "Sheti-Sarthi saved me ₹18,000 on unnecessary fertilizer sprays and helped me time my onion harvest right before prices peaked in the Lasalgaon APMC. For the first time in 6 years, my ledger showed clear surplus before harvest day."
            </p>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-green-50 p-4 rounded-xl border border-green-100">
              <div className="mb-2 sm:mb-0">
                <p className="font-bold text-gray-900">Dattatraya Shinde</p>
                <p className="text-xs text-gray-500">Progressive Onion & Soybean Grower, Nashik, Maharashtra</p>
              </div>
              <div className="flex space-x-6 text-sm">
                <div>
                  <p className="text-[10px] uppercase text-gray-500 font-bold mb-0.5">Input Cost Saved</p>
                  <p className="font-extrabold text-green-700">₹18,000</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-gray-500 font-bold mb-0.5">Yield Enhancement</p>
                  <p className="font-extrabold text-green-700">+18.4%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-green-800 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 opacity-10">
            <Sprout className="w-96 h-96 text-white" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-green-300 font-bold text-xs tracking-widest uppercase mb-4">100% Free For All Farmers</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">Ready to Calculate Your Upcoming Harvest Profit?</h2>
            <p className="text-green-100 text-lg mb-10 max-w-2xl mx-auto">It takes less than 2 minutes. Get instant clarity on seed budgets, diesel estimates, and expected net earnings before investing a single rupee.</p>
            <Link to="/predict" className="inline-flex items-center bg-white text-green-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg">
              Start Prediction <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
