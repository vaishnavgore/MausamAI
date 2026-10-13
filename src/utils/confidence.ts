import { Incident } from '@/types/incident';

export interface ConfidenceAssessment {
  level: 'Low' | 'Moderate' | 'High';
  scoreBadgeColor: string;
  reasons: string[];
  freshnessLabel: 'Fresh' | 'Aging' | 'Stale';
  freshnessColor: string;
  summary: string;
}

export function assessIncidentTrust(incident: Incident): ConfidenceAssessment {
  const reasons: string[] = [];
  let score = 0;

  // 1. Official source presence
  if (incident.signals.officialSource) {
    score += 40;
    reasons.push(`Authoritative verification from ${incident.signals.officialSource}`);
  }

  // 2. Weather & Radar corroboration
  if (incident.signals.weatherSignal && incident.signals.radarSignal) {
    score += 25;
    reasons.push('Corroborated by active Doppler radar precipitation cells');
  } else if (incident.signals.weatherSignal) {
    score += 15;
    reasons.push('Consistent with local automated weather station conditions');
  }

  // 3. Community confirmations
  if (incident.signals.communityConfirmations >= 5) {
    score += 25;
    reasons.push(`${incident.signals.communityConfirmations} independent citizen confirmations`);
  } else if (incident.signals.communityConfirmations > 0) {
    score += 10;
    reasons.push(`${incident.signals.communityConfirmations} initial community report confirmation(s)`);
  }

  // 4. Photo Evidence
  if (incident.imageUrl) {
    score += 15;
    reasons.push('Photographic proof submitted with geolocation tag');
  }

  // 5. News Cross-Check
  if (incident.signals.newsSignalCount > 0) {
    score += 20;
    reasons.push(`Cross-referenced with ${incident.signals.newsSignalCount} local news wire reports`);
  }

  // Deductions for community doubts
  if (incident.signals.communityNotSeen > 0) {
    score -= incident.signals.communityNotSeen * 10;
    reasons.push(`${incident.signals.communityNotSeen} user(s) reported obstruction cleared/not visible`);
  }

  // Freshness determination (mock based on updatedAt string)
  let freshnessLabel: 'Fresh' | 'Aging' | 'Stale' = 'Fresh';
  let freshnessColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  const updatedLower = incident.updatedAt.toLowerCase();

  if (updatedLower.includes('hour') || updatedLower.includes('hr')) {
    freshnessLabel = 'Stale';
    freshnessColor = 'bg-slate-100 text-slate-600 border-slate-200';
  } else if (parseInt(updatedLower) > 20 || updatedLower.includes('30') || updatedLower.includes('45')) {
    freshnessLabel = 'Aging';
    freshnessColor = 'bg-amber-50 text-amber-700 border-amber-200';
  }

  let level: 'Low' | 'Moderate' | 'High' = 'Low';
  let scoreBadgeColor = 'bg-slate-100 text-slate-700 border-slate-300';
  let summary = 'Single unconfirmed report. Verifying with local sensors.';

  if (score >= 50 || incident.verificationStatus === 'official_confirmed' || incident.verificationStatus === 'corroborated') {
    level = 'High';
    scoreBadgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-300';
    summary = 'Multiple independent signals corroborate this event.';
  } else if (score >= 25 || incident.signals.communityConfirmations >= 2) {
    level = 'Moderate';
    scoreBadgeColor = 'bg-amber-50 text-amber-800 border-amber-300';
    summary = 'Moderate confidence supported by early citizen signals.';
  }

  return {
    level,
    scoreBadgeColor,
    reasons,
    freshnessLabel,
    freshnessColor,
    summary,
  };
}
