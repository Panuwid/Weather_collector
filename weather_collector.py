import requests
import json
import time
from datetime import datetime

API_KEY = "aa32360e940e4ed32bd6a4de05c3985a"
CITY = "Bangkok"
COUNTRY_CODE = "TH"

def get_weather():
    url = f"http://api.openweathermap.org/data/2.5/weather?q={CITY},{COUNTRY_CODE}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()
    
    if response.status_code == 200:
        weather = {
            "timestamp": datetime.now().isoformat(),
            "temperature": data["main"]["temp"],
            "humidity": data["main"]["humidity"],
            "description": data["weather"][0]["description"]
        }
        return weather
    else:
        print(f"Error: Unable to fetch weather data. Status code: {response.status_code}")
        return None

def save_weather_data(weather):
    with open("weather_data.json", "a") as file:
        json.dump(weather, file)
        file.write("\n")

def main():
    while True:
        weather = get_weather()
        if weather:
            save_weather_data(weather)
            print(f"Weather data saved: {weather}")
        time.sleep(3600)  # Wait for 1 hour before next data collection

if __name__ == "__main__":
    main()