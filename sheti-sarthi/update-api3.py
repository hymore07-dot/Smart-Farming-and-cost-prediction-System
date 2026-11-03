import re

with open('src/services/api.js', 'r', encoding='utf-8') as f:
    api = f.read()

replacement = """export const getWeatherData = async (location) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather`, { params: { location } });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};

export const getMarketPrices = async (crop) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/market`, { params: { crop } });
    return response.data;
  } catch (error) {
    console.error("Error fetching market prices:", error);
    throw error;
  }
};

export const detectDisease"""

api = re.sub(r'export const getWeatherData = async \(location\) => \{[\s\S]*?export const detectDisease', replacement, api)

with open('src/services/api.js', 'w', encoding='utf-8') as f:
    f.write(api)
