import { Router, Request } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { User } from "@/types/user";
import {
  newActivity,
  deleteActivity,
  updateActivity,
  getActivities,
} from "../controllers/activity.controller";

const router = Router();

export interface AuthenticatedRequest extends Request {
  user?: User;
}

router.post("/", requireAuth, newActivity);
router.delete("/:id", requireAuth, deleteActivity);
router.put("/:id", requireAuth, updateActivity);
router.get("/", requireAuth, getActivities);

export default router;
