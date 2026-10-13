import { UserProfileInfo, UserProfileType } from '@/types/user';

export const USER_PROFILES: Record<UserProfileType, UserProfileInfo> = {
  commuter: {
    id: 'commuter',
    title: 'Commuter / Daily Driver',
    subtitle: 'Roads, Waterlogging & Route Risks',
    iconName: 'Car',
    priorityTags: ['Road Incidents', 'Waterlogging Risk', 'Route Delays', 'Rainfall Warning'],
    description: 'Prioritizes route obstacles, waterlogged underpasses, road closures, and localized rainbursts during transit hours.',
    colorScheme: 'blue',
  },
  farmer: {
    id: 'farmer',
    title: 'Farmer / Agriculturist',
    subtitle: 'Rainfall, Soil Moisture & Field Alerts',
    iconName: 'Wheat',
    priorityTags: ['Rainfall Window', 'Wind Gusts', 'Irrigation Timing', 'Storm/Hail Risk'],
    description: 'Prioritizes precipitation timing, spraying suitability, soil moisture advisories, and severe thunderstorms to protect crops.',
    colorScheme: 'emerald',
  },
  fitness: {
    id: 'fitness',
    title: 'Fitness & Outdoor Enthusiast',
    subtitle: 'AQI, UV, Heat Index & Running Windows',
    iconName: 'Activity',
    priorityTags: ['AQI Safe Hours', 'UV Radiation Index', 'Heat Stress', 'Outdoor Jogging Score'],
    description: 'Calculates optimal hours for jogging, cycling, and outdoor activities with real-time pollution and heat stress ratings.',
    colorScheme: 'teal',
  },
  student_parent: {
    id: 'student_parent',
    title: 'Parent & Student',
    subtitle: 'School Transit, Air Quality & Storms',
    iconName: 'GraduationCap',
    priorityTags: ['School Route Safety', 'Morning AQI', 'Heavy Downpour', 'Pedestrian Walkway Risk'],
    description: 'Focuses on child commute safety, morning drop-off rain alerts, respiratory air quality cautions, and sudden school closures.',
    colorScheme: 'amber',
  },
  traveler: {
    id: 'traveler',
    title: 'Highway & Intercity Traveler',
    subtitle: 'Ghat Sections, Landslides & Long Range',
    iconName: 'Compass',
    priorityTags: ['Ghat Road Landslide', 'Highway Visibility', 'En-Route Thunderstorms', 'Fuel/Rest Advisories'],
    description: 'Provides long-distance route weather projections, expressway blockages, fog/mist warnings, and mountain pass conditions.',
    colorScheme: 'purple',
  },
};
