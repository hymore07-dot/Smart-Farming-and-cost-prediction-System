import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, Menu, X, Phone, User, Bell, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Cost & Profit Prediction', path: '/predict' },
    { name: 'AI Disease Detection', path: '/disease', badge: 'AI VISION' },
    { name: 'Weather & Mandi', path: '/info' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Marquee Bar */}
      <div className="bg-green-100 text-green-800 text-xs font-semibold py-1.5 px-4 overflow-hidden flex items-center">
        <Bell className="w-3 h-3 mr-2 flex-shrink-0 text-green-700" />
        <marquee scrollamount="5" className="whitespace-nowrap">
          🟢 IMD LIVE SATELLITE FEED ACTIVE | 📊 E-NAM APMC SERVERS ONLINE | 📸 AI CROP DISEASE COMPUTER VISION SCANNER ACTIVE | Polling real-time mandi prices across 418 yards...
        </marquee>
      </div>

      <nav className="bg-[#f0faeb] border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex flex-col items-start justify-center">
                <div className="flex items-center space-x-1">
                  <Sprout className="h-6 w-6 text-green-700" />
                  <span className="text-xl font-extrabold text-green-800 tracking-tight leading-none mt-1">Sheti-Sarthi</span>
                </div>
                <span className="text-[9px] font-bold text-green-600 tracking-widest uppercase mt-0.5">Smart Farming Intelligence</span>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded text-xs font-bold uppercase transition-colors flex items-center ${
                    isActive(link.path)
                      ? 'bg-green-700 text-white shadow-sm'
                      : 'text-green-800 hover:bg-green-200/50'
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className={`ml-1.5 px-1.5 py-0.2 text-[9px] font-black rounded-full uppercase tracking-tighter ${
                      isActive(link.path) ? 'bg-orange-500 text-white' : 'bg-green-800 text-green-100'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              {localStorage.getItem('token') ? (
                <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.reload(); }} className="flex items-center text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-200 hover:bg-red-100 transition-colors">
                  Logout
                </button>
              ) : (
                <Link to="/auth" className="flex items-center text-xs font-bold text-green-700 bg-white px-3 py-1.5 rounded-full shadow-sm border border-green-200 hover:bg-green-50 transition-colors">
                  <User className="w-4 h-4 mr-1" />
                  Sign In
                </Link>
              )}
              <div className="bg-white rounded-full p-1 shadow-sm border border-green-100 flex items-center text-xs font-bold text-green-800">
                <button className="px-3 py-1 bg-green-50 rounded-full text-green-700">English</button>
                <button className="px-3 py-1 hover:bg-green-50 rounded-full">हिंदी</button>
                <button className="px-3 py-1 hover:bg-green-50 rounded-full">मराठी</button>
              </div>

              <div className="bg-orange-100 text-orange-800 px-3 py-1.5 rounded-full flex items-center text-sm font-bold border border-orange-200 cursor-pointer hover:bg-orange-200 transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                1800-180-1551
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-green-700 hover:text-green-800 hover:bg-green-200 focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-[#f0faeb] border-b border-green-200 pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-bold ${
                    isActive(link.path)
                      ? 'bg-green-700 text-white'
                      : 'text-green-800 hover:bg-green-200/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded font-black">
                        {link.badge}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
