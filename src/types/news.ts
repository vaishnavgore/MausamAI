export interface NewsSignal {
  id: string;
  headline: string;
  sourceName: string;
  sourceUrl: string;
  time: string;
  location: string;
  relatedIncidentType?: string;
  crossSignalStatus: {
    weatherSignal: boolean;
    communitySignal: boolean;
    radarSignal: boolean;
    statusText: string;
    trustRating: 'high' | 'moderate' | 'low';
  };
}
