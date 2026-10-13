import { INITIAL_INCIDENTS } from '@/data/demoIncidents';
import { Incident, IncidentSeverity, IncidentType } from '@/types/incident';

const STORAGE_KEY = 'mausamai_incidents_v1';

class IncidentService {
  private incidents: Incident[] = [];
  private listeners: Array<(incidents: Incident[]) => void> = [];

  constructor() {
    this.init();
  }

  private init() {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        this.incidents = JSON.parse(cached);
      } else {
        this.incidents = [...INITIAL_INCIDENTS];
        this.save();
      }
    } catch {
      this.incidents = [...INITIAL_INCIDENTS];
    }
  }

  private save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.incidents));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach((fn) => fn([...this.incidents]));
  }

  public subscribe(listener: (incidents: Incident[]) => void): () => void {
    this.listeners.push(listener);
    listener([...this.incidents]);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public getIncidents(): Incident[] {
    return [...this.incidents];
  }

  public getIncidentById(id: string): Incident | undefined {
    return this.incidents.find((inc) => inc.id === id);
  }

  public addIncident(newReport: {
    type: IncidentType;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    locationName: string;
    severity: IncidentSeverity;
    imageUrl?: string;
    aiClassification?: {
      label: string;
      confidence: number;
      model: string;
    };
  }): Incident {
    const created: Incident = {
      id: `inc-${Date.now().toString(36)}`,
      type: newReport.type,
      title: newReport.title,
      description: newReport.description,
      latitude: newReport.latitude,
      longitude: newReport.longitude,
      locationName: newReport.locationName,
      severity: newReport.severity,
      source: 'community',
      verificationStatus: 'under_review',
      reportedAt: 'Just now',
      updatedAt: 'Just now',
      imageUrl: newReport.imageUrl,
      signals: {
        weatherSignal: true,
        radarSignal: true,
        newsSignalCount: 0,
        communityConfirmations: 1,
        communityNotSeen: 0,
        aiClassification: newReport.aiClassification,
      },
      isUserReported: true,
    };

    this.incidents = [created, ...this.incidents];
    this.save();
    return created;
  }

  public confirmIncident(id: string): void {
    this.incidents = this.incidents.map((inc) => {
      if (inc.id === id) {
        const nextConfirmations = inc.signals.communityConfirmations + 1;
        let nextStatus = inc.verificationStatus;
        if (nextConfirmations >= 4 && nextStatus === 'under_review') {
          nextStatus = 'community_confirmed';
        }
        return {
          ...inc,
          signals: {
            ...inc.signals,
            communityConfirmations: nextConfirmations,
          },
          verificationStatus: nextStatus,
          updatedAt: 'Just now',
        };
      }
      return inc;
    });
    this.save();
  }

  public notSeenIncident(id: string): void {
    this.incidents = this.incidents.map((inc) => {
      if (inc.id === id) {
        return {
          ...inc,
          signals: {
            ...inc.signals,
            communityNotSeen: inc.signals.communityNotSeen + 1,
          },
          updatedAt: 'Just now',
        };
      }
      return inc;
    });
    this.save();
  }

  public markResolved(id: string): void {
    this.incidents = this.incidents.map((inc) => {
      if (inc.id === id) {
        return {
          ...inc,
          verificationStatus: 'resolved',
          updatedAt: 'Just now',
        };
      }
      return inc;
    });
    this.save();
  }

  // Demo Simulation Actions
  public simulateScenario(scenario: 'fallen_tree' | 'waterlogging' | 'heavy_rain' | 'storm' | 'resolve_baner'): void {
    if (scenario === 'fallen_tree') {
      const banerTree = this.incidents.find((i) => i.id === 'inc-001');
      if (banerTree) {
        banerTree.signals.communityConfirmations += 2;
        banerTree.verificationStatus = 'community_confirmed';
        banerTree.updatedAt = 'Just now';
      } else {
        this.incidents.unshift({
          id: 'inc-001',
          type: 'fallen_tree',
          title: 'Large Banyan Branch Blocking Baner Road',
          description: 'A large tree branch snapped following high wind gusts near Balewadi Phata, blocking two lanes towards Hinjawadi.',
          latitude: 18.5590,
          longitude: 73.7868,
          locationName: 'Baner Road near Balewadi Phata, Pune',
          distanceKm: 1.8,
          severity: 'high',
          source: 'community',
          verificationStatus: 'community_confirmed',
          reportedAt: 'Just now',
          updatedAt: 'Just now',
          imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
          signals: {
            weatherSignal: true,
            radarSignal: true,
            newsSignalCount: 2,
            communityConfirmations: 7,
            communityNotSeen: 0,
            officialSource: 'PMC Disaster Cell Alert',
            aiClassification: {
              label: 'Fallen Tree / Road Obstruction',
              confidence: 0.94,
              model: 'MausamAI-Vision-v1 (Demo AI)',
            },
          },
        });
      }
    } else if (scenario === 'waterlogging') {
      const subway = this.incidents.find((i) => i.id === 'inc-002');
      if (subway) {
        subway.severity = 'high';
        subway.signals.communityConfirmations += 3;
        subway.verificationStatus = 'corroborated';
        subway.updatedAt = 'Just now';
      }
    } else if (scenario === 'resolve_baner') {
      const banerTree = this.incidents.find((i) => i.id === 'inc-001');
      if (banerTree) {
        banerTree.verificationStatus = 'resolved';
        banerTree.updatedAt = 'Just now';
      }
    }
    this.save();
  }

  public resetToDefault(): void {
    this.incidents = [...INITIAL_INCIDENTS];
    this.save();
  }
}

export const incidentService = new IncidentService();
