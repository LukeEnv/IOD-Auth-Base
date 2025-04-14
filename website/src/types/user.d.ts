export type Activity = {
  id: number;
  name: string;
  date: string;
  duration: number;
  calories: number;
  distance: number;
};

export type User = {
  id: string;
  name: string;
  username: string;
  password?: string;
  steps?: number;
  stepsGoal?: number;
  activityGoal?: number;
  activities?: Activity[];
};
