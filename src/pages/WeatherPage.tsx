import React from 'react';
import { CurrentWeatherCard } from '@/components/weather/CurrentWeatherCard';
import { HourlyForecast } from '@/components/weather/HourlyForecast';
import { useApp } from '@/context/AppContext';
import { Calendar, Droplets, Wind, CloudRain } from 'lucide-react';
import { formatTemp } from '@/utils/formatters';

export const WeatherPage: React.FC = () => {
  const { weather, dailyForecast, location } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
          Meteorological Telemetry
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Personalized Weather & Atmosphere — {location.city}
        </h1>
      </div>

      {/* 1. Main Current Weather */}
      <CurrentWeatherCard />

      {/* 2. Hourly Timeline */}
      <HourlyForecast />

      {/* 3. 7-Day Extended Forecast */}
      <div className="card-clean p-5 bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              7-Day Predictive Weather Trend
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">IMD Synoptic Guidance</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5">
          {dailyForecast.map((day, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col justify-between text-center space-y-2 hover:border-slate-300 dark:hover:border-cyan-500/40 transition"
            >
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{day.day}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">{day.date}</p>
              </div>

              <div className="my-1 text-blue-600 dark:text-cyan-400 flex justify-center">
                <CloudRain className="w-6 h-6" />
              </div>

              <div>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {formatTemp(day.tempMax)} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ {formatTemp(day.tempMin)}</span>
                </p>
                <p className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 mt-0.5">
                  {day.rainProb}% Rain
                </p>
              </div>

              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight line-clamp-2 pt-1 border-t border-slate-200 dark:border-slate-700">
                {day.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Detailed Environment & Air Quality Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Air Quality Deep Dive */}
        <div className="card-clean p-5 bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Air Quality & Particulate Index
              </h3>
            </div>
            <span className="text-xs font-bold text-amber-800 dark:text-amber-400">AQI {weather?.aqi} (Moderate)</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            CPCB Station Pune reports acceptable outdoor air quality. Individuals with respiratory sensitivity should limit prolonged afternoon exertion.
          </p>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">PM 2.5</p>
              <p className="font-extrabold text-slate-900 dark:text-white">42 µg/m³</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">PM 10</p>
              <p className="font-extrabold text-slate-900 dark:text-white">68 µg/m³</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Ozone (O3)</p>
              <p className="font-extrabold text-emerald-700 dark:text-emerald-400">28 ppb</p>
            </div>
          </div>
        </div>

        {/* Agricultural Atmospheric Indices */}
        <div className="card-clean p-5 bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Agricultural & Moisture Telemetry
              </h3>
            </div>
            <span className="text-xs font-bold text-blue-700 dark:text-cyan-400">Agromet Guidance</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Elevated atmospheric moisture and low evaporative demand. Recommended for sowing operations; delay foliar chemical spraying until wind settles.
          </p>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Dew Point</p>
              <p className="font-extrabold text-slate-900 dark:text-white">{weather?.dewPoint || 22}°C</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Barometer</p>
              <p className="font-extrabold text-slate-900 dark:text-white">{weather?.pressure} hPa</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Wind Direction</p>
              <p className="font-extrabold text-teal-700 dark:text-teal-400">WSW</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
