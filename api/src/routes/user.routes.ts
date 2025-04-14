import { Router } from "express";
import {
  getUsers,
  createUser,
  updateSteps,
  newActivity,
  deleteActivity,
  updateActivity,
} from "../controllers/user.controller";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.put("/activity/steps", updateSteps);
router.post("/activity/", newActivity);
router.delete("/activity/:id", deleteActivity);
router.put("/activity/:id", updateActivity);

export default router;
