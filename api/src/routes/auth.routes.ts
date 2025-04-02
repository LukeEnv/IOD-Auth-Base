import { Router } from "express";
import { loginUser, refreshToken } from "../controllers/auth.controller";

const router = Router();

router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);

export default router;
