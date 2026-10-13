import { Incident } from '@/types/incident';
import { NewsSignal } from '@/types/news';
import { assessIncidentTrust, ConfidenceAssessment } from '@/utils/confidence';

class VerificationService {
  public evaluateIncident(incident: Incident): ConfidenceAssessment {
    return assessIncidentTrust(incident);
  }

  public correlateNewsWithIncidents(news: NewsSignal[], incidents: Incident[]): Array<{
    newsItem: NewsSignal;
    correlatedIncident?: Incident;
  }> {
    return news.map((item) => {
      const match = incidents.find((inc) => {
        if (!item.relatedIncidentType) return false;
        return inc.type === item.relatedIncidentType;
      });
      return {
        newsItem: item,
        correlatedIncident: match,
      };
    });
  }
}

export const verificationService = new VerificationService();
