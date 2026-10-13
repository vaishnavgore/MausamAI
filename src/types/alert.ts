export type AlertCategory =
  | 'Weather'
  | 'Road'
  | 'Waterlogging'
  | 'Storm'
  | 'AQI'
  | 'Travel'
  | 'Community';

export type AlertSeverity = 'Information' | 'Advisory' | 'Warning' | 'High Risk';

export interface AlertItem {
  id: string;
  title: string;
  message: string;
  category: AlertCategory;
  severity: AlertSeverity;
  timestamp: string;
  location?: string;
  actionableTip?: string;
  relevantProfiles: string[];
}
