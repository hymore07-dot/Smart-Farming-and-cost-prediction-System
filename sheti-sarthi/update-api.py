import re

with open('../sheti-sarthi-backend/main.py', 'r', encoding='utf-8') as f:
    content = f.read()

replacement = """class PredictRequest(BaseModel):
    crop: str = "soybean"
    area: float = 5.0
    irrigation: str = "drip"
    soil: str = "black"
    seedVariety: str = "hybrid"
    fertilizerType: str = "chemical"
    tractorOwnership: str = "rented"
    laborWage: float = 350.0
    mandiDistance: float = 20.0
    subsidy: float = 0.0
    targetYield: float = 12.0

@app.post("/api/predict")
def predict_cost_profit(data: PredictRequest):
    area = data.area if data.area > 0 else 3.0
    crop = data.crop.lower() if data.crop else "soybean"
    
    # Base multipliers per acre
    base_fertilizer = 4100 * area
    base_tractor = 3833 * area
    base_seeds = 3200 * area
    base_labor = (data.laborWage / 250.0) * 2666 * area if data.laborWage > 0 else 2666 * area
    base_irrigation = 1350 * area
    
    # Parameter adjustments
    if data.tractorOwnership == "owned":
        base_tractor *= 0.45  # Just diesel and maintenance
    
    if data.fertilizerType == "organic":
        base_fertilizer *= 0.65 # Organic compost is cheaper
        
    if data.irrigation == "rainfed":
        base_irrigation = 0
    elif data.irrigation == "canal":
        base_irrigation *= 0.3
        
    if data.seedVariety == "traditional":
        base_seeds *= 0.6
        
    # Transport costs based on distance and expected yield
    transport_cost = data.mandiDistance * 5.0 * data.targetYield * area
    
    # Calculate Total
    total_cost = base_fertilizer + base_tractor + base_seeds + base_labor + base_irrigation + transport_cost
    total_cost -= data.subsidy # Subtract govt subsidies
    if total_cost < 0: total_cost = 0
    
    # Expected Revenue based on target yield
    prices = {"soybean": 4892, "cotton": 7121, "wheat": 2275, "rice": 2183, "sugarcane": 340}
    price_per_qtl = prices.get(crop, 4000)
    expected_revenue = (data.targetYield * area) * price_per_qtl
    
    net_profit = expected_revenue - total_cost
    roi = (net_profit / total_cost) * 100 if total_cost > 0 else 0

    return {
        "costs": [
            {"name": "Fertilizer & Chemicals", "amount": base_fertilizer, "color": "#16a34a"},
            {"name": "Tractor & Machinery", "amount": base_tractor, "color": "#ca8a04"},
            {"name": "Seeds & Planting", "amount": base_seeds, "color": "#0284c7"},
            {"name": "Labor Wages", "amount": base_labor, "color": "#dc2626"},
            {"name": "Irrigation/Water", "amount": base_irrigation, "color": "#2563eb"},
            {"name": "Transport to Mandi", "amount": transport_cost, "color": "#9333ea"},
        ],
        "profitAnalysis": {
            "totalCost": total_cost,
            "expectedRevenue": expected_revenue,
            "netProfit": net_profit,
            "roi": round(roi, 1)
        }
    }"""

content = re.sub(r'class PredictRequest\(BaseModel\):[\s\S]*?\}\n    \}', replacement, content)

with open('../sheti-sarthi-backend/main.py', 'w', encoding='utf-8') as f:
    f.write(content)
