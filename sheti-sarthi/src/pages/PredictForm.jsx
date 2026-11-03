import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Target, MapPin, Calculator, Leaf } from 'lucide-react';

const PredictForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const initialState = location.state?.predictData || {
    crop: 'soybean',
    area: 5,
    location: '',
    soil: 'black',
    season: 'kharif',
    seedCost: '',
    fertCost: '',
    laborCost: '',
    targetYield: '',
    sellPrice: ''
  };
  
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (errors[e.target.id]) {
      setErrors({ ...errors, [e.target.id]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.crop) newErrors.crop = 'Crop is required';
    if (!formData.area || isNaN(formData.area) || formData.area <= 0) newErrors.area = 'Enter a valid land area';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    const safeData = {
      ...formData,
      area: parseFloat(formData.area) || 1,
      seedCost: parseFloat(formData.seedCost) || 0,
      fertCost: parseFloat(formData.fertCost) || 0,
      laborCost: parseFloat(formData.laborCost) || 0,
      targetYield: parseFloat(formData.targetYield) || 0,
      sellPrice: parseFloat(formData.sellPrice) || 0,
    };

    // Fake Hollywood AI Loading Sequence
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step === 4) {
        clearInterval(interval);
        setIsSubmitting(false);
        navigate('/dashboard', { state: { predictData: safeData } });
      }
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cost & Profit Prediction</h1>
        <p className="text-gray-600">Complete the 10-point ML Model Input Checklist for precise real-world forecasting.</p>
      </div>

      <Card>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit}>
            
            {/* Section 1: Core ML Parameters */}
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2 flex items-center"><MapPin className="w-4 h-4 mr-2" /> Geographic & Agronomic Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Select label="1. Crop Type" id="crop" value={formData.crop} onChange={handleChange} options={[
                { label: 'Soybean', value: 'soybean' }, { label: 'Wheat', value: 'wheat' },
                { label: 'Cotton', value: 'cotton' }, { label: 'Rice', value: 'rice' },
                { label: 'Sugarcane', value: 'sugarcane' }
              ]} />
              <Input type="number" label="2. Land Area (Acres)" id="area" value={formData.area} onChange={handleChange} error={errors.area} />
              <Input type="text" label="3. Location (District & State)" id="location" value={formData.location} onChange={handleChange} placeholder="e.g. Yavatmal, Maharashtra" />
              <Select label="4. Soil Type" id="soil" value={formData.soil} onChange={handleChange} options={[
                { label: 'Black Soil', value: 'black' }, { label: 'Red Soil', value: 'red' },
                { label: 'Loamy Soil', value: 'loamy' },
              ]} />
              <Select label="5. Season" id="season" value={formData.season} onChange={handleChange} options={[
                { label: 'Kharif', value: 'kharif' }, { label: 'Rabi', value: 'rabi' }
              ]} />
            </div>

            {/* Section 2: Financial Inputs */}
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2 flex items-center"><Calculator className="w-4 h-4 mr-2" /> Cost Parameters (Optional: Leave blank for AI DB Defaults)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Input type="number" label="6. Seed Cost (₹ per acre)" id="seedCost" value={formData.seedCost} onChange={handleChange} placeholder="e.g. 3000" />
              <Input type="number" label="7. Fertilizer & Pesticide Cost (₹/acre)" id="fertCost" value={formData.fertCost} onChange={handleChange} placeholder="e.g. 4500" />
              <Input type="number" label="8. Labour & Machinery Cost (₹/acre)" id="laborCost" value={formData.laborCost} onChange={handleChange} placeholder="e.g. 5000" />
            </div>

            {/* Section 3: Market Targets */}
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2 flex items-center"><Target className="w-4 h-4 mr-2" /> Expected Market Targets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Input type="number" label="9. Expected Yield (Quintals/acre)" id="targetYield" value={formData.targetYield} onChange={handleChange} placeholder="Leave blank for AI default" />
              <Input type="number" label="10. Expected Selling Price (₹/Quintal)" id="sellPrice" value={formData.sellPrice} onChange={handleChange} placeholder="Leave blank for Live DB" />
            </div>

            <div className="mt-8 pt-6 border-t flex justify-between items-center">
              <p className="text-xs text-gray-500 hidden md:block">* All 10 parameters matched to the ML Prediction Model Schema</p>
              <Button type="submit" size="lg" className="w-full md:w-auto px-12 py-4 text-lg font-bold shadow-lg bg-green-700 hover:bg-green-800" isLoading={isSubmitting}>
                Run Financial Prediction
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictForm;
