import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page Imports
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PredictForm from './pages/PredictForm';
import WeatherMarket from './pages/WeatherMarket';
import DiseaseDetection from './pages/DiseaseDetection';
import Auth from './pages/Auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // If not logged in, ONLY show the Auth page.
  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Auth onLogin={() => setIsAuthenticated(true)} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predict" element={<PredictForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/info" element={<WeatherMarket />} />
            <Route path="/disease" element={<DiseaseDetection />} />
            
            {/* Catch-all redirect to Home if they try to access /auth while logged in */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
