import { DailyForecastItem, HourlyForecastItem, LocationData, WeatherCondition } from '@/types/weather';

export const DEFAULT_LOCATION: LocationData = {
  city: 'Pune',
  district: 'Pune District',
  state: 'Maharashtra',
  lat: 18.5204,
  lng: 73.8567,
};

export const CITIES_LIST: LocationData[] = [
  { city: 'Pune', district: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
  { city: 'Mumbai', district: 'Mumbai Suburban', state: 'Maharashtra', lat: 19.0760, lng: 72.8777 },
  { city: 'Nagpur', district: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lng: 79.0882 },
  { city: 'Nashik', district: 'Nashik', state: 'Maharashtra', lat: 19.9975, lng: 73.7898 },
  { city: 'Bengaluru', district: 'Bengaluru Urban', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
  { city: 'New Delhi', district: 'Central Delhi', state: 'Delhi', lat: 28.6139, lng: 77.2090 },
];

export const DEMO_WEATHER_PUNE: WeatherCondition = {
  temp: 31,
  feelsLike: 33,
  condition: 'Partly Cloudy with Thunderstorm Alert',
  icon: 'CloudRain',
  humidity: 72,
  windSpeed: 16,
  windDirection: 'WSW (West-South-West)',
  rainProbability: 68,
  rainfallMm: 14.5,
  uvIndex: 7,
  aqi: 92,
  aqiCategory: 'Moderate',
  dewPoint: 22,
  visibility: 6.5,
  pressure: 1008,
  lastUpdated: 'Just now (IMD Station Shivaji Nagar)',
};

export const DEMO_HOURLY_FORECAST: HourlyForecastItem[] = [
  { time: '12:00 PM', temp: 31, condition: 'Partly Cloudy', rainProb: 20, rainfallMm: 0, windSpeed: 12 },
  { time: '01:00 PM', temp: 32, condition: 'Scattered Clouds', rainProb: 35, rainfallMm: 0.2, windSpeed: 14 },
  { time: '02:00 PM', temp: 31, condition: 'Thunderstorm Approaching', rainProb: 65, rainfallMm: 4.8, windSpeed: 22, isPeakRain: true },
  { time: '03:00 PM', temp: 28, condition: 'Heavy Showers', rainProb: 85, rainfallMm: 12.0, windSpeed: 28, isPeakRain: true },
  { time: '04:00 PM', temp: 27, condition: 'Moderate Rain', rainProb: 75, rainfallMm: 6.5, windSpeed: 20 },
  { time: '05:00 PM', temp: 26, condition: 'Light Rain', rainProb: 45, rainfallMm: 1.5, windSpeed: 15 },
  { time: '06:00 PM', temp: 26, condition: 'Cloudy', rainProb: 30, rainfallMm: 0, windSpeed: 12 },
  { time: '07:00 PM', temp: 25, condition: 'Passing Clouds', rainProb: 15, rainfallMm: 0, windSpeed: 10 },
  { time: '08:00 PM', temp: 24, condition: 'Clear Sky', rainProb: 10, rainfallMm: 0, windSpeed: 8 },
];

export const DEMO_DAILY_FORECAST: DailyForecastItem[] = [
  { day: 'Today', date: '20 Sep', tempMax: 32, tempMin: 22, condition: 'Thunderstorm & Rain', rainProb: 75, summary: 'Afternoon rain bursts, moderate lightning risk' },
  { day: 'Sun', date: '21 Sep', tempMax: 30, tempMin: 21, condition: 'Heavy Showers', rainProb: 85, summary: 'Widespread rain across Pune Ghats and city' },
  { day: 'Mon', date: '22 Sep', tempMax: 29, tempMin: 21, condition: 'Scattered Rain', rainProb: 60, summary: 'Intermittent drizzle, overcast sky' },
  { day: 'Tue', date: '23 Sep', tempMax: 31, tempMin: 22, condition: 'Partly Cloudy', rainProb: 35, summary: 'Warm morning, isolated evening showers' },
  { day: 'Wed', date: '24 Sep', tempMax: 32, tempMin: 23, condition: 'Mostly Sunny', rainProb: 20, summary: 'Good field and travel conditions' },
  { day: 'Thu', date: '25 Sep', tempMax: 33, tempMin: 23, condition: 'Sunny', rainProb: 10, summary: 'Clear skies, elevated UV index' },
  { day: 'Fri', date: '26 Sep', tempMax: 32, tempMin: 22, condition: 'Scattered Clouds', rainProb: 25, summary: 'Pleasant autumn breeze' },
];
