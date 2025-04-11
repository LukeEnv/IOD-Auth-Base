import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import { loginUser, refreshToken } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { User } from "@/types/user";
import { findUserByUsername, updateDBUser } from "../services/user.service";

const router = Router();

export interface AuthenticatedRequest extends Request {
  user?: User;
}

router.get(
  "/",
  requireAuth,
  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    res.status(200).json(req.user);
  }
);

router.put(
  "/",
  requireAuth,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { name, username, password } = req.body;

      if (!req.user) {
        console.log("User not found");
        res.status(400).json({ message: "User authentication is required." });
        return;
      }

      if (!name && !username && !password) {
        res.status(400).json({ message: "At least one field is required." });
        return;
      }

      if (username && username !== req.user.username) {
        const existingUser = await findUserByUsername(username);
        if (existingUser) {
          res.status(409).json({ message: "Username already exists." });
          return;
        }
      }

      const updatedUser = await updateDBUser({
        id: req.user.id,
        name,
        username,
        password,
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
