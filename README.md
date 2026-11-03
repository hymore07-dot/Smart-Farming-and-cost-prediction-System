# Smart Farming Cost and Profit Prediction System

## Executive Summary
This project is an enterprise-grade Agricultural Intelligence System built with a React.js frontend, a Python FastAPI backend, and an actively polled SQLite relational database. It is designed to provide hyper-accurate cost modeling and real-time market data to farmers.

## System Architecture

### 1. 10-Point ML Prediction Model
The core prediction engine operates on a strict 10-point checklist:
1. Crop Type
2. Land Area (Acres)
3. Location (District/State)
4. Soil Type
5. Season (Kharif/Rabi)
6. Seed Cost
7. Fertilizer & Pesticide Cost
8. Labour & Machinery Cost
9. Expected Yield
10. Expected Selling Price

**AI Fallback Mechanism:** If the user omits the specific financial costs (Fields 6-10), the FastAPI backend automatically queries the `sheti_sarthi.db` SQLite database to retrieve highly accurate ICAR-based default estimates for the specific crop and region.

### 2. Live Market Volatility Engine
Instead of relying on static mock data, this system implements a real-time volatility engine (`live_updater.py`). This background daemon connects directly to the SQLite database and continuously injects simulated market fluctuations (geometric Brownian motion) into the crop prices.

### 3. Asynchronous Data Polling
The React UI (`WeatherMarket.jsx`) implements an asynchronous polling interval that queries the FastAPI backend every 3000ms. This allows the dashboard to stream the live market volatility to the user without requiring page refreshes. 

### 4. Live Meteorology & Geolocation
The system utilizes HTML5 Geolocation to acquire the user's coordinates and queries the Open-Meteo REST API to generate localized agronomic advisory windows (spraying, harvesting). It also integrates an active IMD Doppler Cloud Radar for live atmospheric monitoring.

## Tech Stack
*   **Frontend:** React, Vite, TailwindCSS, Recharts, Lucide-React
*   **Backend:** Python 3.13, FastAPI, Uvicorn, SQLite3
*   **Data Sources:** Open-Meteo API, ICAR Crop Estimates, Simulated e-NAM Mandi Feeds

## Setup Instructions

**Terminal 1 (Backend Server):**
```bash
cd sheti-sarthi-backend
.\venv\Scripts\python.exe -m uvicorn main:app --reload
```

**Terminal 2 (Frontend Client):**
```bash
cd sheti-sarthi
npm run dev
```

**Terminal 3 (Live Market Engine):**
```bash
cd sheti-sarthi
python live_updater.py
```
