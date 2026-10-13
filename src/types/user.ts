export type UserProfileType =
  | 'farmer'
  | 'fitness'
  | 'commuter'
  | 'student_parent'
  | 'traveler';

export interface UserProfileInfo {
  id: UserProfileType;
  title: string;
  subtitle: string;
  iconName: string;
  priorityTags: string[];
  description: string;
  colorScheme: string;
}
