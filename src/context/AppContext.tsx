import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_LOCATION } from '@/data/demoWeather';
import { aiService } from '@/services/aiService';
import { alertService } from '@/services/alertService';
import { incidentService } from '@/services/incidentService';
import { newsService } from '@/services/newsService';
import { routeService } from '@/services/routeService';
import { weatherService } from '@/services/weatherService';
import { AlertItem } from '@/types/alert';
import { Incident, IncidentSeverity, IncidentType } from '@/types/incident';
import { NewsSignal } from '@/types/news';
import { RouteAheadAlert, RouteOption } from '@/types/route';
import { UserProfileType } from '@/types/user';
import { DailyForecastItem, HourlyForecastItem, LocationData, WeatherCondition } from '@/types/weather';

export interface FeedEvent {
  id: string;
  time: string;
  title: string;
  type: 'confirm' | 'weather' | 'news' | 'report' | 'resolve';
}

interface AppContextType {
  profile: UserProfileType;
  setProfile: (p: UserProfileType) => void;
  location: LocationData;
  setLocation: (loc: LocationData) => void;
  weather: WeatherCondition | null;
  hourlyForecast: HourlyForecastItem[];
  dailyForecast: DailyForecastItem[];
  incidents: Incident[];
  news: NewsSignal[];
  alerts: AlertItem[];
  routes: RouteOption[];
  selectedRoute: RouteOption;
  setSelectedRoute: (r: RouteOption) => void;
  incidentAheadAlert: RouteAheadAlert | null;
  liveFeed: FeedEvent[];
  demoModeActive: boolean;
  setDemoModeActive: (v: boolean) => void;
  reportIncident: (data: {
    type: IncidentType;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    locationName: string;
    severity: IncidentSeverity;
    imageUrl?: string;
  }) => Incident;
  confirmIncident: (id: string) => void;
  notSeenIncident: (id: string) => void;
  markResolved: (id: string) => void;
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  toggleTheme: () => void;
  triggerDemoScenario: (scenario: 'heavy_rain' | 'fallen_tree' | 'waterlogging' | 'storm' | 'news_signal' | 'community_confirm' | 'resolve_incident') => void;
  resetDemo: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfileType>('commuter');
  const [location, setLocationState] = useState<LocationData>(DEFAULT_LOCATION);
  const [weather, setWeather] = useState<WeatherCondition | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastItem[]>([]);
  const [dailyForecast, setDailyForecast] = useState<DailyForecastItem[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [news, setNews] = useState<NewsSignal[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<RouteOption>(routeService.getAvailableRoutes()[0]);
  const [incidentAheadAlert, setIncidentAheadAlert] = useState<RouteAheadAlert | null>(null);
  const [demoModeActive, setDemoModeActive] = useState<boolean>(true);
  const [theme, setThemeState] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('mausam_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('mausam_theme', theme);
  }, [theme]);

  const setTheme = (t: 'dark' | 'light') => {
    setThemeState(t);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [liveFeed, setLiveFeed] = useState<FeedEvent[]>([
    { id: 'f1', time: '11:42 AM', title: 'Baner Road tree obstacle confirmed by 6th citizen report', type: 'confirm' },
    { id: 'f2', time: '11:38 AM', title: 'Convective storm cell detected over Shivaji Nagar (14mm/hr)', type: 'weather' },
    { id: 'f3', time: '11:31 AM', title: 'New citizen report submitted: Shivajinagar subway water build-up', type: 'report' },
    { id: 'f4', time: '11:27 AM', title: 'Sakal Media published: Traffic slowdown alert for Pune West', type: 'news' },
    { id: 'f5', time: '11:20 AM', title: 'Road hazard flagged on Pune-Bengaluru Bypass near Chandani Chowk', type: 'report' },
  ]);

  // Load weather and incidents
  useEffect(() => {
    weatherService.getCurrentWeather(location).then(setWeather);
    weatherService.getHourlyForecast().then(setHourlyForecast);
    weatherService.getDailyForecast().then(setDailyForecast);

    const unsubscribe = incidentService.subscribe((updatedIncidents) => {
      setIncidents(updatedIncidents);
      setIncidentAheadAlert(routeService.getIncidentAheadAlert(updatedIncidents));
    });

    setNews(newsService.getNewsSignals());
    setAlerts(alertService.getAlerts(profile));
    setRoutes(routeService.getAvailableRoutes());

    return () => unsubscribe();
  }, [location, profile]);

  const setLocation = (loc: LocationData) => {
    setLocationState(loc);
    weatherService.getCurrentWeather(loc).then(setWeather);
  };

  const addFeedItem = (title: string, type: FeedEvent['type']) => {
    const newItem: FeedEvent = {
      id: `f-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title,
      type,
    };
    setLiveFeed((prev) => [newItem, ...prev.slice(0, 9)]);
  };

  const reportIncident = (data: {
    type: IncidentType;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    locationName: string;
    severity: IncidentSeverity;
    imageUrl?: string;
  }) => {
    let aiClassification;
    if (data.imageUrl) {
      aiClassification = aiService.classifyImage(data.title, data.type);
    }
    const created = incidentService.addIncident({
      ...data,
      aiClassification,
    });
    addFeedItem(`New citizen report: ${data.title}`, 'report');
    return created;
  };

  const confirmIncident = (id: string) => {
    incidentService.confirmIncident(id);
    const inc = incidents.find((i) => i.id === id);
    addFeedItem(`Citizen confirmation registered for: ${inc?.title || 'Incident'}`, 'confirm');
  };

  const notSeenIncident = (id: string) => {
    incidentService.notSeenIncident(id);
    const inc = incidents.find((i) => i.id === id);
    addFeedItem(`User indicated obstacle cleared/not seen for: ${inc?.title || 'Incident'}`, 'resolve');
  };

  const markResolved = (id: string) => {
    incidentService.markResolved(id);
    const inc = incidents.find((i) => i.id === id);
    addFeedItem(`Hazard officially marked RESOLVED: ${inc?.title || 'Incident'}`, 'resolve');
  };

  // Demo Simulation Scenarios
  const triggerDemoScenario = (scenario: 'heavy_rain' | 'fallen_tree' | 'waterlogging' | 'storm' | 'news_signal' | 'community_confirm' | 'resolve_incident') => {
    if (scenario === 'heavy_rain') {
      if (weather) {
        setWeather({
          ...weather,
          condition: 'Heavy Convective Downpour',
          rainProbability: 95,
          rainfallMm: 28.4,
          windSpeed: 32,
        });
      }
      alertService.addAlert({
        title: 'SIMULATED: Flash Rain & Gust Alert',
        message: 'Intense precipitation cell overhead. Urban storm drains near peak intake.',
        category: 'Weather',
        severity: 'High Risk',
        relevantProfiles: ['commuter', 'farmer', 'student_parent', 'fitness', 'traveler'],
      });
      setAlerts(alertService.getAlerts(profile));
      addFeedItem('Simulated intense precipitation detected on Doppler radar (28mm/h)', 'weather');
    } else if (scenario === 'fallen_tree') {
      incidentService.simulateScenario('fallen_tree');
      addFeedItem('Simulated incident triggered: Large Tree obstruction on Baner Road', 'report');
    } else if (scenario === 'waterlogging') {
      incidentService.simulateScenario('waterlogging');
      addFeedItem('Simulated surge: Subway water levels rising at Shivajinagar', 'weather');
    } else if (scenario === 'news_signal') {
      const added = newsService.addSimulatedNews(
        'Flash Alert: Civic teams clearing Baner road bottleneck; traffic rerouted to Pashan',
        'Maharashtra Times',
        'Pune West'
      );
      setNews(newsService.getNewsSignals());
      addFeedItem(`News wire signal received: ${added.headline}`, 'news');
    } else if (scenario === 'community_confirm') {
      const baner = incidents.find((i) => i.id === 'inc-001');
      if (baner) {
        incidentService.confirmIncident(baner.id);
        addFeedItem('Live community confirmation vote registered (+1)', 'confirm');
      }
    } else if (scenario === 'resolve_incident') {
      incidentService.simulateScenario('resolve_baner');
      addFeedItem('Incident on Baner Road marked RESOLVED by disaster management team', 'resolve');
    }
  };

  const resetDemo = () => {
    incidentService.resetToDefault();
    weatherService.getCurrentWeather(location).then(setWeather);
    setNews(newsService.getNewsSignals());
    setAlerts(alertService.getAlerts(profile));
    addFeedItem('Demo simulation environment reset to baseline parameters', 'resolve');
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        location,
        setLocation,
        weather,
        hourlyForecast,
        dailyForecast,
        incidents,
        news,
        alerts,
        routes,
        selectedRoute,
        setSelectedRoute,
        incidentAheadAlert,
        liveFeed,
        demoModeActive,
        setDemoModeActive,
        theme,
        setTheme,
        toggleTheme,
        reportIncident,
        confirmIncident,
        notSeenIncident,
        markResolved,
        triggerDemoScenario,
        resetDemo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
