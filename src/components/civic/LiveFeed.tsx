import React from 'react';
import { CheckCircle, CloudRain, Newspaper, AlertCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const LiveFeed: React.FC = () => {
  const { liveFeed } = useApp();

  const getFeedIcon = (type: string) => {
    switch (type) {
      case 'confirm':
        return <CheckCircle className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />;
      case 'weather':
        return <CloudRain className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />;
      case 'news':
        return <Newspaper className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />;
      case 'resolve':
        return <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
      case 'report':
      default:
        return <AlertCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />;
    }
  };

  return (
    <div className="card-clean p-5 bg-white dark:bg-slate-900/80">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="absolute w-4 h-4 rounded-full bg-emerald-500/30 animate-ping"></span>
          </div>
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Live Telemetry Feed
          </h3>
        </div>
        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
          Simulated Stream
        </span>
      </div>

      <div className="space-y-3">
        {liveFeed.slice(0, 6).map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-2.5 text-xs transition-all hover:translate-x-0.5"
          >
            <div className="mt-0.5 p-1 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
              {getFeedIcon(item.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">{item.title}</p>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono shrink-0">{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
