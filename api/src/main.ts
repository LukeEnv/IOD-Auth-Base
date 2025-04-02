import dotenv from "dotenv";
dotenv.config();

import express from "express";
import userRoutes from "./routes/user.routes";
import meRoutes from "./routes/me.routes";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

// Mount the user routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/me", meRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
