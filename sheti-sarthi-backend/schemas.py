from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    phone_number: str
    name: str
    password: str
    language_pref: Optional[str] = "English"

class UserLogin(BaseModel):
    phone_number: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    name: str
    phone_number: str

class UserResponse(BaseModel):
    id: int
    phone_number: str
    name: str
    language_pref: str

    class Config:
        from_attributes = True


class RecommendationRequest(BaseModel):
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
    market: str
