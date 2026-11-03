import re

with open('sheti-sarthi-backend/schemas.py', 'r', encoding='utf-8') as f:
    schemas = f.read()

new_schema = """class RecommendationRequest(BaseModel):
    soil: str
    season: str
    water: str
    budget: str
    nitrogen: float
    phosphorus: float
    potassium: float
    ph: float
    farmSize: float
    farmingMethod: str
    temperature: float
    rainfall: float
    market: str"""

schemas = re.sub(r'class RecommendationRequest\(BaseModel\):[\s\S]*?budget: str', new_schema, schemas)

with open('sheti-sarthi-backend/schemas.py', 'w', encoding='utf-8') as f:
    f.write(schemas)
