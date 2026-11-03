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
    crop = data.crop.capitalize() if data.crop else "Soyabean"
    
    # Base multipliers per acre
    base_fertilizer = 4100 * area
    base_tractor = 3833 * area
    base_seeds = 3200 * area
    base_labor = (data.laborWage / 250.0) * 2666 * area if data.laborWage > 0 else 2666 * area
    base_irrigation = 1350 * area
    
    if data.tractorOwnership == "owned": base_tractor *= 0.45
    if data.fertilizerType == "organic": base_fertilizer *= 0.65
    if data.irrigation == "rainfed": base_irrigation = 0
    elif data.irrigation == "canal": base_irrigation *= 0.3
    if data.seedVariety == "traditional": base_seeds *= 0.6
        
    transport_cost = data.mandiDistance * 5.0 * data.targetYield * area
    
    total_cost = base_fertilizer + base_tractor + base_seeds + base_labor + base_irrigation + transport_cost
    
    prices = {"Soybean": 4892, "Soyabean": 4892, "Cotton": 7121, "Wheat": 2275, "Rice": 2183, "Sugarcane": 340}
    price_per_qtl = prices.get(crop, 4000)
    
    expected_yield = data.targetYield * area
    expected_income = expected_yield * price_per_qtl
    profit_or_loss = expected_income - total_cost
    
    roi = (profit_or_loss / total_cost) * 100 if total_cost > 0 else 0
    break_even_yield = total_cost / price_per_qtl if price_per_qtl > 0 else 0

    return {
        "crop": crop,
        "area": area,
        "totalCost": total_cost,
        "costPerAcre": total_cost / area,
        "variety": data.seedVariety.capitalize() + " Variety",
        "expectedYield": expected_yield,
        "yieldPerAcre": data.targetYield,
        "yieldAvgDist": "+12% vs District",
        "expectedIncome": expected_income,
        "marketPrice": price_per_qtl,
        "priceMspDiff": "+5% above MSP",
        "roi": round(roi, 1),
        "profitOrLoss": profit_or_loss,
        "breakEvenYield": round(break_even_yield, 1),
        "breakEvenYieldPerAcre": round(break_even_yield / area, 1),
        "subsidy": {
            "eligible": data.subsidy > 0,
            "amount": data.subsidy,
            "desc": "Govt Equipment Subsidy"
        },
        "costBreakdown": [
            {"name": "Fertilizer & Chemicals", "amount": base_fertilizer, "color": "#16a34a"},
            {"name": "Tractor & Machinery", "amount": base_tractor, "color": "#ca8a04"},
            {"name": "Seeds & Planting", "amount": base_seeds, "color": "#0284c7"},
            {"name": "Labor Wages", "amount": base_labor, "color": "#dc2626"},
            {"name": "Irrigation/Water", "amount": base_irrigation, "color": "#2563eb"},
            {"name": "Transport to Mandi", "amount": transport_cost, "color": "#9333ea"},
        ],
        "sensitivity": {
            "glut": {
                "profit": (expected_yield * (price_per_qtl * 0.8)) - total_cost,
                "roi": str(round((((expected_yield * (price_per_qtl * 0.8)) - total_cost) / total_cost) * 100, 1)) + "% ROI",
                "desc": "Market crash (-20%)"
            },
            "current": {
                "profit": profit_or_loss,
                "roi": str(round(roi, 1)) + "% ROI",
                "desc": "Current MSP rate"
            },
            "bullish": {
                "profit": (expected_yield * (price_per_qtl * 1.2)) - total_cost,
                "roi": str(round((((expected_yield * (price_per_qtl * 1.2)) - total_cost) / total_cost) * 100, 1)) + "% ROI",
                "desc": "High export demand (+20%)"
            }
        }
    }"""

content = re.sub(r'class PredictRequest\(BaseModel\):[\s\S]*?\}\n    \}', replacement, content)

with open('../sheti-sarthi-backend/main.py', 'w', encoding='utf-8') as f:
    f.write(content)
