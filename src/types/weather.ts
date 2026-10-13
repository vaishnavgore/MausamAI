export interface WeatherCondition {
  temp: number;
  feelsLike: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number; // km/h
  windDirection: string;
  rainProbability: number; // percentage
  rainfallMm: number;
  uvIndex: number;
  aqi: number;
  aqiCategory: 'Good' | 'Moderate' | 'Poor' | 'Unhealthy' | 'Hazardous';
  dewPoint?: number;
  visibility: number; // km
  pressure: number; // hPa
  lastUpdated: string;
}

export interface HourlyForecastItem {
  time: string;
  temp: number;
  condition: string;
  rainProb: number;
  rainfallMm: number;
  windSpeed: number;
  isPeakRain?: boolean;
}

export interface DailyForecastItem {
  day: string;
  date: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  rainProb: number;
  summary: string;
}

export interface LocationData {
  city: string;
  district: string;
  state: string;
  lat: number;
  lng: number;
}
