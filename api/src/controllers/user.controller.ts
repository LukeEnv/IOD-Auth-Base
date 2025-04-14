import { NextFunction, Request, Response } from "express";
import {
  getDBUsers,
  createDBUser,
  findUserByUsername,
  updateDBUser,
  updateDBUserSteps,
  addActivityToUser,
  deleteActivityFromUser,
  updateActivityInUser,
} from "../services/user.service";

import bcrypt from "bcrypt";
import { Activity, User } from "@/types/user";

export const getUsers = (req: Request, res: Response) => {
  const users = getDBUsers();
  res.status(200).json(users);
};

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export const createUser = async (
  req: Request<{}, {}, { name: string; username: string; password: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createDBUser(name, username, hashedPassword);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const UpdateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { name, username, password } = req.body;

    if (!userId) {
      res.status(400).json({ message: "User authentication is required." });
      return;
    }

    if (!name && !username && !password) {
      res.status(400).json({ message: "At least one field is required." });
      return;
    }

    const user = await findUserByUsername(username);

    if (user) {
      res.status(409).json({ message: "Username already exists." });
      return;
    }

    const updatedUser = await updateDBUser({
      id: userId,
      name,
      username,
      password,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const updateSteps = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { steps } = req.body;

    if (!userId) {
      res.status(400).json({ message: "User authentication is required." });
      return;
    }

    if (steps === undefined) {
      res.status(400).json({ message: "Steps are required." });
      return;
    }

    const updatedUser = await updateDBUserSteps(userId, steps);

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

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

    if (!name || !date || !duration || !calories || !distance) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const newActivity: Activity = {
      id: Date.now(),
      name,
      date,
      duration,
      calories,
      distance,
    };

    // Assuming you have a function to add the activity to the user's activities
    const updatedUser = await addActivityToUser(userId, newActivity);

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
    const updatedUser = await deleteActivityFromUser(userId, activityId);

    res.status(200).json(updatedUser);
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

    if (!name || !date || !duration || !calories || !distance) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const updatedActivity: Activity = {
      id: activityId,
      name,
      date,
      duration,
      calories,
      distance,
    };

    // Assuming you have a function to update the activity in the user's activities
    const updatedUser = await updateActivityInUser(
      userId,
      activityId,
      updatedActivity
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
