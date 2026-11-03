from sqlalchemy import Boolean, Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    phone_number = Column(String, unique=True, index=True)
    name = Column(String)
    hashed_password = Column(String)
    language_pref = Column(String, default="English")
    
    farms = relationship("Farm", back_populates="owner")

class Farm(Base):
    __tablename__ = "farms"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    area_acres = Column(Float)
    soil_type = Column(String)
    state = Column(String)
    district = Column(String)
    irrigation_method = Column(String)

    owner = relationship("User", back_populates="farms")
