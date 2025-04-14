import { Activity, User } from "@/types/user";

// temporary user storage

let users: User[] = [
  {
    id: 0,
    name: "John Doe",
    username: "luke",
    password: "$2b$10$JiwvGdgXJTZESTZJgVpImOsUFK17TCwWy/Q.HJsvnN3mlN3T6FC3K", // "Password"
    steps: 0,
    stepsGoal: 10000,
    activities: [
      {
        id: 0,
        name: "Running",
        date: "2023-10-01",
        duration: 30,
        calories: 300,
        distance: 5,
      },
      {
        id: 1,
        name: "Cycling",
        date: "2023-10-02",
        duration: 45,
        calories: 400,
        distance: 15,
      },
    ],
    activityGoal: 30,
  },
];
let userIndex = 1;
import bcrypt from "bcrypt";

// Function to get all users
export const getDBUsers = () => {
  return users;
};

// Function to create a new user
export const createDBUser = (
  name: string,
  username: string,
  password: string
) => {
  const newUser: User = { id: userIndex, name, username, password };
  userIndex++;
  users.push(newUser);
  console.log(`User created: ${username}`);
  return { id: newUser.id, name: newUser.name, username: newUser.username };
};

// Function to find a user by username
export const findUserByUsername = (username: string) => {
  return users.find((user) => user.username === username);
};

// Function to find a user by ID
export const findUserById = (id: number) => {
  return users.find((user) => user.id === id);
};

// Function to update a user
export const updateDBUser = ({
  id,
  name,
  username,
  password,
}: {
  id: number;
  name?: string;
  username?: string;
  password?: string;
}) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return null; // User not found
  }

  const updatedUser = { ...users[userIndex] };
  if (name) updatedUser.name = name;
  if (username) updatedUser.username = username;
  // Hash the password before storing it
  if (password) updatedUser.password = bcrypt.hashSync(password, 10);

  users[userIndex] = updatedUser;
  return updatedUser;
};

export const updateDBUserSteps = (id: number, steps: number) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return null; // User not found
  }

  const updatedUser = { ...users[userIndex] };
  updatedUser.steps = steps;

  users[userIndex] = updatedUser;
  return updatedUser;
};

export const addActivityToUser = (id: number, activity: Activity) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return null; // User not found
  }

  const updatedUser = { ...users[userIndex] };
  if (!updatedUser.activities) {
    updatedUser.activities = [];
  }
  updatedUser.activities.push(activity);

  users[userIndex] = updatedUser;
  return updatedUser;
};

export const deleteActivityFromUser = (userId: number, activityId: number) => {
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return null; // User not found
  }

  const updatedUser = { ...users[userIndex] };
  if (!updatedUser.activities) {
    return null; // No activities to delete
  }

  updatedUser.activities = updatedUser.activities.filter(
    (activity) => activity.id !== activityId
  );

  users[userIndex] = updatedUser;
  return updatedUser;
};

export const updateActivityInUser = (
  userId: number,
  activityId: number,
  updatedActivity: Activity
) => {
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return null; // User not found
  }

  const updatedUser = { ...users[userIndex] };
  if (!updatedUser.activities) {
    return null; // No activities to update
  }

  const activityIndex = updatedUser.activities.findIndex(
    (activity) => activity.id === activityId
  );
  if (activityIndex === -1) {
    return null; // Activity not found
  }

  updatedUser.activities[activityIndex] = updatedActivity;

  users[userIndex] = updatedUser;
  return updatedUser;
};
