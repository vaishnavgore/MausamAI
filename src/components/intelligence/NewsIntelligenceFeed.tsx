import React from 'react';
import { ExternalLink, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const NewsIntelligenceFeed: React.FC = () => {
  const { news } = useApp();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
            Multi-Signal Intelligence
          </span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            News & Media Cross-Signal Corroboration
          </h2>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {news.length} Monitored Wires
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {news.map((item) => (
          <div
            key={item.id}
            className="card-clean p-5 bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-cyan-500/40 transition"
          >
            {/* News Header */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-cyan-950/70 px-2.5 py-0.5 rounded-md border border-blue-200 dark:border-cyan-800">
                  {item.sourceName}
                </span>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-500" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-500" />
                    {item.time}
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                "{item.headline}"
              </h3>
            </div>

            {/* Cross-Signal Status Box */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-700 dark:text-slate-200">
                  MausamAI Cross-Signal Status:
                </span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Corroborated
                </span>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                <div className="p-1 rounded bg-white dark:bg-slate-900 text-center border border-slate-200 dark:border-slate-700/80">
                  <span className="text-slate-400 dark:text-slate-500 block text-[9px]">Weather Signal</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    {item.crossSignalStatus.weatherSignal ? 'Verified ✓' : 'Pending'}
                  </span>
                </div>

                <div className="p-1 rounded bg-white dark:bg-slate-900 text-center border border-slate-200 dark:border-slate-700/80">
                  <span className="text-slate-400 dark:text-slate-500 block text-[9px]">Community</span>
                  <span className="font-bold text-purple-700 dark:text-purple-400">
                    {item.crossSignalStatus.communitySignal ? 'Supported ✓' : '1 Report'}
                  </span>
                </div>

                <div className="p-1 rounded bg-white dark:bg-slate-900 text-center border border-slate-200 dark:border-slate-700/80">
                  <span className="text-slate-400 dark:text-slate-500 block text-[9px]">Radar Echo</span>
                  <span className="font-bold text-blue-700 dark:text-cyan-400">
                    {item.crossSignalStatus.radarSignal ? 'Detected ✓' : 'Clear'}
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-slate-500 dark:text-slate-400 italic">
                {item.crossSignalStatus.statusText}
              </p>
            </div>

            {/* Footer External Link */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                Headline citation & metadata only
              </span>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 flex items-center gap-1 transition"
              >
                <span>View Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
