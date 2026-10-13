import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  RotateCcw, 
  CloudRain, 
  TreePine, 
  Droplets, 
  Newspaper, 
  CheckCircle, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const DemoBar: React.FC = () => {
  const { triggerDemoScenario, resetDemo } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/90 dark:bg-[#0f1422]/90 backdrop-blur-md text-slate-800 dark:text-slate-200 px-3 py-1.5 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
        
        {/* Left: Simulation Control Tag */}
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 font-semibold text-[10px] tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            Evaluation Simulation Sandbox
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden md:inline">
            Inject real-time meteorological & civic hazard signals:
          </span>
          <button 
            onClick={() => setCollapsed(!collapsed)} 
            className="md:hidden text-slate-500 dark:text-slate-400 p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded"
          >
            {collapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Right: Simulation Triggers */}
        {!collapsed && (
          <div className="flex flex-wrap items-center gap-1.5">
            
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => triggerDemoScenario('heavy_rain')}
              className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-[11px] font-medium flex items-center gap-1 text-slate-700 dark:text-slate-200 shadow-xs transition"
              title="Simulate convective downpour in Pune with radar echo"
            >
              <CloudRain className="w-3 h-3 text-blue-500" />
              <span>Simulate Downpour</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => triggerDemoScenario('fallen_tree')}
              className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-[11px] font-medium flex items-center gap-1 text-slate-700 dark:text-slate-200 shadow-xs transition"
              title="Add high-severity tree obstruction on Baner Road"
            >
              <TreePine className="w-3 h-3 text-emerald-500" />
              <span>Fallen Tree</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => triggerDemoScenario('waterlogging')}
              className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-[11px] font-medium flex items-center gap-1 text-slate-700 dark:text-slate-200 shadow-xs transition"
              title="Trigger subway waterlogging at Shivajinagar"
            >
              <Droplets className="w-3 h-3 text-sky-500" />
              <span>Waterlogging</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => triggerDemoScenario('news_signal')}
              className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-[11px] font-medium flex items-center gap-1 text-slate-700 dark:text-slate-200 shadow-xs transition hidden sm:flex"
              title="Simulate breaking news alert from Sakal"
            >
              <Newspaper className="w-3 h-3 text-amber-500" />
              <span>News Signal</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => triggerDemoScenario('community_confirm')}
              className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-[11px] font-medium flex items-center gap-1 text-indigo-700 dark:text-indigo-300 shadow-xs transition"
              title="Add citizen confirmation vote"
            >
              <CheckCircle className="w-3 h-3 text-indigo-500" />
              <span>+1 Corroboration</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => triggerDemoScenario('resolve_incident')}
              className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800/60 text-[11px] font-medium flex items-center gap-1 text-emerald-800 dark:text-emerald-300 transition"
              title="Mark hazard officially resolved"
            >
              <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>Resolve Tree</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={resetDemo}
              className="px-2 py-1 rounded-md bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-[11px] font-medium flex items-center gap-1 text-slate-700 dark:text-slate-300 transition"
              title="Reset demo parameters to default"
            >
              <RotateCcw className="w-3 h-3 text-slate-500 dark:text-slate-400" />
              <span className="hidden sm:inline">Reset</span>
            </motion.button>

          </div>
        )}

      </div>
    </div>
  );
};
