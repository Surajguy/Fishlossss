
import random
from datetime import datetime, timedelta
from typing import Dict, List, Optional

def get_fishing_forecast(location: str, latitude: Optional[float] = None, longitude: Optional[float] = None) -> Dict:
    """
    Generate a fishing forecast based on location and conditions.
    This is a mock implementation - in production, this would integrate with:
    - Weather APIs (OpenWeatherMap, WeatherAPI)
    - Moon phase calculators
    - Water temperature services
    - Barometric pressure data
    """
    
    # Mock weather conditions
    weather_conditions = [
        "Partly cloudy with light winds",
        "Overcast skies with calm waters",
        "Clear skies with moderate breeze",
        "Light rain with stable pressure",
        "Sunny with gentle winds"
    ]
    
    # Mock moon phases
    moon_phases = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", 
                   "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"]
    
    # Generate mock bite score (0-10)
    base_score = random.randint(4, 8)
    
    # Adjust score based on mock conditions
    current_hour = datetime.now().hour
    
    # Better scores during dawn/dusk
    if 5 <= current_hour <= 8 or 17 <= current_hour <= 20:
        base_score += random.randint(1, 2)
    
    # Slightly lower scores during midday heat
    elif 11 <= current_hour <= 15:
        base_score -= random.randint(0, 1)
    
    bite_score = min(10, max(1, base_score))
    
    # Generate best fishing times for today
    best_times = []
    if bite_score >= 7:
        best_times = ["6:00-8:00 AM", "6:30-8:30 PM"]
    elif bite_score >= 5:
        best_times = ["Early morning", "Evening"]
    else:
        best_times = ["Dawn", "Dusk"]
    
    # Mock recommendations based on score
    if bite_score >= 8:
        activity_level = "Excellent"
        recommendations = "Prime fishing conditions! Fish are likely to be very active."
    elif bite_score >= 6:
        activity_level = "Good"
        recommendations = "Good fishing expected. Try live bait or lures."
    elif bite_score >= 4:
        activity_level = "Fair"
        recommendations = "Moderate fishing conditions. Be patient and try different spots."
    else:
        activity_level = "Poor"
        recommendations = "Challenging conditions. Consider waiting for better weather."
    
    return {
        "location": location,
        "forecast_date": datetime.now().strftime("%Y-%m-%d"),
        "bite_score": bite_score,
        "activity_level": activity_level,
        "conditions": random.choice(weather_conditions),
        "moon_phase": random.choice(moon_phases),
        "best_times": best_times,
        "recommendations": recommendations,
        "water_temp": f"{random.randint(45, 75)}°F",
        "barometric_pressure": f"{random.uniform(29.5, 30.5):.2f} inHg"
    }

def get_extended_forecast(location: str, days: int = 7) -> List[Dict]:
    """Get extended fishing forecast for multiple days"""
    forecasts = []
    for i in range(days):
        forecast_date = datetime.now() + timedelta(days=i)
        daily_forecast = get_fishing_forecast(location)
        daily_forecast["forecast_date"] = forecast_date.strftime("%Y-%m-%d")
        daily_forecast["day_name"] = forecast_date.strftime("%A")
        forecasts.append(daily_forecast)
    
    return forecasts
