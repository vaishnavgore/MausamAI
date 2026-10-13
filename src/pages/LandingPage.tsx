import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Activity, 
  Car, 
  Compass, 
  GraduationCap, 
  Wheat,
  Layers,
  Sparkles,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { USER_PROFILES } from '@/data/demoProfiles';
import { UserProfileType } from '@/types/user';
import { DataFusionDiagram } from '@/components/intelligence/DataFusionDiagram';

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: custom * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

export const LandingPage: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<UserProfileType>('commuter');
  const persona = USER_PROFILES[selectedPersona];

  const personaIcons: Record<UserProfileType, React.ElementType> = {
    commuter: Car,
    farmer: Wheat,
    fitness: Activity,
    student_parent: GraduationCap,
    traveler: Compass,
  };

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-[#0b0f19]/70 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          
          <motion.div
            custom={0}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Multi-Modal Meteorological & Civic Risk Intelligence Platform
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.12]"
          >
            Adaptive Weather Intelligence <br />
            <span className="text-blue-600 dark:text-blue-400">
              Engineered for Real-World Decisions.
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed"
          >
            Ground telemetry fused with automated multi-signal corroboration. Delivering personalized thresholds for commuters, agriculture, and urban emergency preparedness.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <Link
              to="/dashboard"
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm flex items-center gap-2 transition active:scale-98"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#architecture"
              className="px-6 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-sm font-semibold transition"
            >
              System Architecture
            </a>
          </motion.div>

          {/* Hero Live Interface Visual Preview */}
          <motion.div
            custom={4}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="pt-10 max-w-4xl mx-auto"
          >
            <div className="rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 p-6 shadow-md text-left space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-2">
                    Station Telemetry Node • Pune Met Center
                  </span>
                </div>
                <div className="badge-emerald">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Calibrated Dual Doppler Radar</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Ambient Conditions</span>
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">31.4°C</div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Precipitation Probability: <span className="font-semibold text-blue-600 dark:text-blue-400">18%</span></p>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Corroborated Hazard</span>
                  <div className="text-sm font-bold text-amber-700 dark:text-amber-400 mt-1">Waterlogging Underpass</div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Shivajinagar Substation (92% Conf)</p>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Adaptive Routing</span>
                  <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400 mt-1">Alternate Corridor Recommended</div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Avoids high-risk depth polylines</p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. THE PROBLEM & SOLUTION COMPARISON */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 dark:border-slate-800/80 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          
          <div className="p-8 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              Traditional Systems
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
              One-Size-Fits-All Static Weather Forecasts
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Standard consumer apps only show broad regional temperatures with no context for ground obstacles. A farmer spraying chemicals, an ambulance route planner, and an office commuter receive identical notifications with zero actionable insight.
            </p>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-2">
              <li className="flex items-center gap-2">✕ No civic obstacle correlation</li>
              <li className="flex items-center gap-2">✕ Zero multi-signal validation of road hazards</li>
              <li className="flex items-center gap-2">✕ Generic advice disconnected from actual user roles</li>
            </ul>
          </div>

          <div className="p-8 rounded-xl bg-white dark:bg-[#111827] border border-blue-200 dark:border-blue-900/60 space-y-4 shadow-sm">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              The MausamAI Approach
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
              Explainable AI Fused with Corroborated Civic Signals
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              MausamAI correlates radar echoes, local news feeds, and crowd reports into an authenticated confidence score, delivering tailored operational advice per persona.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 pt-2">
              <li className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Adaptive role thresholds (Farmer, Commuter, Logistics, Outdoor)
              </li>
              <li className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Multi-signal confidence scoring (CV Model + News + Citizen)
              </li>
              <li className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Interactive corridor hazard rerouting
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 3. PERSONA ADAPTATION SELECTOR */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 dark:border-slate-800/80 max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Operational Adaptability
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Role-Based Intelligence Profiles
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Select a target profile to preview how MausamAI dynamically transforms data thresholds and advisory synthesis.
          </p>
        </div>

        {/* Persona Selector Tabs with Framer Motion layoutId */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {(Object.keys(USER_PROFILES) as UserProfileType[]).map((pKey) => {
            const isSelected = selectedPersona === pKey;
            const pInfo = USER_PROFILES[pKey];
            const PIcon = personaIcons[pKey];
            return (
              <button
                key={pKey}
                onClick={() => setSelectedPersona(pKey)}
                className={`relative px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 ${
                  isSelected
                    ? 'text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="persona-active-tab"
                    className="absolute inset-0 bg-blue-600 rounded-lg -z-10 shadow-xs"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <PIcon className="w-3.5 h-3.5" />
                <span>{pInfo.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Persona Detail Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPersona}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{persona.title}</h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{persona.subtitle}</p>
              </div>
              <Link
                to="/dashboard"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Open in Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {persona.description}
            </p>

            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Prioritized Threshold Indicators:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {persona.priorityTags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 text-xs font-medium"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </section>

      {/* 4. DATA FUSION ARCHITECTURE */}
      <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 dark:border-slate-800/80 max-w-5xl mx-auto">
        <DataFusionDiagram />
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-4">
        <div className="p-10 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Ready for Evaluation & Live Demonstration
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Launch the Meteorological Intelligence Sandbox
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Test incident simulations, review multi-signal corroboration weights, explore radar sweeps, and verify how the explainable AI adapts to real-world operational challenges.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition active:scale-98"
          >
            <span>Launch Operations Console</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
};
