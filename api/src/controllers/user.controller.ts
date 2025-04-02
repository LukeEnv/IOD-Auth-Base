import { NextFunction, Request, Response } from "express";
import {
  getDBUsers,
  createDBUser,
  findUserByUsername,
} from "../services/user.service";

import bcrypt from "bcrypt";

export const getUsers = (req: Request, res: Response) => {
  const users = getDBUsers();
  res.status(200).json(users);
};

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
