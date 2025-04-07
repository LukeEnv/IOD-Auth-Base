import { Router } from "express";
import {
  loginUser,
  refreshToken,
  logoutUser,
} from "../controllers/auth.controller";

const router = Router();

router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.post("/refresh-token/logout", logoutUser);

export default router;
