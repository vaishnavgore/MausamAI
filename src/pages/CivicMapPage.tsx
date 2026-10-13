import React, { useState } from 'react';
import { CivicMap } from '@/components/civic/CivicMap';
import { useApp } from '@/context/AppContext';
import { Incident } from '@/types/incident';
import { PlusCircle } from 'lucide-react';
import { formatDistance } from '@/utils/formatters';
import { getSeverityBadge } from '@/utils/severity';

interface CivicMapPageProps {
  onOpenReportModal: () => void;
}

export const CivicMapPage: React.FC<CivicMapPageProps> = ({ onOpenReportModal }) => {
  const { incidents, location } = useApp();
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const activeIncidents = incidents.filter((i) => i.verificationStatus !== 'resolved');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
            Spatial Intelligence
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Live Civic Hazard & Telemetry Map
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time citizen corroborated obstacles, road closures, and radar precipitation echoes in {location.city}.
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-500/25 transition transform active:scale-95 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Report New Incident</span>
        </button>
      </div>

      {/* Main Split View: Incidents Sidebar + Map Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left: Active Incidents Scroll List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 px-1">
            <span>Active Incidents ({activeIncidents.length})</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase">Click to Inspect</span>
          </div>

          <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {activeIncidents.map((inc) => {
              const badge = getSeverityBadge(inc.severity);
              const isSelected = selectedIncident?.id === inc.id;

              return (
                <div
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc)}
                  className={`cursor-pointer rounded-xl p-3.5 border transition-all text-xs space-y-1.5 ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-blue-600 dark:border-cyan-400 ring-2 ring-blue-600/20 dark:ring-cyan-400/25 shadow-md dark:shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                      : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${badge.bg}`}>
                      {badge.text}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                      {inc.reportedAt}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 dark:text-white text-xs leading-snug">
                    {inc.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span className="truncate max-w-[140px]">{inc.locationName.split(',')[0]}</span>
                    <span className="font-bold text-blue-600 dark:text-cyan-400">{formatDistance(inc.distanceKm)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Interactive Map */}
        <div className="lg:col-span-2 space-y-4">
          <CivicMap
            heightClass="h-[620px]"
            selectedIncident={selectedIncident}
            onSelectIncident={setSelectedIncident}
          />
        </div>

      </div>

    </div>
  );
};
