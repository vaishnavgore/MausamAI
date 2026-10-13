import { RouteAheadAlert, RouteOption } from '@/types/route';

export const DEMO_ROUTES: RouteOption[] = [
  {
    id: 'route-a',
    name: 'Route A',
    via: 'via Baner Road (Direct)',
    durationMinutes: 44, // Delay due to tree
    distanceKm: 16.2,
    riskLevel: 'high_risk',
    incidentCount: 2,
    incidentDetails: ['Fallen Tree (Baner Rd)', 'Waterlogging (Shivajinagar Subway)'],
    weatherCondition: 'Heavy rain & strong gusts',
    isRecommended: false,
    coordinates: [
      [18.5284, 73.8739], // Pune Station
      [18.5308, 73.8475], // Shivajinagar
      [18.5412, 73.8290], // Pune University Circle
      [18.5590, 73.7868], // Baner Road (Obstruction point)
      [18.5772, 73.7634], // Balewadi Stadium
      [18.5913, 73.7389], // Hinjawadi Phase 1
    ],
  },
  {
    id: 'route-b',
    name: 'Route B',
    via: 'via Pashan - Sus Bypass',
    durationMinutes: 36,
    distanceKm: 18.5,
    riskLevel: 'clear',
    incidentCount: 0,
    incidentDetails: ['Clear corridor. No active blockages reported.'],
    weatherCondition: 'Passing clouds, wet pavement',
    isRecommended: true,
    coordinates: [
      [18.5284, 73.8739], // Pune Station
      [18.5167, 73.8415], // Deccan Gymkhana
      [18.5360, 73.7930], // Pashan Circle
      [18.5520, 73.7610], // Sus Road
      [18.5750, 73.7420], // Highway Bypass
      [18.5913, 73.7389], // Hinjawadi Phase 1
    ],
  },
  {
    id: 'route-c',
    name: 'Route C',
    via: 'via Aundh - Ravet Spine',
    durationMinutes: 39,
    distanceKm: 19.8,
    riskLevel: 'advisory',
    incidentCount: 1,
    incidentDetails: ['Moderate drizzle & slow traffic at Aundh flyover'],
    weatherCondition: 'Scattered rain, moderate spray',
    isRecommended: false,
    coordinates: [
      [18.5284, 73.8739], // Pune Station
      [18.5412, 73.8290], // University Circle
      [18.5615, 73.8062], // Aundh
      [18.5830, 73.7850], // Wakad Bridge
      [18.5913, 73.7389], // Hinjawadi Phase 1
    ],
  },
];

export const DEMO_INCIDENT_AHEAD_ALERT: RouteAheadAlert = {
  incidentType: 'Fallen Tree',
  title: 'Large Banyan Branch Blocking Baner Road',
  location: 'Baner Road near Balewadi Phata',
  distanceAheadMeters: 700,
  reportedTimeAgo: '7 min ago',
  confirmations: 6,
  recommendation: 'Consider checking Route B via Pashan-Sus to save 12 minutes.',
};
