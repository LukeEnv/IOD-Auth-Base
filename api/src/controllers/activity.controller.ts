import { NextFunction, Request, Response } from "express";
import { getDBUsers, updateDBUserSteps } from "../services/user.service";

import {
  addActivityToUser,
  deleteActivityFromUser,
  updateActivityInUser,
  getUserActivities,
} from "../services/activity.service";

import { Activity, User } from "@/types/user";

export const getUsers = (req: Request, res: Response) => {
  const users = getDBUsers();
  res.status(200).json(users);
};

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export const newActivity = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { name, date, duration, calories, distance } = req.body;

    if (!req.user) {
      res.status(400).json({ message: "User authentication is required." });
      return;
    }

    if (userId === null || userId === undefined) {
      res.status(400).json({ message: "User authentication is required." });
      return;
    }

    if (!name || !date || !duration || !calories || !distance) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const newActivity: Activity = {
      id: Date.now(),
      userid: userId,
      name,
      date,
      duration,
      calories,
      distance,
    };

    // Assuming you have a function to add the activity to the user's activities
    const updatedUser = await addActivityToUser(newActivity);

    res.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteActivity = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const activityId = parseInt(req.params.id);

    console.log("Activity ID:", activityId);

    if (!req.user) {
      res.status(400).json({ message: "User authentication is required." });
      return;
    }

    console.log("User ID:", userId);
    console.log(req.params?.id);

    if (activityId === null) {
      console.log("Activity ID is required.");
      res.status(400).json({ message: "Activity ID is required." });
      return;
    }

    console.log("Deleting activity with ID:", activityId);

    // Assuming you have a function to delete the activity from the user's activities
    const isDeleted = await deleteActivityFromUser(activityId);

    res.status(200).json({ success: isDeleted });
  } catch (error) {
    console.error("Error deleting activity:", error);
    next(error);
  }
};

export const updateActivity = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const activityId = parseInt(req.params.id, 10);
    const { name, date, duration, calories, distance } = req.body;

    if (!req.user) {
      res.status(400).json({ message: "User authentication is required." });
      return;
    }

    if (activityId === null) {
      res.status(400).json({ message: "Activity ID is required." });
      return;
    }

    if (userId === null || userId === undefined) {
      res.status(400).json({ message: "User authentication is required." });
      return;
    }

    if (!name || !date || !duration || !calories || !distance) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const updatedActivity: Activity = {
      id: activityId,
      userid: userId,
      name,
      date,
      duration,
      calories,
      distance,
    };

    // Assuming you have a function to update the activity in the user's activities
    const updatedUser = await updateActivityInUser(activityId, updatedActivity);

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const getActivities = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!req.user) {
      res.status(400).json({ message: "User authentication is required." });
      return;
    }

    if (userId === null || userId === undefined) {
      res.status(400).json({ message: "User authentication is required." });
      return;
    }

    const activities = await getUserActivities(userId);

    res.status(200).json(activities);
  } catch (error) {
    next(error);
  }
};
