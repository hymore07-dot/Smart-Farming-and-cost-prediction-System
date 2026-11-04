import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Sprout, Phone, Lock, User, LogIn, UserPlus, Server, CheckCircle2, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { getApiBaseUrl, setApiBaseUrl } from '../services/api';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfig, setShowConfig] = useState(false);
  const [apiUrlInput, setApiUrlInput] = useState(getApiBaseUrl());
  const [urlMessage, setUrlMessage] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    password: '',
    language_pref: 'English'
  });

  const getLocalUsers = () => {
    try {
      return JSON.parse(localStorage.getItem('shetisarthi_local_users') || '[]');
    } catch {
      return [];
    }
  };

  const saveLocalUser = (userObj) => {
    try {
      const users = getLocalUsers();
      const filtered = users.filter(u => u.phone_number !== userObj.phone_number);
      filtered.push(userObj);
      localStorage.setItem('shetisarthi_local_users', JSON.stringify(filtered));
    } catch (e) {
      console.warn('Could not save user locally:', e);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveApiUrl = (e) => {
    e.preventDefault();
    const updated = setApiBaseUrl(apiUrlInput);
    setApiUrlInput(updated);
    setUrlMessage('API URL updated successfully!');
    setTimeout(() => setUrlMessage(''), 3000);
  };

  const executeSuccessfulLogin = (userData, token) => {
    localStorage.setItem('token', token || 'demo_session_token_shetisarthi');
    localStorage.setItem('user', JSON.stringify({
      name: userData.name,
      phone: userData.phone || userData.phone_number
    }));
    if (onLogin) onLogin(); else window.location.href = '/';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const currentBaseUrl = getApiBaseUrl();

    try {
      if (isLogin) {
        // Login API Call
        try {
          const response = await axios.post(`${currentBaseUrl}/auth/login`, {
            phone_number: formData.phone_number.trim(),
            password: formData.password.trim()
          }, { timeout: 7000 });
          
          executeSuccessfulLogin(response.data, response.data.access_token);
          return;
        } catch (apiErr) {
          const phone = formData.phone_number.trim();
          const pwd = formData.password.trim();

          // 1. Check if user is one of the built-in demo accounts
          if ((phone === '9404907834' || phone === '9876543210') && (pwd === '123456' || pwd === 'password')) {
            const name = phone === '9404907834' ? 'Harshad More' : 'Abhinav Rajput';
            executeSuccessfulLogin({ name, phone }, 'offline_verified_token');
            return;
          }

          // 2. Check if user registered an account locally or when backend was offline
          const localUsers = getLocalUsers();
          const matched = localUsers.find(u => u.phone_number === phone && u.password === pwd);
          if (matched) {
            executeSuccessfulLogin({ name: matched.name, phone: matched.phone_number }, 'local_verified_token');
            return;
          }

          throw apiErr;
        }
      } else {
        // Register API Call
        const newUserData = {
          name: formData.name.trim(),
          phone_number: formData.phone_number.trim(),
          password: formData.password.trim(),
          language_pref: formData.language_pref
        };

        try {
          await axios.post(`${currentBaseUrl}/auth/register`, newUserData, { timeout: 8000 });
        } catch (regErr) {
          // If phone is already registered in backend database
          if (regErr.response?.data?.detail === "Phone number already registered") {
            setError("This phone number is already registered. Please login.");
            return;
          }
          console.warn("Backend unavailable during registration, saving locally:", regErr);
        }

        // Save account locally so user can always log in immediately
        saveLocalUser(newUserData);
        alert(`Account created successfully for ${newUserData.name}! Logging you in...`);
        executeSuccessfulLogin({ name: newUserData.name, phone: newUserData.phone_number }, 'registered_account_token');
        return;
      }
    } catch (err) {
      console.error('Auth error:', err);
      const detail = err.response?.data?.detail;
      setError(detail || 'Could not reach server or invalid credentials. Use 1-Click Fast Demo below.');
    } finally {
      setLoading(false);
    }
  };

  const handleFastDemoLogin = async (name, phone) => {
    setLoading(true);
    setError('');
    const currentBaseUrl = getApiBaseUrl();

    try {
      const response = await axios.post(`${currentBaseUrl}/auth/login`, {
        phone_number: phone,
        password: '123456'
      }, { timeout: 4000 });
      executeSuccessfulLogin(response.data, response.data.access_token);
    } catch (err) {
      // Instant guaranteed login session if cloud backend is waking up or starting
      console.warn("Backend not ready yet, launching instant verified demo session:", err);
      executeSuccessfulLogin({ name, phone }, 'demo_session_access_granted');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f0faeb] min-h-screen py-10 flex items-center justify-center">
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <Sprout className="h-12 w-12 text-green-700" />
          </div>
          <h2 className="text-3xl font-extrabold text-green-900">
            {isLogin ? 'Welcome Back!' : 'Join Sheti-Sarthi'}
          </h2>
          <p className="text-green-700 mt-1 font-medium text-sm">
            {isLogin ? 'Login to access your farm intelligence dashboard' : 'Register a new farmer account to get smart agricultural insights'}
          </p>
        </div>

        <Card className="shadow-lg border-0 ring-1 ring-green-100 bg-white overflow-hidden rounded-2xl">
          <CardContent className="p-7">
            {error && (
              <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-lg text-center flex items-center justify-center">
                <AlertCircle className="w-4 h-4 mr-1.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh Patil" 
                      required={!isLogin}
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="tel" 
                    name="phone_number" 
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="e.g. 9822012345" 
                    required
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="password" 
                    name="password" 
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••" 
                    required
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Preferred Language</label>
                  <select 
                    name="language_pref" 
                    value={formData.language_pref}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                  >
                    <option value="English">English</option>
                    <option value="Marathi">मराठी (Marathi)</option>
                    <option value="Hindi">हिंदी (Hindi)</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-2.5 px-4 bg-green-700 hover:bg-green-800 text-white font-bold rounded-lg shadow-sm hover:shadow transition duration-200 flex items-center justify-center text-sm disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    {isLogin ? 'Authenticating...' : 'Creating Account...'}
                  </span>
                ) : (
                  isLogin ? (
                    <><LogIn className="w-4 h-4 mr-2" /> Login Securely</>
                  ) : (
                    <><UserPlus className="w-4 h-4 mr-2" /> Create New Account</>
                  )
                )}
              </button>
            </form>

            {/* Switch between Login and Register */}
            <div className="mt-5 text-center">
              <button 
                type="button" 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-xs font-bold text-green-700 hover:text-green-800 hover:underline"
              >
                {isLogin ? "🌱 Don't have an account? Register a New Farm" : "🌾 Already have an account? Back to Login"}
              </button>
            </div>

            {/* Guaranteed 1-Click Demo Section */}
            {isLogin && (
              <div className="mt-5 p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-xl text-center">
                <p className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider mb-2">
                  ⚡ 1-Click Fast Demo Login (Instant Access)
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleFastDemoLogin('Harshad More', '9404907834')}
                    className="py-2 px-2 bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
                  >
                    👤 Harshad More
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFastDemoLogin('Abhinav Rajput', '9876543210')}
                    className="py-2 px-2 bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
                  >
                    👤 Abhinav Rajput
                  </button>
                </div>
                <p className="text-[10px] text-gray-500 mt-2 font-mono">
                  Default credentials: <strong>9404907834</strong> / <strong>123456</strong>
                </p>
              </div>
            )}

            {/* Cloud Backend Configuration Drawer */}
            <div className="mt-5 pt-4 border-t border-gray-100 text-center">
              <button
                type="button"
                onClick={() => setShowConfig(!showConfig)}
                className="text-[11px] text-gray-500 hover:text-green-700 flex items-center justify-center mx-auto space-x-1 font-mono"
              >
                <Server className="w-3 h-3" />
                <span>⚙️ {showConfig ? 'Hide Cloud API Server' : 'Backend Server Settings'}</span>
              </button>

              {showConfig && (
                <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-xl text-left text-xs">
                  <form onSubmit={handleSaveApiUrl} className="space-y-2">
                    <label className="block text-[10px] font-bold text-gray-600 uppercase">
                      Current Backend API Endpoint:
                    </label>
                    <input
                      type="url"
                      value={apiUrlInput}
                      onChange={(e) => setApiUrlInput(e.target.value)}
                      placeholder="https://sheti-sarthi-backend.onrender.com/api"
                      className="w-full px-2.5 py-1.5 text-xs font-mono border border-gray-300 rounded bg-white"
                    />
                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="submit"
                        className="px-3 py-1 bg-green-700 hover:bg-green-800 text-white font-bold rounded text-xs"
                      >
                        Save API URL
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const def = setApiBaseUrl('');
                          setApiUrlInput(def);
                        }}
                        className="text-gray-500 hover:text-gray-700 text-[10px]"
                      >
                        Reset Default
                      </button>
                    </div>
                  </form>
                  {urlMessage && (
                    <p className="mt-2 text-green-700 font-bold text-[11px] flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> {urlMessage}
                    </p>
                  )}
                </div>
              )}
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
