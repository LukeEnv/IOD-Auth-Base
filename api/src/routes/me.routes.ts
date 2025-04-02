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

const router = Router();

export interface AuthenticatedRequest extends Request {
  user?: User;
}

router.get(
  "/",
  requireAuth,
  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log(req.user);
    res.status(200).json(req.user);
  }
);

export default router;
