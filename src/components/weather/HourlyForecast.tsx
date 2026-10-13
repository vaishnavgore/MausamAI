import React from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Clock, ArrowDown } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatTemp } from '@/utils/formatters';

export const HourlyForecast: React.FC = () => {
  const { hourlyForecast } = useApp();

  return (
    <div className="card-clean p-5 bg-white dark:bg-[#111827]/80">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Hourly Precipitation Timeline & Temperature Trajectory
          </h3>
        </div>
        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">9-Hour Window</span>
      </div>

      <div className="flex items-stretch gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
        {hourlyForecast.map((hour, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className={`min-w-[96px] p-3 rounded-lg border flex flex-col items-center justify-between text-center transition-all ${
              hour.isPeakRain
                ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60'
                : 'bg-slate-50/70 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-100/60 dark:hover:bg-slate-800'
            }`}
          >
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
              {hour.time}
            </span>

            <div className="my-1.5 p-2 rounded-lg bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border border-slate-200/60 dark:border-slate-700 shadow-xs">
              <CloudRain className="w-4 h-4" />
            </div>

            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {formatTemp(hour.temp)}
            </span>

            {/* Rain Prob Pill */}
            <div className="mt-2 w-full pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                <ArrowDown className="w-2.5 h-2.5" />
                <span>{hour.rainProb}%</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{hour.rainfallMm} mm</p>
            </div>

            {hour.isPeakRain && (
              <span className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800/70 px-1.5 py-0.5 rounded">
                Peak Rain
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
