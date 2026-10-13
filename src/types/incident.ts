export type IncidentType =
  | 'heavy_rain'
  | 'waterlogging'
  | 'fallen_tree'
  | 'road_damage'
  | 'accident'
  | 'road_blockage'
  | 'storm_damage'
  | 'landslide'
  | 'fallen_electric_pole'
  | 'low_visibility'
  | 'road_closure'
  | 'other';

export type IncidentSeverity = 'low' | 'moderate' | 'high';

export type VerificationStatus =
  | 'reported'
  | 'under_review'
  | 'corroborated'
  | 'community_confirmed'
  | 'official_confirmed'
  | 'resolved';

export type SignalSource = 'official' | 'community' | 'news' | 'weather' | 'ai';

export interface SignalMetrics {
  weatherSignal: boolean;
  radarSignal: boolean;
  newsSignalCount: number;
  communityConfirmations: number;
  communityNotSeen: number;
  officialSource?: string;
  aiClassification?: {
    label: string;
    confidence: number;
    model: string;
  };
}

export interface Incident {
  id: string;
  type: IncidentType;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  locationName: string;
  distanceKm?: number;
  severity: IncidentSeverity;
  source: SignalSource;
  verificationStatus: VerificationStatus;
  reportedAt: string; // ISO string or relative label
  updatedAt: string;
  imageUrl?: string;
  signals: SignalMetrics;
  isUserReported?: boolean;
}
