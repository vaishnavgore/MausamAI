import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { PlusCircle, Clock, MapPin } from 'lucide-react';
import { getSeverityBadge, getVerificationStatusBadge } from '@/utils/severity';

interface ReportsPageProps {
  onOpenReportModal: () => void;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ onOpenReportModal }) => {
  const { incidents } = useApp();
  const [activeTab, setActiveTab] = useState<'active' | 'under_review' | 'resolved'>('active');

  const filtered = incidents.filter((inc) => {
    if (activeTab === 'resolved') return inc.verificationStatus === 'resolved';
    if (activeTab === 'under_review') return inc.verificationStatus === 'under_review' || inc.verificationStatus === 'reported';
    return inc.verificationStatus !== 'resolved';
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
            Citizen Engagement
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Incident Submissions & Verification Status
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track your contributed obstacle reports, community corroborate votes, and resolution audits.
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-500/25 transition transform active:scale-95 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Submit New Report</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'active', label: 'Active Hazards' },
          { id: 'under_review', label: 'Under Review' },
          { id: 'resolved', label: 'Resolved & Cleared' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === tab.id
                ? 'bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs">
            No reports in this category. Click "+ Submit New Report" to log an obstacle.
          </div>
        ) : (
          filtered.map((inc) => {
            const statusBadge = getVerificationStatusBadge(inc.verificationStatus);
            const sevBadge = getSeverityBadge(inc.severity);

            return (
              <div
                key={inc.id}
                className="card-clean p-5 bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between hover:border-slate-300 dark:hover:border-cyan-500/40 transition"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${sevBadge.bg}`}>
                      {sevBadge.text}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusBadge.color}`}>
                      {statusBadge.label}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {inc.title}
                  </h3>

                  <div className="mt-2 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <p className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>{inc.locationName}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400 shrink-0" />
                      <span>Reported: {inc.reportedAt} • Updated: {inc.updatedAt}</span>
                    </p>
                  </div>
                </div>

                {inc.imageUrl && (
                  <div className="aspect-video max-h-32 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                    <img src={inc.imageUrl} alt={inc.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Community Proof:</span>
                  <span className="font-bold text-purple-700 dark:text-purple-400">
                    {inc.signals.communityConfirmations} Verifications
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
