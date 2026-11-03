import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Sprout, Phone, Lock, User, LogIn, UserPlus } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../services/api';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    password: '',
    language_pref: 'English'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login API Call
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
          phone_number: formData.phone_number,
          password: formData.password
        });
        
        // Save token to local storage
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify({
          name: response.data.name,
          phone: response.data.phone_number
        }));
        
        // Redirect to dashboard
        if (onLogin) onLogin(); else window.location.href = '/';
        
      } else {
        // Register API Call
        await axios.post(`${API_BASE_URL}/auth/register`, {
          name: formData.name,
          phone_number: formData.phone_number,
          password: formData.password,
          language_pref: formData.language_pref
        });
        
        // Switch to login after successful registration
        setIsLogin(true);
        alert('Registration successful! Please login.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f0faeb] min-h-screen py-12 flex items-center justify-center">
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <Sprout className="h-12 w-12 text-green-700" />
          </div>
          <h2 className="text-3xl font-extrabold text-green-900">
            {isLogin ? 'Welcome Back!' : 'Join Sheti-Sarthi'}
          </h2>
          <p className="text-green-700 mt-2 font-medium">
            {isLogin ? 'Login to access your farm dashboard' : 'Register to get smart farming intelligence'}
          </p>
        </div>

        <Card className="shadow-lg border-0 ring-1 ring-green-100 bg-white overflow-hidden rounded-2xl">
          <CardContent className="p-8">
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-sm font-bold rounded-lg text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Harshad More" 
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="tel" 
                    name="phone_number"
                    required
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="9404907834" 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="password" 
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••" 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center disabled:opacity-70 mt-6"
              >
                {loading ? 'Processing...' : (
                  isLogin ? (
                    <><LogIn className="w-5 h-5 mr-2" /> Login Securely</>
                  ) : (
                    <><UserPlus className="w-5 h-5 mr-2" /> Create Account</>
                  )
                )}
              </button>
            </form>

            {/* Quick Demo Access Bar */}
            {isLogin && (
              <div className="mt-5 p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-center">
                <p className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider mb-2">
                  ⚡ 1-Click Fast Demo Login
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={async () => {
                      setLoading(true);
                      setError('');
                      try {
                        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                          phone_number: '9404907834',
                          password: 'password'
                        }).catch(() => axios.post(`${API_BASE_URL}/auth/login`, {
                          phone_number: '9404907834',
                          password: '123456'
                        }));
                        localStorage.setItem('token', response.data.access_token);
                        localStorage.setItem('user', JSON.stringify({
                          name: response.data.name,
                          phone: response.data.phone_number
                        }));
                        if (onLogin) onLogin(); else window.location.href = '/';
                      } catch (err) {
                        setError('Demo login failed. Please type credentials manually.');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="py-2 px-2.5 bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold transition-all shadow-sm"
                  >
                    👤 Harshad More
                  </button>

                  <button
                    type="button"
                    onClick={async () => {
                      setLoading(true);
                      setError('');
                      try {
                        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                          phone_number: '9876543210',
                          password: '123456'
                        });
                        localStorage.setItem('token', response.data.access_token);
                        localStorage.setItem('user', JSON.stringify({
                          name: response.data.name,
                          phone: response.data.phone_number
                        }));
                        if (onLogin) onLogin(); else window.location.href = '/';
                      } catch (err) {
                        setError('Demo login failed. Please type credentials manually.');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="py-2 px-2.5 bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold transition-all shadow-sm"
                  >
                    👤 Abhinav Rajput
                  </button>
                </div>
                <p className="text-[10px] text-gray-500 mt-2 font-mono">
                  Default credentials: <strong>9404907834</strong> / <strong>123456</strong>
                </p>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600 font-medium">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="mt-2 text-green-700 font-bold hover:text-green-800 uppercase tracking-wide text-sm"
              >
                {isLogin ? 'Register a New Farm' : 'Login to Your Farm'}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
