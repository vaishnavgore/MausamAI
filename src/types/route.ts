export interface RouteCoordinate {
  lat: number;
  lng: number;
}

export interface RouteOption {
  id: string;
  name: string;
  via: string;
  durationMinutes: number;
  distanceKm: number;
  riskLevel: 'clear' | 'advisory' | 'high_risk';
  incidentCount: number;
  incidentDetails?: string[];
  weatherCondition: string;
  isRecommended: boolean;
  coordinates: [number, number][];
}

export interface RouteAheadAlert {
  incidentType: string;
  title: string;
  location: string;
  distanceAheadMeters: number;
  reportedTimeAgo: string;
  confirmations: number;
  recommendation: string;
}
