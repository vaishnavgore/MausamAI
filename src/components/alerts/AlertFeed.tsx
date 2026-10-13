import React, { useState } from 'react';
import { 
  Clock, 
  MapPin
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { getSeverityBadge } from '@/utils/severity';

export const AlertFeed: React.FC = () => {
  const { alerts } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Alerts' },
    { id: 'Weather', label: 'Weather' },
    { id: 'Road', label: 'Road & Transit' },
    { id: 'AQI', label: 'Air Quality' },
    { id: 'Community', label: 'Community' },
  ];

  const filteredAlerts = alerts.filter((alert) => {
    if (selectedCategory === 'all') return true;
    return alert.category === selectedCategory;
  });

  return (
    <div className="space-y-4">
      {/* Alerts Filter Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
            Unified Notification Engine
          </span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Weather & Civic Intelligence Alerts
          </h2>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs">
            No active alerts in this category for your area.
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const badge = getSeverityBadge(alert.severity);
            return (
              <div
                key={alert.id}
                className="card-clean p-5 bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge.bg}`}>
                      {badge.text}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {alert.category}
                    </span>
                    {alert.location && (
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-500" />
                        {alert.location}
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-500" />
                    {alert.timestamp}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {alert.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {alert.message}
                  </p>
                </div>

                {alert.actionableTip && (
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-blue-700 dark:text-cyan-400 shrink-0">Action Tip:</span>
                    <span>{alert.actionableTip}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
