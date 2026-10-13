import { INITIAL_ALERTS } from '@/data/demoAlerts';
import { AlertItem } from '@/types/alert';
import { UserProfileType } from '@/types/user';

class AlertService {
  private alerts: AlertItem[] = [...INITIAL_ALERTS];

  public getAlerts(profile?: UserProfileType): AlertItem[] {
    if (!profile) return [...this.alerts];
    return this.alerts.filter(
      (a) => a.relevantProfiles.length === 0 || a.relevantProfiles.includes(profile)
    );
  }

  public addAlert(alert: Omit<AlertItem, 'id' | 'timestamp'>): AlertItem {
    const newAlert: AlertItem = {
      ...alert,
      id: `alert-${Date.now().toString(36)}`,
      timestamp: 'Just now',
    };
    this.alerts = [newAlert, ...this.alerts];
    return newAlert;
  }
}

export const alertService = new AlertService();
