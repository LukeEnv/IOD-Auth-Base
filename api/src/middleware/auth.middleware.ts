import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { findUserById } from "../services/user.service";
import { User } from "@/types/user";

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await verifyAccessToken(token);

    console.log(decoded);

    if (!decoded) {
      res.status(401).json({ message: "Unauthorized: Invalid token" });
      return;
    }

    const user = await findUserById(decoded.id);

    console.log(user);

    if (!user) {
      res.status(401).json({ message: "Unauthorized: User not found" });
      return;
    }

    req.user = user;
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
