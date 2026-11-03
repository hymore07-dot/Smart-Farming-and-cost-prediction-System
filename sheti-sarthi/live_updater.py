import sqlite3
import time
import random
import datetime
import os

print("Starting Live Market Volatility Engine...")

# Automatically resolve the absolute path to the database
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Because this is in sheti-sarthi, we need to go up one level
DB_PATH = os.path.join(BASE_DIR, '..', 'sheti-sarthi-backend', 'sheti_sarthi.db')
DB_PATH = os.path.normpath(DB_PATH)

print(f"Connecting to database at: {DB_PATH}")

def update_prices_live():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute("SELECT crop, price_per_qtl FROM mandi_prices")
        rows = cursor.fetchall()
        
        for row in rows:
            crop, current_price = row
            
            volatility = random.uniform(-15.0, 15.0)
            
            base_prices = {"Soybean": 4892, "Soyabean": 4892, "Cotton": 7121, "Wheat": 2275, "Rice": 2183, "Sugarcane": 340}
            base = base_prices.get(crop, 4000)
            
            new_price = current_price + volatility
            if new_price > base * 1.2:
                new_price = base * 1.2
            elif new_price < base * 0.8:
                new_price = base * 0.8
                
            cursor.execute("UPDATE mandi_prices SET price_per_qtl = ? WHERE crop = ?", (round(new_price, 2), crop))
        
        conn.commit()
        conn.close()
        
        now = datetime.datetime.now().strftime("%H:%M:%S")
        print(f"[{now}] Market Data Updated! Prices shifted.")
    except Exception as e:
        print(f"Error updating prices: {e}")

if __name__ == '__main__':
    try:
        while True:
            update_prices_live()
            time.sleep(3)
    except KeyboardInterrupt:
        print("Live Updater Stopped.")
