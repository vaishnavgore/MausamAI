import React from 'react';
import { 
  CloudSun, 
  Wind, 
  Radar, 
  MapPin, 
  UserCheck, 
  Users, 
  Newspaper, 
  ShieldAlert,
  Cpu,
  Layers,
  CheckCircle2,
  Sparkles,
  ArrowDown
} from 'lucide-react';

export const DataFusionDiagram: React.FC = () => {
  return (
    <div className="card-clean p-6 bg-white dark:bg-[#111827]/85 border-slate-200 dark:border-slate-800 space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          System Architecture & Data Pipeline
        </span>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          MausamAI Multi-Signal Data Fusion Engine
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Transforming disparate sensory streams into verified, hyper-personalized civil intelligence.
        </p>
      </div>

      {/* Layer 1: Ingestion Sources */}
      <div>
        <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 text-center">
          1. Multi-Modal Sensory & Signal Ingestion
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {[
            { icon: CloudSun, label: 'IMD Weather', color: 'text-blue-600 dark:text-blue-400' },
            { icon: Wind, label: 'AQI / UV Index', color: 'text-emerald-600 dark:text-emerald-400' },
            { icon: Radar, label: 'Doppler Radar', color: 'text-sky-600 dark:text-sky-400' },
            { icon: MapPin, label: 'GPS Coordinates', color: 'text-rose-600 dark:text-rose-400' },
            { icon: UserCheck, label: 'Role Profile', color: 'text-indigo-600 dark:text-indigo-400' },
            { icon: Users, label: 'Citizen Reports', color: 'text-amber-600 dark:text-amber-400' },
            { icon: Newspaper, label: 'News Wires', color: 'text-orange-600 dark:text-orange-400' },
            { icon: ShieldAlert, label: 'Official NDMA', color: 'text-red-600 dark:text-red-400' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-center flex flex-col items-center justify-center gap-1.5"
              >
                <Icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center text-slate-400 dark:text-slate-600">
        <ArrowDown className="w-4 h-4" />
      </div>

      {/* Layer 2: Core Fusion & Verification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        
        <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-center space-y-1">
          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center mx-auto mb-2">
            <Cpu className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            2. Multi-Signal Fusion Core
          </h4>
          <p className="text-[11px] text-slate-600 dark:text-slate-300">
            Spatial-temporal correlation, spatial buffer indexing, and automated cross-source signal matching.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-center space-y-1">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center mx-auto mb-2">
            <Layers className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            3. Trust & Confidence Scoring
          </h4>
          <p className="text-[11px] text-slate-600 dark:text-slate-300">
            Freshness decay rate, community corroborate voting, and photo evidence classification weighting.
          </p>
        </div>

      </div>

      <div className="flex justify-center text-slate-400 dark:text-slate-600">
        <ArrowDown className="w-4 h-4" />
      </div>

      {/* Layer 3: Personalization Engine */}
      <div className="max-w-md mx-auto p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-center space-y-1">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>4. Contextual Personalization Engine</span>
        </div>
        <p className="text-[11px] text-slate-700 dark:text-slate-300">
          Tailoring priority widgets, threshold alarms, and routing advisories to the user's specific routine.
        </p>
      </div>

      <div className="flex justify-center text-slate-400 dark:text-slate-600">
        <ArrowDown className="w-4 h-4" />
      </div>

      {/* Layer 4: Actionable Deliverables */}
      <div>
        <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 text-center">
          5. Actionable Citizen & Operational Touchpoints
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {[
            { title: 'Personalized Advice', desc: 'Explaining exact risks' },
            { title: 'Live Civic Map', desc: 'Interactive obstacle pins' },
            { title: 'Route Risk Awareness', desc: 'Incident-ahead detection' },
            { title: 'Unified Smart Alerts', desc: 'Categorized notifications' },
            { title: 'Explainable AI Bot', desc: 'Natural language queries' },
          ].map((out, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-center"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto mb-1.5" />
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{out.title}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{out.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
