import React from 'react';
import { motion } from 'framer-motion';
import { CloudRain, AlertTriangle, Wind, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';

export const RiskSummaryCards: React.FC = () => {
  const { incidents, weather } = useApp();

  const activeRoadIncidents = incidents.filter(
    (i) => i.verificationStatus !== 'resolved' && (i.type === 'fallen_tree' || i.type === 'waterlogging' || i.type === 'road_blockage' || i.type === 'road_damage')
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      
      {/* 1. Weather Risk */}
      <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
        <Link
          to="/weather"
          className="card-clean-hover p-4 block group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Atmospheric Hazard Index
            </span>
            <div className="p-1.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
              <CloudRain className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-xl font-bold text-amber-700 dark:text-amber-400">Moderate</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{weather?.rainProbability}% Rain</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
            Convective storm cells forming southwest of city
          </p>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-medium">
            <span>Inspect Radar Echo</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </Link>
      </motion.div>

      {/* 2. Road Risk */}
      <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
        <Link
          to="/map"
          className="card-clean-hover p-4 block group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Corridor Obstacle Density
            </span>
            <div className="p-1.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-xl font-bold text-rose-700 dark:text-rose-400">
              {activeRoadIncidents.length} Hazards
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Within 8km</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
            Fallen tree on Baner Rd & subway water build-up
          </p>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-medium">
            <span>Open Civic Map</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </Link>
      </motion.div>

      {/* 3. Air Quality */}
      <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
        <Link
          to="/weather"
          className="card-clean-hover p-4 block group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Air Quality & Particulates
            </span>
            <div className="p-1.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
              <Wind className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-xl font-bold text-slate-900 dark:text-white">AQI {weather?.aqi}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{weather?.aqiCategory}</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
            PM2.5 within moderate threshold; safe for routine commute
          </p>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-medium">
            <span>View Metric Breakdown</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </Link>
      </motion.div>

    </div>
  );
};
