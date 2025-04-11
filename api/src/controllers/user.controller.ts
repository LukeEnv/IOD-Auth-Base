import { NextFunction, Request, Response } from "express";
import {
  getDBUsers,
  createDBUser,
  findUserByUsername,
  updateDBUser,
} from "../services/user.service";

import bcrypt from "bcrypt";
import { User } from "@/types/user";

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
