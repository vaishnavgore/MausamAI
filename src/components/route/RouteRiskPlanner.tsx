import React, { useState } from 'react';
import { 
  Navigation, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useApp } from '@/context/AppContext';

export const RouteRiskPlanner: React.FC = () => {
  const { routes, selectedRoute, setSelectedRoute, incidentAheadAlert } = useApp();
  const [origin, setOrigin] = useState('Pune Railway Station');
  const [destination, setDestination] = useState('Hinjawadi IT Park, Phase 1');

  const handleSwitchToRouteB = () => {
    const routeB = routes.find((r) => r.id === 'route-b');
    if (routeB) {
      setSelectedRoute(routeB);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Route Selector Header */}
      <div className="card-clean p-5 bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-cyan-950/70 text-blue-600 dark:text-cyan-400 shadow-xs">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                Route Risk & Hazard Intersector
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Evaluating active obstacles, waterlogging, and rainfall along transit corridors
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            Pune Smart Corridor
          </span>
        </div>

        {/* Origin & Destination Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 animate-pulse"></span>
            <span className="text-slate-500 dark:text-slate-400 font-medium shrink-0">Start:</span>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="bg-transparent text-slate-900 dark:text-white font-semibold focus:outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
            <span className="text-slate-500 dark:text-slate-400 font-medium shrink-0">Destination:</span>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-transparent text-slate-900 dark:text-white font-semibold focus:outline-none w-full"
            />
          </div>
        </div>
      </div>

      {/* "INCIDENT AHEAD" Banner with bounce animation */}
      {incidentAheadAlert && (
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-2xl p-5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 shadow-sm dark:shadow-[0_0_25px_rgba(244,63,94,0.15)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ rotate: [-6, 6, -6] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="p-2 rounded-xl bg-rose-600 text-white font-bold shrink-0 shadow-sm"
              >
                <AlertTriangle className="w-5 h-5" />
              </motion.div>
              <div className="space-y-1 text-slate-900 dark:text-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
                    ⚠ Critical Obstacle Ahead on Route A
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-900/70 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800">
                    ~{incidentAheadAlert.distanceAheadMeters}m ahead
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {incidentAheadAlert.incidentType}: {incidentAheadAlert.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Reported {incidentAheadAlert.reportedTimeAgo} • Corroborated by {incidentAheadAlert.confirmations} citizen verifications.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-400">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{incidentAheadAlert.recommendation}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSwitchToRouteB}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/25 transition shrink-0 hidden sm:flex items-center gap-1.5 active:scale-95"
            >
              <span>Switch to Route B</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Route Options Comparison Cards with Framer Motion hover elevation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {routes.map((route) => {
          const isSelected = selectedRoute.id === route.id;
          const isHighRisk = route.riskLevel === 'high_risk';
          const isClear = route.riskLevel === 'clear';

          return (
            <motion.div
              key={route.id}
              onClick={() => setSelectedRoute(route)}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`cursor-pointer rounded-xl p-5 border transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-white dark:bg-[#111827] border-blue-600 dark:border-blue-500 ring-2 ring-blue-600/20 dark:ring-blue-500/25 shadow-md'
                  : 'bg-white dark:bg-[#111827]/70 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
              }`}
            >
              {route.isRecommended && (
                <div className="absolute top-0 right-0 bg-emerald-600 text-white font-bold text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-bl-lg flex items-center gap-1 shadow-xs">
                  <Zap className="w-2.5 h-2.5" />
                  <span>Recommended</span>
                </div>
              )}

              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                    {route.name}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {route.distanceKm} km
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{route.via}</p>

                {/* Duration & Risk Badge */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">
                      {route.durationMinutes}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">min</span>
                  </div>

                  {isHighRisk ? (
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-[10px] font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-rose-500" />
                      {route.incidentCount} Hazards Active
                    </span>
                  ) : isClear ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      Clear Corridor
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[10px] font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      Moderate Spray
                    </span>
                  )}
                </div>

                {/* Incident Details Summary */}
                <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  {route.incidentDetails?.map((detail, idx) => (
                    <p key={idx} className="flex items-center gap-1.5 text-[11px]">
                      <span className={isHighRisk ? 'text-rose-500' : 'text-emerald-500'}>•</span>
                      <span>{detail}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Bottom selection feedback */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Weather: {route.weatherCondition}
                </span>
                <span className={`font-bold ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
                  {isSelected ? 'Active on Map ✓' : 'Select'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
