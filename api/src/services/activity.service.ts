import { Activity } from "../types/activity";

let activities: Activity[] = [];

export const getUserActivities = (userid: number) => {
  console.log("Fetching activities for user ID:", userid);
  const userActivities = activities.filter(
    (activity) => activity.userid === userid
  );
  return userActivities;
};

export const addActivityToUser = (activity: Activity) => {
  console.log("Adding activity:", activity);
  activities.push(activity);

  return activity;
};

export const deleteActivityFromUser = (activityId: number) => {
  activities = activities.filter((activity) => activity.id !== activityId);

  return true;
};

export const updateActivityInUser = (
  activityId: number,
  updatedActivity: Activity
) => {
  const activityIndex = activities.findIndex(
    (activity) => activity.id === activityId
  );

  if (activityIndex === -1) {
    return null; // Activity not found
  }

  activities[activityIndex] = updatedActivity;

  return activities[activityIndex];
};
