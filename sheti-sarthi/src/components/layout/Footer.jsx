import React from 'react';
import { Sprout, ExternalLink, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#e6f7e8] border-t border-green-200 mt-auto pt-12 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 border-b border-green-200/60 pb-12">
          
          {/* Brand & Mission */}
          <div className="space-y-4 pr-4">
            <div className="flex items-center space-x-1">
              <Sprout className="h-7 w-7 text-green-700" />
              <span className="text-2xl font-extrabold text-green-800 tracking-tight leading-none mt-1">Sheti-Sarthi</span>
            </div>
            <p className="text-sm text-green-900/80 leading-relaxed">
              Empowering Indian farmers through actionable crop intelligence, real-time market insights, and predictive precision agronomy.
            </p>
            <div className="flex items-center text-green-700 font-bold text-xs bg-green-200/50 w-fit px-3 py-1.5 rounded-full mt-2">
              <ShieldCheck className="w-4 h-4 mr-1.5" /> Ministry of Agriculture Verified Data
            </div>
          </div>

          {/* National Portals */}
          <div>
            <h4 className="font-bold text-green-900 mb-4">National Agri Portals</h4>
            <ul className="space-y-3 text-sm text-green-800/80">
              <li><a href="#" className="flex items-center hover:text-green-700 hover:underline"><ExternalLink className="w-3 h-3 mr-2" /> PM-KISAN Samman Nidhi</a></li>
              <li><a href="#" className="flex items-center hover:text-green-700 hover:underline"><ExternalLink className="w-3 h-3 mr-2" /> e-NAM (National Agriculture Market)</a></li>
              <li><a href="#" className="flex items-center hover:text-green-700 hover:underline"><ExternalLink className="w-3 h-3 mr-2" /> Soil Health Card Portal</a></li>
              <li><a href="#" className="flex items-center hover:text-green-700 hover:underline"><ExternalLink className="w-3 h-3 mr-2" /> Pradhan Mantri Fasal Bima Yojana</a></li>
            </ul>
          </div>

          {/* Platform Features */}
          <div>
            <h4 className="font-bold text-green-900 mb-4">Platform Features</h4>
            <ul className="space-y-3 text-sm text-green-800/80">
              <li><a href="#" className="hover:text-green-700 hover:underline">Seasonal Profit Estimator</a></li>
              <li><a href="#" className="hover:text-green-700 hover:underline">Fertilizer & Seed Cost Calculator</a></li>
              <li><a href="#" className="hover:text-green-700 hover:underline">AI Leaf Pest Scanner</a></li>
              <li><a href="#" className="hover:text-green-700 hover:underline">Nearest Mandi Price Ticker</a></li>
            </ul>
          </div>

          {/* Emergency & Assistance */}
          <div>
            <h4 className="font-bold text-green-900 mb-4">Emergency & Assistance</h4>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Kisan Call Centre (24x7 Toll Free)</p>
              <p className="text-xl font-bold text-green-700 mb-2">1800-180-1551</p>
              <p className="text-xs text-gray-600 leading-tight">Direct agronomist counseling in 22 regional languages</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-green-100/50 p-4 rounded-lg mb-8 text-xs text-green-900/70 leading-relaxed border border-green-200">
          <span className="font-bold text-green-800">Agricultural Advisory Disclaimer:</span> Crop yield predictions, input expense valuations, and mandi price recommendations are generated using machine learning models trained on regional agro-climatic histories and official state agmarket releases. Actual harvests and returns depend on immediate local climate variability, soil management practices, and local procurement dynamics.
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-green-800/60 font-medium">
          <p>© 2026 Sheti-Sarthi Agritech Platform. Built for Indian Agricultural Community.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-green-800">Privacy Policy</a>
            <a href="#" className="hover:text-green-800">Terms of Agro-Services</a>
            <a href="#" className="hover:text-green-800">Accessibility (AAA)</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
