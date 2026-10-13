import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  X, 
  CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { USER_PROFILES } from '@/data/demoProfiles';

export const ProfileAdvisoryCard: React.FC = () => {
  const { profile, weather, incidents, location } = useApp();
  const [showExplainModal, setShowExplainModal] = useState(false);

  const profileInfo = USER_PROFILES[profile];
  const activeIncidents = incidents.filter((i) => i.verificationStatus !== 'resolved');

  const getAdvisoryContent = () => {
    switch (profile) {
      case 'farmer':
        return {
          mainText: weather && weather.rainProbability > 50
            ? 'Heavy convective precipitation expected between 2:00 PM – 5:00 PM. Delay pesticide spraying and safeguard standing onion/tomato crops against soil erosion.'
            : 'Moderate weather today. Optimal window for inter-culture operations and controlled drip irrigation before upcoming weekend showers.',
          actionTip: 'Inspect field runoff channels near lower contour boundaries.',
          linkText: 'View 7-Day Agricultural Outlook',
          linkTo: '/weather',
        };
      case 'commuter':
        return {
          mainText: activeIncidents.some((i) => i.type === 'fallen_tree')
            ? 'Commuter Alert: Major tree obstruction confirmed on Baner Road corridor causing 18-minute vehicular slowdowns. Alternate Route B via Pashan recommended.'
            : 'Traffic flow normal across major arterial corridors. Light drizzle possible around evening peak hours.',
          actionTip: 'Take Route B via Pashan to bypass Baner Road congestion.',
          linkText: 'Inspect Live Route Risk Planner',
          linkTo: '/routes',
        };
      case 'fitness':
        return {
          mainText: weather && weather.aqi > 100
            ? `Air Quality Index is currently ${weather.aqi} (Moderate). Outdoor cardio after 6:30 PM is preferable when particulate concentrations settle.`
            : 'Ideal weather for outdoor running and cycling. Temperature 28°C with pleasant breeze.',
          actionTip: 'Carry hydration pack; UV index peaks around 1:30 PM.',
          linkText: 'Check Hourly Fitness Index',
          linkTo: '/weather',
        };
      case 'student_parent':
        return {
          mainText: 'Rain probability rises to 68% by afternoon school dispersal time (3:00 PM). Ensure rain gear is packed and anticipate mild transit delays near underpasses.',
          actionTip: 'Check Shivajinagar subway status before school commute.',
          linkText: 'Review Live School Corridors',
          linkTo: '/map',
        };
      case 'traveler':
        return {
          mainText: 'Inter-district highway travel toward Mumbai Expressway clear. Caution advised near ghat sections between 4:00 PM – 7:00 PM due to low visibility fog.',
          actionTip: 'Check headlights & tire tread depth prior to ghat descent.',
          linkText: 'Inspect Highway Obstacles',
          linkTo: '/map',
        };
      default:
        return {
          mainText: 'Weather conditions currently stable. Stay hydrated and monitor afternoon updates for local convective bursts.',
          actionTip: 'Keep umbrella handy for unexpected showers.',
          linkText: 'View Weather Outlook',
          linkTo: '/weather',
        };
    }
  };

  const advisory = getAdvisoryContent();

  return (
    <>
      <div className="card-clean p-5 border-l-4 border-l-blue-600 dark:border-l-blue-500 bg-white dark:bg-[#111827]/85 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2.5">
          
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Targeted Operational Advisory
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80">
                {profileInfo.title.split(' ')[0]} Profile
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowExplainModal(true)}
            className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium bg-blue-50/60 dark:bg-blue-950/40 hover:bg-blue-100/60 dark:hover:bg-blue-900/40 px-2.5 py-1 rounded-lg border border-blue-200/60 dark:border-blue-900/60 transition"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Explain Logic</span>
          </button>
        </div>

        {/* Advisory Body */}
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed mb-3">
          {advisory.mainText}
        </p>

        {/* Action Tip Pill & Deep Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-blue-700 dark:text-blue-400">Recommended Action:</span>
            <span className="text-slate-700 dark:text-slate-300">{advisory.actionTip}</span>
          </div>

          <Link
            to={advisory.linkTo}
            className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition whitespace-nowrap"
          >
            <span>{advisory.linkText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Explainable AI Modal with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {showExplainModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Explainable AI: Decision Synthesis Logic
                  </h3>
                </div>
                <button
                  onClick={() => setShowExplainModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                MausamAI synthesizes real-time signals through deterministic rule pipelines cross-referenced with live sensor telemetry:
              </p>

              <div className="space-y-2">
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Active Profile: {profileInfo.title}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">{profileInfo.description}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Sensor Coordinates: {location.city}, {location.state}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">Primary station latitude {location.lat}, longitude {location.lng}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Precipitation Threshold: {weather?.rainProbability}% Rain</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">Convective echo detected in radar volume scan</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Corroborated Ground Hazards</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">{activeIncidents.length} active verified obstacles within monitored transit corridor</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowExplainModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm"
                >
                  Close Explanation
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
