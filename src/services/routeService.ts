import { DEMO_INCIDENT_AHEAD_ALERT, DEMO_ROUTES } from '@/data/demoRoutes';
import { RouteAheadAlert, RouteOption } from '@/types/route';
import { Incident } from '@/types/incident';

class RouteService {
  public getAvailableRoutes(): RouteOption[] {
    return [...DEMO_ROUTES];
  }

  public getIncidentAheadAlert(activeIncidents: Incident[]): RouteAheadAlert | null {
    // Check if the Baner road fallen tree is active and unresolved
    const banerIncident = activeIncidents.find(
      (inc) => inc.id === 'inc-001' && inc.verificationStatus !== 'resolved'
    );

    if (banerIncident) {
      return {
        ...DEMO_INCIDENT_AHEAD_ALERT,
        confirmations: banerIncident.signals.communityConfirmations,
        reportedTimeAgo: banerIncident.reportedAt,
      };
    }
    return null;
  }
}

export const routeService = new RouteService();
