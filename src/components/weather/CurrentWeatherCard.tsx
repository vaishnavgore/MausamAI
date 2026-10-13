import React from 'react';
import { 
  CloudRain, 
  Droplets, 
  Wind, 
  Sun, 
  Eye, 
  Gauge, 
  MapPin, 
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { formatTemp } from '@/utils/formatters';
import { WeatherParticles } from './WeatherParticles';

export const CurrentWeatherCard: React.FC = () => {
  const { weather, location } = useApp();

  if (!weather) {
    return (
      <div className="card-clean p-6 animate-pulse">
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mb-4"></div>
        <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-6"></div>
      </div>
    );
  }

  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return { 
      text: 'text-emerald-700 dark:text-emerald-400', 
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60', 
      tag: 'Good' 
    };
    if (aqi <= 100) return { 
      text: 'text-amber-800 dark:text-amber-400', 
      bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60', 
      tag: 'Moderate' 
    };
    if (aqi <= 200) return { 
      text: 'text-orange-800 dark:text-orange-400', 
      bg: 'bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-900/60', 
      tag: 'Poor' 
    };
    return { 
      text: 'text-rose-800 dark:text-rose-400', 
      bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60', 
      tag: 'Unhealthy' 
    };
  };

  const aqiStyle = getAqiColor(weather.aqi);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="card-clean p-6 relative overflow-hidden"
    >
      {/* Dynamic Animated Particle Canvas (Raindrops, clouds & lightning) */}
      <WeatherParticles
        condition={weather.condition}
        rainProbability={weather.rainProbability}
        isStorm={weather.condition.toLowerCase().includes('storm') || weather.windSpeed > 25}
      />

      {/* Top Header: Location & Timestamp */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              {location.city}, {location.state}
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Primary Automated Weather Telemetry Center
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-200/80 dark:border-slate-700/80">
          <Clock className="w-3 h-3 text-blue-500" />
          <span>{weather.lastUpdated}</span>
        </div>
      </div>

      {/* Main Temperature & Primary Condition Display */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-6">
        
        {/* Big Temp with subtle scale hover */}
        <motion.div 
          className="flex items-baseline gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <span className="text-6xl font-extrabold tracking-tighter text-slate-900 dark:text-white">
            {formatTemp(weather.temp)}
          </span>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Feels like</p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{formatTemp(weather.feelsLike)}</p>
          </div>
        </motion.div>

        {/* Condition Text & Icon with gentle float animation */}
        <div className="flex items-center gap-3.5 md:border-l md:border-slate-100 md:dark:border-slate-800 md:pl-6">
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/60 shrink-0"
          >
            <CloudRain className="w-7 h-7" />
          </motion.div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
              {weather.condition}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
              <span>Rain probability:</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">{weather.rainProbability}%</span>
            </p>
          </div>
        </div>

        {/* AQI & UV Badges */}
        <div className="flex items-center gap-3 md:justify-end">
          
          {/* AQI */}
          <div className={`p-3 rounded-xl border ${aqiStyle.bg} min-w-[105px]`}>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-0.5">
              <span>Air Quality</span>
              <Gauge className="w-3 h-3" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className={`text-xl font-extrabold ${aqiStyle.text}`}>{weather.aqi}</span>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">AQI</span>
            </div>
            <p className={`text-[10px] font-semibold ${aqiStyle.text}`}>{aqiStyle.tag}</p>
          </div>

          {/* UV Index */}
          <div className="p-3 rounded-xl border bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 min-w-[105px]">
            <div className="flex items-center justify-between text-[11px] font-semibold text-amber-800 dark:text-amber-300 mb-0.5">
              <span>UV Index</span>
              <Sun className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-amber-800 dark:text-amber-300">{weather.uvIndex}</span>
              <span className="text-[10px] font-medium text-amber-700 dark:text-amber-400">/ 12</span>
            </div>
            <p className="text-[10px] font-semibold text-amber-700 dark:text-amber-400">Moderate High</p>
          </div>

        </div>

      </div>

      {/* Bottom Grid: Atmospheric Indices */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
        
        <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60">
          <Droplets className="w-4 h-4 text-blue-500 dark:text-blue-400" />
          <div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Humidity</p>
            <p className="text-xs font-semibold text-slate-900 dark:text-white">{weather.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60">
          <Wind className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Wind Speed</p>
            <p className="text-xs font-semibold text-slate-900 dark:text-white">{weather.windSpeed} km/h</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60">
          <CloudRain className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Rain Intensity</p>
            <p className="text-xs font-semibold text-slate-900 dark:text-white">{weather.rainfallMm} mm/h</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60">
          <Eye className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Visibility</p>
            <p className="text-xs font-semibold text-slate-900 dark:text-white">{weather.visibility} km</p>
          </div>
        </div>

      </div>

    </motion.div>
  );
};
