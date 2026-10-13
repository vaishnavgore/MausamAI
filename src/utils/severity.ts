import { IncidentSeverity, IncidentType, VerificationStatus } from '@/types/incident';
import { AlertSeverity } from '@/types/alert';

export function getSeverityBadge(severity: IncidentSeverity | AlertSeverity) {
  switch (severity.toLowerCase()) {
    case 'high':
    case 'high risk':
      return {
        bg: 'bg-rose-50 text-rose-700 border-rose-200',
        dot: 'bg-rose-500',
        glow: 'ring-rose-400',
        text: 'High Risk',
      };
    case 'moderate':
    case 'warning':
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500',
        glow: 'ring-amber-400',
        text: 'Moderate / Warning',
      };
    case 'advisory':
      return {
        bg: 'bg-orange-50 text-orange-700 border-orange-200',
        dot: 'bg-orange-500',
        glow: 'ring-orange-400',
        text: 'Advisory',
      };
    case 'low':
    case 'information':
    default:
      return {
        bg: 'bg-blue-50 text-blue-700 border-blue-200',
        dot: 'bg-blue-500',
        glow: 'ring-blue-400',
        text: 'Low / Info',
      };
  }
}

export function getVerificationStatusBadge(status: VerificationStatus) {
  switch (status) {
    case 'official_confirmed':
      return {
        label: 'Officially Confirmed',
        color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        icon: 'ShieldCheck',
      };
    case 'community_confirmed':
      return {
        label: 'Community Confirmed',
        color: 'bg-purple-100 text-purple-800 border-purple-300',
        icon: 'Users',
      };
    case 'corroborated':
      return {
        label: 'Corroborated Event',
        color: 'bg-blue-100 text-blue-800 border-blue-300',
        icon: 'Layers',
      };
    case 'under_review':
      return {
        label: 'Under Review',
        color: 'bg-amber-100 text-amber-800 border-amber-300',
        icon: 'Clock',
      };
    case 'resolved':
      return {
        label: 'Resolved',
        color: 'bg-slate-100 text-slate-700 border-slate-300',
        icon: 'CheckCircle2',
      };
    case 'reported':
    default:
      return {
        label: 'Citizen Reported',
        color: 'bg-slate-100 text-slate-800 border-slate-300',
        icon: 'AlertCircle',
      };
  }
}

export function getIncidentTypeLabel(type: IncidentType): string {
  const map: Record<IncidentType, string> = {
    heavy_rain: 'Heavy Rain / Cloudburst',
    waterlogging: 'Waterlogging / Stagnation',
    fallen_tree: 'Fallen Tree / Branch',
    road_damage: 'Road Damage / Pothole Trench',
    accident: 'Vehicle Accident',
    road_blockage: 'Road Blockage / Jam',
    storm_damage: 'Storm Damage / Grid Issue',
    landslide: 'Ghat Landslide / Rockfall',
    fallen_electric_pole: 'Fallen Electric Pole / Wire',
    low_visibility: 'Low Visibility / Fog',
    road_closure: 'Official Road Closure',
    other: 'Civic Incident',
  };
  return map[type] || 'Civic Incident';
}
