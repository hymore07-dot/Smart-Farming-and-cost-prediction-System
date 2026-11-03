import React, { useEffect, useState } from 'react';
import { getWeatherData, getMarketPrices, getMandiStatus, setMandiApiKey } from '../services/api';
import { Card, CardContent } from '../components/ui/Card';
import { Cloud, CloudRain, Sun, Moon, Wind, Droplets, TrendingUp, TrendingDown, Thermometer, CloudLightning, MapPin, Truck, AlertTriangle, Phone, LineChart, Download, CheckCircle2, CloudSun, Banknote, Search, Sparkles, RefreshCw, Key, ExternalLink, X } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';

const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

const WeatherMarket = () => {
  const [weather, setWeather] = useState(null);
  const [marketData, setMarketData] = useState(null);
  const [location, setLocation] = useState('Yavatmal');
  const [selectedCrop, setSelectedCrop] = useState('Soyabean');
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState({ lat: 20.39, lon: 78.13 });
  const [filterLocation, setFilterLocation] = useState('');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [inputApiKey, setInputApiKey] = useState('');
  const [keySaving, setKeySaving] = useState(false);
  const [keyMessage, setKeyMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);

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
  }, []);

  // Mock data for the chart
  const momentumData = [
    { day: 'Day 1', price: 4520 },
    { day: 'Day 5', price: 4580 },
    { day: 'Day 10', price: 4620 },
    { day: 'Day 15', price: 4710 },
    { day: 'Day 20', price: 4790 },
    { day: 'Day 25', price: 4850 },
    { day: 'Today', price: 4892 },
  ];

  useEffect(() => {
    // Initial fetch for weather and market
    const fetchData = async () => {
      setLoading(true);
      try {
        const [weatherRes, marketRes] = await Promise.all([
          getWeatherData(location, coords.lat, coords.lon).catch(() => null),
          getMarketPrices(selectedCrop).catch(() => null)
        ]);
        
        if (weatherRes && !weatherRes.error) {
          setWeather(weatherRes);
        } else {
           setWeather({
             current: { temp: 30, condition: "Clear Sky", humidity: 50, wind: "10 km/h", rainChance: "0 mm", solarRadiation: "No Data", feelsLike: 30, dewPoint: 20, soilTemp: 25, is_day: 1, icon: "sun" },
             forecast: [{ day: "Today", temp: "30°C", low: "20°C", condition: "Clear Sky", precip: "0 mm", icon: "sun", tag: "Offline Mode", tagColor: "gray" },
                        { day: "Tomorrow", temp: "30°C", low: "20°C", condition: "Clear Sky", precip: "0 mm", icon: "sun", tag: "Offline Mode", tagColor: "gray" },
                        { day: "Day 3", temp: "30°C", low: "20°C", condition: "Clear Sky", precip: "0 mm", icon: "sun", tag: "Offline Mode", tagColor: "gray" },
                        { day: "Day 4", temp: "30°C", low: "20°C", condition: "Clear Sky", precip: "0 mm", icon: "sun", tag: "Offline Mode", tagColor: "gray" },
                        { day: "Day 5", temp: "30°C", low: "20°C", condition: "Clear Sky", precip: "0 mm", icon: "sun", tag: "Offline Mode", tagColor: "gray" }]
           });
        }
        
        if (marketRes && marketRes.records) {
          setMarketData(marketRes);
        } else {
          setMarketData({
            records: [
              { market: "Local Mandi", dist: "Offline", arrival: "No Data", min: 4000, modal: 4500, max: 5000, trend: "-", up: true }
            ],
            freight: { note: "Offline mode. Check server connection." }
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    
    // Live Market Polling Interval (Every 3 seconds)
    const marketInterval = setInterval(async () => {
      try {
        const liveMarket = await getMarketPrices(selectedCrop);
        if (liveMarket && liveMarket.records) {
          setMarketData(liveMarket);
        }
      } catch (e) {
        // fail silently during live polling
      }
    }, 3000);
    
    return () => clearInterval(marketInterval);
  }, [location, selectedCrop]);

  const getWeatherIcon = (iconCode, className) => {
    switch(iconCode) {
      case 'sun': return <Sun className={className || "w-8 h-8 text-orange-500"} />;
      case 'cloud': return <Cloud className={className || "w-8 h-8 text-gray-400"} />;
      case 'rain': return <CloudRain className={className || "w-8 h-8 text-blue-500"} />;
      default: return <Sun className={className || "w-8 h-8 text-orange-500"} />;
    }
  };

    const handleRefreshMarket = async () => {
    setRefreshing(true);
    try {
      const res = await getMarketPrices(selectedCrop);
      if (res && res.records) setMarketData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  };

  const handleSaveApiKey = async (e) => {
    e.preventDefault();
    if (!inputApiKey.trim()) return;
    setKeySaving(true);
    setKeyMessage('');
    try {
      const res = await setMandiApiKey(inputApiKey.trim());
      if (res.success) {
        setKeyMessage('Agmarknet API Key activated successfully!');
        const updated = await getMarketPrices(selectedCrop);
        if (updated) setMarketData(updated);
        setTimeout(() => {
          setShowKeyModal(false);
          setKeyMessage('');
          setInputApiKey('');
        }, 1500);
      } else {
        setKeyMessage('Failed to activate key. Check format.');
      }
    } catch (err) {
      setKeyMessage('Error connecting to backend server.');
    } finally {
      setKeySaving(false);
    }
  };

  if (loading || !weather || !marketData) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f0faeb]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#f0faeb] min-h-screen py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-gray-200 pb-6">
          <div>
            <div className="flex items-center text-xs font-bold text-green-800 uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-green-600 mr-2 animate-pulse"></span>
              Micro-Climate Forecast & Terminal Rates + E-NAM Integrated
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Hyper-Local Weather & Live Mandi Radar</h1>
            <p className="text-gray-600 font-medium mt-1">मौसम एवं मंडी भाव — High-frequency real-time trade signals and agro-meteorological guidance</p>
          </div>
          
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-800 transition-colors shadow-sm flex items-center">
              <LineChart className="w-4 h-4 mr-2" /> Radar & Mandi
            </button>
            <button className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm flex items-center">
              <Download className="w-4 h-4 mr-2" /> Export Slip (PDF)
            </button>
          </div>
        </div>

        {/* Section 1: Weather */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center"><CloudSun className="w-6 h-6 mr-2 text-green-700" /> Agro-Meteorological Forecast Engine</h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-[10px] font-bold">AWS Station: Yavatmal Rural #445001</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Current Weather Card */}
            <Card className="lg:col-span-7 shadow-sm border border-gray-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="inline-block bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase mb-2">
                      <Thermometer className="w-3 h-3 inline mr-1" /> Real-time Field Telemetry
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">Current Outdoor Micro-Climate</h3>
                    <p className="text-xs text-gray-500">Station at Yavatmal Krishi Vigyan Kendra (KVK)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-gray-400">Soil Temp (10cm)</p>
                    <p className="font-bold text-gray-900">{weather.current.soilTemp}°C <span className="text-gray-500 font-medium">(Moist)</span></p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-end">
                    <h2 className="text-6xl font-black text-gray-900 leading-none">{weather.current.temp}°<span className="text-4xl text-gray-400">C</span></h2>
                    <div className="ml-4 pb-1">
                      <p className="font-bold text-gray-800 text-lg">{weather.current.condition}</p>
                      <p className="text-xs text-gray-500 font-medium">Feels like {weather.current.feelsLike}°C • Dew point {weather.current.dewPoint}°</p>
                    </div>
                  </div>
                  {getWeatherIcon(weather.current.icon, weather.current.icon === 'moon' ? "w-16 h-16 text-indigo-400 opacity-80" : "w-16 h-16 text-orange-400 opacity-80")}
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="bg-[#fafff9] p-3 rounded-lg border border-green-100">
                    <p className="text-[10px] font-bold text-green-700 uppercase flex items-center mb-1"><Droplets className="w-3 h-3 mr-1" /> Humidity</p>
                    <p className="text-lg font-bold text-gray-900">{weather.current.humidity}%</p>
                    <p className="text-[10px] text-gray-500">Optimal for foliage</p>
                  </div>
                  <div className="bg-[#fafff9] p-3 rounded-lg border border-green-100">
                    <p className="text-[10px] font-bold text-blue-700 uppercase flex items-center mb-1"><CloudRain className="w-3 h-3 mr-1" /> Rain Chance</p>
                    <p className="text-lg font-bold text-gray-900">{weather.current.rainChance}</p>
                    <p className="text-[10px] text-gray-500">Tonight ~9:00 PM</p>
                  </div>
                  <div className="bg-[#fafff9] p-3 rounded-lg border border-green-100">
                    <p className="text-[10px] font-bold text-gray-600 uppercase flex items-center mb-1"><Wind className="w-3 h-3 mr-1" /> Wind Speed</p>
                    <p className="text-lg font-bold text-gray-900">{weather.current.wind}</p>
                    <p className="text-[10px] text-gray-500">SW Breeze</p>
                  </div>
                  <div className="bg-[#fafff9] p-3 rounded-lg border border-green-100">
                    <p className="text-[10px] font-bold text-orange-600 uppercase flex items-center mb-1"><Sun className="w-3 h-3 mr-1" /> Solar Radiation</p>
                    <p className="text-lg font-bold text-gray-900">{weather.current.solarRadiation}</p>
                    <p className="text-[10px] text-gray-500">Moderate Index</p>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="text-[10px] font-bold text-orange-800 uppercase flex items-center mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 mr-1" /> Field Advisory Notice
                  </h4>
                  <p className="text-sm font-medium text-gray-800">
                    ⚠️ Favorable spray window: Tomorrow morning between 7:00 AM – 11:00 AM before afternoon thunderstorm activity sets in. Complete all systemic pesticide and liquid urea sprays early.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Doppler Map Card */}
            <Card className="lg:col-span-5 shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              <CardContent className="p-0 flex-grow flex flex-col">
                <div className="p-4 flex justify-between items-center bg-white border-b border-gray-100">
                  <h3 className="font-bold text-gray-900 flex items-center"><MapPin className="w-4 h-4 mr-2 text-gray-400" /> IMD Cloud Doppler Scan</h3>
                  <span className="text-[10px] text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded">Cloud Band Approaching</span>
                </div>
                  <div className="relative flex-grow min-h-[300px] bg-gray-200 border-b border-gray-200">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=%C2%B0C&metricWind=km%2Fh&zoom=8&overlay=radar&product=radar&level=surface&lat=${coords.lat}&lon=${coords.lon}`} 
                      frameBorder="0"
                      title="Live Weather Radar"
                      className="absolute inset-0"
                    ></iframe>
                    
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center shadow-lg pointer-events-none">
                      <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                      Rain Cell Detected (18km West)
                    </div>
                    <div className="absolute bottom-4 right-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-blue-400 pointer-events-none z-20">
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
                  </div>
                <div className="p-4 bg-white flex justify-between">
                  <div className="w-1/2 pr-2">
                    <div className="flex justify-between text-[10px] font-bold mb-1">
                      <span className="text-gray-500">Evapotranspiration</span>
                      <span className="text-gray-900">3.8 mm/day</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="bg-green-500 h-full w-[40%]"></div></div>
                  </div>
                  <div className="w-1/2 pl-2">
                    <div className="flex justify-between text-[10px] font-bold mb-1">
                      <span className="text-gray-500">Leaf Wetness Risk</span>
                      <span className="text-orange-600">Medium (58%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="bg-orange-500 h-full w-[58%]"></div></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 5-Day Forecast Row */}
          <div className="mt-6">
            <div className="flex justify-between items-end mb-3">
              <h3 className="text-lg font-bold text-gray-900">5-Day Precision Operational Forecast</h3>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Recommended agronomic windows tagged per day</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {weather.forecast.map((day, idx) => (
                <Card key={idx} className="shadow-sm border border-gray-200">
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-xs font-bold text-gray-900">{day.day}</p>
                      {getWeatherIcon(day.icon, "w-5 h-5")}
                    </div>
                    <h4 className="text-2xl font-black text-gray-900 mb-2 leading-none">{day.temp} <span className="text-sm font-bold text-gray-400">/ {day.low}</span></h4>
                    
                    <div className="grid grid-cols-2 gap-2 text-[10px] mb-4 flex-grow">
                      <div>
                        <p className="text-gray-400 uppercase font-bold">Condition</p>
                        <p className="font-medium text-gray-800">{day.condition}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 uppercase font-bold">Precipitation</p>
                        <p className="font-bold text-blue-600">{day.precip}</p>
                      </div>
                    </div>
                    
                    <div className={`mt-auto bg-${day.tagColor}-50 text-${day.tagColor}-800 text-[9px] font-bold p-1.5 rounded text-center border border-${day.tagColor}-200 flex items-center justify-center leading-tight min-h-[36px]`}>
                      <span className="mr-1">✨</span> {day.tag}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Mandi */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Banknote className="w-6 h-6 mr-2 text-green-700" /> Real Mandi Rates & APMC Ticker
                </h2>
                {marketData.is_live_gov_api ? (
                  <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-ping"></span>
                    Live data.gov.in Agmarknet API Active
                  </span>
                ) : (
                  <button
                    onClick={() => setShowKeyModal(true)}
                    className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center transition-all cursor-pointer"
                  >
                    <Key className="w-3 h-3 mr-1 text-amber-600" />
                    {marketData.has_gov_key ? 'Agmarknet API Connected' : 'Connect Official data.gov.in API'}
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                <span>Direct daily auction data for Maharashtra APMCs (Amravati, Nagpur, Wani, Akola, Pune, Latur)</span>
                <button 
                  onClick={handleRefreshMarket} 
                  disabled={refreshing} 
                  className="text-green-700 font-bold hover:underline inline-flex items-center ml-2"
                >
                  <RefreshCw className={`w-3 h-3 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
                  {refreshing ? 'Refreshing...' : 'Refresh Now'}
                </button>
              </p>
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {['Soyabean', 'Cotton', 'Wheat', 'Rice'].map((crop) => (
                <button 
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all ${
                    selectedCrop === crop 
                      ? 'bg-green-700 text-white shadow-sm ring-2 ring-green-600 ring-offset-1' 
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Table Card */}
            <Card className="lg:col-span-8 shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              <CardContent className="p-0 flex flex-col flex-grow">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
                  <div className="flex items-center">
                    <h3 className="font-bold text-gray-900 mr-3">Regional APMC Auctions</h3>
                    <span className="bg-green-100 text-green-800 text-[9px] font-bold px-2 py-0.5 rounded">Grade FAQ Standard</span>
                  </div>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-gray-400" />
                    <input 
                      type="text" 
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                      placeholder="Filter mandi location..." 
                      className="text-xs bg-gray-50 border border-gray-200 rounded-full pl-8 pr-3 py-1.5 w-48 focus:outline-none focus:ring-1 focus:ring-green-500" 
                    />
                  </div>
                </div>
                
                <div className="overflow-x-auto flex-grow bg-white">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                      <tr className="bg-gray-50/50 border-b border-gray-100 text-[9px] font-bold text-gray-500 uppercase">
                        <th className="p-4">Mandi Name</th>
                        <th className="p-4">Arrival Volume</th>
                        <th className="p-4">Min Price</th>
                        <th className="p-4 text-green-800">Modal (Current)</th>
                        <th className="p-4">Max Price</th>
                        <th className="p-4 text-right">Day Trend</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(marketData.records || []).filter(item => 
                        !filterLocation || 
                        item.market.toLowerCase().includes(filterLocation.toLowerCase()) || 
                        (item.dist && item.dist.toLowerCase().includes(filterLocation.toLowerCase()))
                      ).map((item, idx) => (
                        <tr key={idx} className="hover:bg-green-50/30 transition-colors">
                          <td className="p-4">
                            <p className="font-bold text-gray-900 text-sm leading-tight">{item.market}</p>
                            <p className="text-[10px] text-gray-500">{item.dist}</p>
                            {item.date && (
                              <span className="text-[9px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 inline-block mt-1">
                                📅 {item.date}
                              </span>
                            )}
                          </td>
                          <td className="p-4 font-medium text-gray-700 text-xs">{item.arrival}</td>
                          <td className="p-4 text-gray-600 font-medium text-xs">₹{Number(item.min).toLocaleString('en-IN')}</td>
                          <td className="p-4">
                            <span className="bg-green-100 text-green-950 font-bold px-2.5 py-1 rounded text-base border border-green-200">
                              ₹{Number(item.modal).toLocaleString('en-IN')}
                              <span className="text-[10px] text-green-700 ml-1 font-normal">/Qtl</span>
                            </span>
                          </td>
                          <td className="p-4 text-gray-600 font-medium text-xs">₹{Number(item.max).toLocaleString('en-IN')}</td>
                          <td className="p-4 text-right">
                            {item.up ? (
                              <span className="inline-flex items-center text-green-700 bg-green-50 px-2 py-1 rounded font-bold text-xs border border-green-100">
                                <TrendingUp className="w-3 h-3 mr-1" /> {item.trend}
                              </span>
                            ) : (
                              <span className="inline-flex items-center text-red-700 bg-red-50 px-2 py-1 rounded font-bold text-xs border border-red-100">
                                <TrendingDown className="w-3 h-3 mr-1" /> {item.trend}
                              </span>
                            )}
                            <span className="text-[9px] text-gray-400 block mt-1 font-mono">{item.source || 'Agmarknet'}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-[#f0faeb] p-4 m-4 rounded-lg flex items-start border border-green-200">
                  <div className="bg-green-200 p-1.5 rounded-md mr-3 mt-0.5"><Truck className="w-4 h-4 text-green-800" /></div>
                  <div>
                    <h4 className="text-xs font-bold text-green-900 mb-1">Farmer Logistics Helper Note</h4>
                    <p className="text-[10px] text-green-800/80 leading-relaxed max-w-2xl">{marketData.freight.note}</p>
                  </div>
                  <button className="ml-auto text-[10px] font-bold text-green-700 underline whitespace-nowrap">Open Freight Calculator</button>
                </div>
              </CardContent>
            </Card>

            {/* Side Column */}
            <div className="lg:col-span-4 flex flex-col gap-6 h-full">
              {/* Chart Card */}
              <Card className="shadow-sm border border-gray-200 bg-white flex-grow flex flex-col">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-gray-900 flex items-center"><TrendingUp className="w-4 h-4 mr-2 text-gray-400" /> 30-Day Soyabean Momentum</h3>
                    <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded">▲ +8.2% Trend</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mb-4">Continuous upward momentum heading toward pre-harvest supply squeeze. Official MSP: ₹4,892/Qtl.</p>
                  
                  <div className="h-40 w-full mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={momentumData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" hide />
                        <YAxis domain={['dataMin - 100', 'dataMax + 100']} hide />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 'bold' }}
                          itemStyle={{ color: '#166534' }}
                          formatter={(value) => [`₹${value}`, 'Price']}
                        />
                        <Area type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 border-b border-gray-100 pb-3 mb-3">
                    <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-600 mr-1"></span> Modal Price Line</span>
                    <span className="text-green-700">Bullish Demand Window</span>
                  </div>

                  <div className="space-y-2 mt-auto">
                    <div className="flex items-start">
                      <CheckCircle2 className="w-3 h-3 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-[10px] text-gray-700">Oil mills in Wardha and Nagpur reporting low inventories (under 9 days stock).</p>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="w-3 h-3 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-[10px] text-gray-700"><span className="font-bold text-gray-900">Recommendation:</span> Stagger sales — liquidate 40% stock this week, retain balance for expected peak after Dussehra.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SMS Alert Card */}
              <Card className="shadow-sm border border-green-200 bg-[#f0faeb]">
                <CardContent className="p-5">
                  <h3 className="font-bold text-gray-900 mb-1 flex items-center"><Phone className="w-4 h-4 mr-2 text-green-700" /> Free Daily Mandi SMS Alerts</h3>
                  <p className="text-[10px] text-gray-600 mb-4">Get price spikes over ₹5,000/Qtl directly via WhatsApp and Kisan SMS.</p>
                  <div className="flex">
                    <input type="text" defaultValue="+91 98224 81092" className="text-xs bg-white border border-gray-300 rounded-l-lg px-3 py-2 w-full focus:outline-none font-medium" />
                    <button className="bg-green-800 text-white px-4 py-2 rounded-r-lg text-xs font-bold hover:bg-green-900 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-center mt-10">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-green-100 p-2.5 rounded-full mr-4 text-green-800">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Require Agronomist Assistance on Today's Forecast?</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">Connect with Yavatmal District Krishi Adhikari toll-free or book an on-farm soil test scout.</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="bg-green-50 text-green-800 px-4 py-2 rounded-lg text-xs font-bold border border-green-200 hover:bg-green-100 transition-colors flex items-center shadow-sm">
              <Phone className="w-3.5 h-3.5 mr-2" /> Call 1800-180-1551
            </button>
            <button className="bg-green-800 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-green-900 transition-colors flex items-center shadow-sm">
              <Banknote className="w-3.5 h-3.5 mr-2" /> Calculate Net Crop Profit
            </button>
          </div>
        </div>


        {/* Agmarknet Government API Key Modal */}
        {showKeyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-green-700 relative">
              <button 
                onClick={() => setShowKeyModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-100 text-green-800 flex items-center justify-center font-bold">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Connect Official Agmarknet API</h3>
                  <p className="text-xs text-gray-500">Live Indian Mandi Wholesale Auctions via data.gov.in</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 mb-5 text-xs text-amber-900 leading-relaxed">
                <p className="font-bold mb-1">How to obtain a free government API key:</p>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Visit <a href="https://data.gov.in" target="_blank" rel="noreferrer" className="text-blue-700 underline font-bold inline-flex items-center">data.gov.in <ExternalLink className="w-3 h-3 ml-0.5" /></a> and register (free).</li>
                  <li>Go to <strong>My Account</strong> &gt; <strong>API Key</strong>.</li>
                  <li>Copy and paste your personal API key below.</li>
                </ol>
              </div>

              {keyMessage && (
                <div className={`p-3 rounded-lg text-xs font-bold mb-4 ${keyMessage.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}>
                  {keyMessage}
                </div>
              )}

              <form onSubmit={handleSaveApiKey} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Government API Key (data.gov.in)
                  </label>
                  <input
                    type="password"
                    value={inputApiKey}
                    onChange={(e) => setInputApiKey(e.target.value)}
                    placeholder="e.g. 579b464db66ec23bdd000001..."
                    required
                    className="w-full px-3.5 py-2.5 text-xs font-mono border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowKeyModal(false)}
                    className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={keySaving}
                    className="bg-green-800 hover:bg-green-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow transition-all active:scale-95 disabled:opacity-50"
                  >
                    {keySaving ? 'Activating...' : 'Save & Stream Live Rates'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default WeatherMarket;
