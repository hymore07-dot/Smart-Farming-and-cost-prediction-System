import main
from main import PredictRequest

for crop in ['soybean', 'cotton', 'wheat', 'rice', 'sugarcane']:
    req = PredictRequest(crop=crop, area=5.0, soil='black', season='kharif')
    res = main.predict_cost_profit(req)
    c = res['crop']
    y = res['expectedYield']
    ya = res['yieldPerAcre']
    cost = res['totalCost']
    rev = res['expectedIncome']
    profit = res['profitOrLoss']
    roi = res['roi']
    print(f"{c:10s} | Yield: {y:6.1f} Qtl ({ya:4.1f}/ac) | Cost: Rs {cost:9.2f} | Income: Rs {rev:10.2f} | Net: Rs {profit:9.2f} | ROI: {roi}%")
