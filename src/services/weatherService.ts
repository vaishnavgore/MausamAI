import { CITIES_LIST, DEFAULT_LOCATION, DEMO_DAILY_FORECAST, DEMO_HOURLY_FORECAST, DEMO_WEATHER_PUNE } from '@/data/demoWeather';
import { DailyForecastItem, HourlyForecastItem, LocationData, WeatherCondition } from '@/types/weather';

class WeatherService {
  private currentLocation: LocationData = DEFAULT_LOCATION;

  public getLocation(): LocationData {
    return this.currentLocation;
  }

  public setLocation(loc: LocationData): void {
    this.currentLocation = loc;
  }

  public getAvailableCities(): LocationData[] {
    return CITIES_LIST;
  }

  public async getCurrentWeather(location: LocationData = this.currentLocation): Promise<WeatherCondition> {
    // In production or demo fallback, returns strongly typed weather condition
    if (location.city === 'Pune') {
      return { ...DEMO_WEATHER_PUNE };
    }
    // Dynamic mock for other cities
    return {
      temp: location.city === 'Mumbai' ? 32 : location.city === 'Bengaluru' ? 26 : 30,
      feelsLike: location.city === 'Mumbai' ? 37 : location.city === 'Bengaluru' ? 27 : 32,
      condition: location.city === 'Mumbai' ? 'Humid & Overcast' : location.city === 'Bengaluru' ? 'Passing Drizzle' : 'Partly Cloudy',
      icon: location.city === 'Mumbai' ? 'CloudFog' : 'CloudRain',
      humidity: location.city === 'Mumbai' ? 84 : 65,
      windSpeed: 14,
      windDirection: 'SW',
      rainProbability: location.city === 'Mumbai' ? 55 : 40,
      rainfallMm: 6.2,
      uvIndex: 6,
      aqi: location.city === 'New Delhi' ? 245 : 78,
      aqiCategory: location.city === 'New Delhi' ? 'Poor' : 'Moderate',
      visibility: 7.0,
      pressure: 1010,
      lastUpdated: 'Just now (Automated Weather Station)',
    };
  }

  public async getHourlyForecast(): Promise<HourlyForecastItem[]> {
    return [...DEMO_HOURLY_FORECAST];
  }

  public async getDailyForecast(): Promise<DailyForecastItem[]> {
    return [...DEMO_DAILY_FORECAST];
  }
}

export const weatherService = new WeatherService();
