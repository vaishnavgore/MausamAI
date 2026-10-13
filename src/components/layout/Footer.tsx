import React from 'react';
import { CloudSun, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#0b0f19]/80 text-slate-600 dark:text-slate-400 text-xs py-10 mt-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Identity */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
                <CloudSun className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-slate-950 dark:text-white tracking-tight">
                Mausam<span className="text-blue-600 dark:text-blue-400">AI</span>
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[12px] leading-relaxed">
              Personalized meteorological intelligence and verified civic risk telemetry for safer urban transit and agricultural operations.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Multi-Source Signal Verification Node</span>
            </div>
          </div>

          {/* Col 2: System Capabilities */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              System Architecture
            </h4>
            <ul className="space-y-1.5 text-[12px]">
              <li><span className="text-slate-400 dark:text-slate-500">Pipeline:</span> <span className="text-slate-800 dark:text-slate-200 font-medium">Multi-Source Data Fusion</span></li>
              <li><span className="text-slate-400 dark:text-slate-500">Analysis:</span> <span className="text-slate-700 dark:text-slate-300">Hyperlocal Weather & Civic Risk</span></li>
              <li><span className="text-slate-400 dark:text-slate-500">Corroboration:</span> <span className="text-slate-700 dark:text-slate-300">Citizen & Sensor Telemetry</span></li>
              <li><span className="text-slate-400 dark:text-slate-500">Coverage:</span> <span className="text-blue-600 dark:text-blue-400 font-semibold">Urban & Regional Corridors</span></li>
            </ul>
          </div>

          {/* Col 3: Modules */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Intelligence Modules
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-[12px]">
              <Link to="/weather" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">Weather Outlook</Link>
              <Link to="/map" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">Live Civic Map</Link>
              <Link to="/routes" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">Route Risk</Link>
              <Link to="/reports" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">Citizen Reports</Link>
              <Link to="/alerts" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">Smart Alerts</Link>
              <Link to="/assistant" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">AI Assistant</Link>
            </div>
          </div>

          {/* Col 4: Responsible AI */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Responsible AI Statement
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              MausamAI assists decision-making by corroborating multi-source signals. It supplements official meteorological warnings and urban transit bulletins with explainable telemetry.
            </p>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-slate-400">
          <div>
            © 2026 MausamAI. Personalized Weather & Civic Intelligence System.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-medium">
              Designed for Academic & Enterprise Evaluation
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
