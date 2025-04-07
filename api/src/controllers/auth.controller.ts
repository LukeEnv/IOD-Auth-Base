import { NextFunction, Request, Response } from "express";
import {
  getDBUsers,
  createDBUser,
  findUserByUsername,
  findUserById,
} from "../services/user.service";

import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  TokenPayload,
  verifyRefreshToken,
} from "../utils/jwt";
import { removeRefreshToken } from "../services/auth.service";

export const loginUser = async (
  req: Request<{}, {}, { username: string; password: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const user = await findUserByUsername(username);

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }

    const userPayload: TokenPayload = {
      id: user.id,
      username: user.username,
    };

    const accessToken = generateAccessToken(userPayload);
    const refreshToken = generateRefreshToken(userPayload);

    res.cookie("rft", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth/refresh-token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ message: "Login successful.", accessToken });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const refreshToken = req.cookies.rft;

    console.log(req.cookies);

    if (!refreshToken) {
      res.status(401).json({ message: "Refresh token not provided." });
      return;
    }

    const decoded = verifyRefreshToken(refreshToken) as TokenPayload;

    if (!decoded) {
      console.log("Invalid refresh token.");
      res.status(403).json({ message: "Invalid refresh token." });
      return;
    }

    const user = findUserById(decoded.id);

    if (!user) {
      res.status(403).json({ message: "User not found." });
      return;
    } else {
      const newAccessToken = generateAccessToken({
        id: user.id,
        username: user.username,
      });

      res.status(200).json({
        accessToken: newAccessToken,
      });
      return;
    }
  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token." });
    return;
  }
};

export const logoutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("Logout user");
  try {
    const refreshToken = req.cookies.rft;

    console.log("Refresh token:", refreshToken);
    if (!refreshToken) {
      res.status(401).json({ message: "No refresh token provided." });
      return;
    }
    const decoded = verifyRefreshToken(refreshToken) as TokenPayload;
    if (!decoded) {
      res.status(403).json({ message: "Invalid refresh token." });
      return;
    }

    if (decoded.token) {
      removeRefreshToken(decoded.token);
    } else {
      res.status(400).json({ message: "Invalid token provided." });
      return;
    }

    res.clearCookie("rft", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/api/auth/refresh-token",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Logout failed." });
  }
};
