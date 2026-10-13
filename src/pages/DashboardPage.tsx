import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CurrentWeatherCard 
} from '@/components/weather/CurrentWeatherCard';
import { 
  ProfileAdvisoryCard 
} from '@/components/weather/ProfileAdvisoryCard';
import { 
  RiskSummaryCards 
} from '@/components/weather/RiskSummaryCards';
import { 
  HourlyForecast 
} from '@/components/weather/HourlyForecast';
import { 
  CivicMap 
} from '@/components/civic/CivicMap';
import { 
  LiveFeed 
} from '@/components/civic/LiveFeed';
import { 
  NewsIntelligenceFeed 
} from '@/components/intelligence/NewsIntelligenceFeed';
import { 
  RouteRiskPlanner 
} from '@/components/route/RouteRiskPlanner';
import { 
  Incident 
} from '@/types/incident';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Bot, Sparkles } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

export const DashboardPage: React.FC = () => {
  const [selectedMapIncident, setSelectedMapIncident] = useState<Incident | null>(null);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6"
    >
      
      {/* 1. Personalized Advisory Banner */}
      <motion.div variants={itemVariants}>
        <ProfileAdvisoryCard />
      </motion.div>

      {/* 2. Current Weather Card with Live Particles */}
      <motion.div variants={itemVariants}>
        <CurrentWeatherCard />
      </motion.div>

      {/* 3. Quick Risk Summary (Weather, Road, Air Quality) */}
      <motion.div variants={itemVariants}>
        <RiskSummaryCards />
      </motion.div>

      {/* 4. Main Grid: Civic Map & Live Feed */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Live Civic Hazard & Doppler Radar Map
              </h3>
            </div>
            <Link
              to="/map"
              className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 flex items-center gap-1 transition"
            >
              <span>Full Screen Map</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <CivicMap
            heightClass="h-[460px]"
            selectedIncident={selectedMapIncident}
            onSelectIncident={setSelectedMapIncident}
          />
        </div>

        {/* Live Feed Column */}
        <div className="space-y-4">
          <LiveFeed />
          
          {/* Quick AI Assistant Card */}
          <div className="card-clean p-5 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-blue-600 dark:text-cyan-400">
              <Bot className="w-5 h-5" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Need Travel or Field Advice?
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ask MausamAI co-pilot for commute routes, outdoor running hours, or agricultural spray schedules.
            </p>
            <Link
              to="/assistant"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 transition"
            >
              <span>Launch AI Conversation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </motion.div>

      {/* 5. Hourly Forecast Timeline */}
      <motion.div variants={itemVariants}>
        <HourlyForecast />
      </motion.div>

      {/* 6. Route Risk Planner */}
      <motion.div variants={itemVariants}>
        <RouteRiskPlanner />
      </motion.div>

      {/* 7. News Intelligence Feed */}
      <motion.div variants={itemVariants}>
        <NewsIntelligenceFeed />
      </motion.div>

    </motion.div>
  );
};
