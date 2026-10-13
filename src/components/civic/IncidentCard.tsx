import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  ThumbsUp, 
  EyeOff, 
  CheckCircle2, 
  Sparkles, 
  Layers,
  X
} from 'lucide-react';
import { Incident } from '@/types/incident';
import { useApp } from '@/context/AppContext';
import { formatDistance } from '@/utils/formatters';
import { getSeverityBadge, getVerificationStatusBadge } from '@/utils/severity';
import { assessIncidentTrust } from '@/utils/confidence';

interface IncidentCardProps {
  incident: Incident;
  onClose?: () => void;
  showActions?: boolean;
}

export const IncidentCard: React.FC<IncidentCardProps> = ({ 
  incident, 
  onClose,
  showActions = true 
}) => {
  const { confirmIncident, notSeenIncident, markResolved } = useApp();
  const [feedbackGiven, setFeedbackGiven] = useState<string | null>(null);

  const trust = assessIncidentTrust(incident);
  const severityBadge = getSeverityBadge(incident.severity);
  const statusBadge = getVerificationStatusBadge(incident.verificationStatus);

  const handleConfirm = () => {
    confirmIncident(incident.id);
    setFeedbackGiven('confirmed');
  };

  const handleNotSeen = () => {
    notSeenIncident(incident.id);
    setFeedbackGiven('not_seen');
  };

  const handleResolve = () => {
    markResolved(incident.id);
    setFeedbackGiven('resolved');
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xl dark:shadow-[0_16px_48px_rgba(0,0,0,0.8)] space-y-4 text-slate-800 dark:text-slate-200">
      
      {/* Header: Type, Severity & Close */}
      <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${severityBadge.bg}`}>
              {severityBadge.text}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusBadge.color}`}>
              {statusBadge.label}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${trust.freshnessColor}`}>
              {trust.freshnessLabel} Freshness
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
            {incident.title}
          </h3>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Geolocation & Time Info */}
      <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80">
          <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
          <div className="truncate">
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium truncate">{incident.locationName}</p>
            <p className="font-bold text-slate-900 dark:text-white truncate">{formatDistance(incident.distanceKm)}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80">
          <Clock className="w-4 h-4 text-blue-500 dark:text-cyan-400 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Reported</p>
            <p className="font-bold text-slate-900 dark:text-white">{incident.reportedAt}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        {incident.description}
      </p>

      {/* Photo Evidence Preview (if present) */}
      {incident.imageUrl && (
        <div className="space-y-1.5">
          <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 aspect-video max-h-44">
            <img
              src={incident.imageUrl}
              alt={incident.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs text-[10px] font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs">
              Citizen Photo Evidence
            </div>
          </div>

          {/* AI-Assisted Classification Badge */}
          {incident.signals.aiClassification && (
            <div className="flex items-center justify-between p-2 rounded-xl bg-blue-50 dark:bg-cyan-950/50 border border-blue-200 dark:border-cyan-800/80 text-xs">
              <div className="flex items-center gap-1.5 text-blue-900 dark:text-cyan-300">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                <span className="font-bold">AI Classification:</span>
                <span>{incident.signals.aiClassification.label}</span>
              </div>
              <span className="text-[10px] font-bold text-blue-700 dark:text-cyan-300 bg-blue-100 dark:bg-cyan-900/60 px-2 py-0.5 rounded">
                {Math.round(incident.signals.aiClassification.confidence * 100)}% Match
              </span>
            </div>
          )}
        </div>
      )}

      {/* Multi-Signal Verification Breakdown */}
      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
            <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>MausamAI Multi-Signal Fusion</span>
          </div>
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${trust.scoreBadgeColor}`}>
            {trust.level} Confidence
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-[11px] pt-1">
          <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 text-center border border-slate-200 dark:border-slate-750">
            <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase font-medium">Weather/Radar</p>
            <p className={`font-bold ${incident.signals.radarSignal ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}`}>
              {incident.signals.radarSignal ? 'Detected ✓' : 'Inactive'}
            </p>
          </div>

          <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 text-center border border-slate-200 dark:border-slate-750">
            <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase font-medium">Community</p>
            <p className="font-bold text-purple-700 dark:text-purple-400">
              {incident.signals.communityConfirmations} Votes
            </p>
          </div>

          <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 text-center border border-slate-200 dark:border-slate-750">
            <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase font-medium">News Wires</p>
            <p className={`font-bold ${incident.signals.newsSignalCount > 0 ? 'text-amber-700 dark:text-amber-400' : 'text-slate-400'}`}>
              {incident.signals.newsSignalCount > 0 ? `${incident.signals.newsSignalCount} Wire(s)` : 'None'}
            </p>
          </div>
        </div>

        {trust.reasons.length > 0 && (
          <ul className="text-[10px] text-slate-500 dark:text-slate-400 space-y-1 pt-1 border-t border-slate-200 dark:border-slate-700 list-disc list-inside">
            {trust.reasons.slice(0, 3).map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Community Confirmation Actions */}
      {showActions && incident.verificationStatus !== 'resolved' && (
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-semibold mb-2">
            <span>Community Verification:</span>
            <span className="text-slate-700 dark:text-slate-300">
              {incident.signals.communityConfirmations} Confirmed • {incident.signals.communityNotSeen} Not Seen
            </span>
          </div>

          {feedbackGiven ? (
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300 text-center flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Thank you! Your citizen confirmation was registered.</span>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleConfirm}
                className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center justify-center gap-1 transition shadow-md shadow-cyan-500/25 active:scale-95"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Confirm</span>
              </button>

              <button
                onClick={handleNotSeen}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-1 transition border border-slate-200 dark:border-slate-700 active:scale-95"
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span>Not Seen</span>
              </button>

              <button
                onClick={handleResolve}
                className="px-2.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold flex items-center justify-center gap-1 transition active:scale-95"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Resolved</span>
              </button>
            </div>
          )}
        </div>
      )}

      {incident.verificationStatus === 'resolved' && (
        <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>This hazard has been resolved and the roadway is clear.</span>
        </div>
      )}

    </div>
  );
};
