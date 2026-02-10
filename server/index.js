import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.router.js";
import mediaRoute from "./routes/media.router.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
console.log("Loaded SECRET_KEY:", `"${process.env.SECRET_KEY}"`); // Debug line
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

app.get("/home", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Hello, I am coming from the backend",
  });
});
// Serve frontend (after API routes)
app.use(express.static(path.join(__dirname, "../client/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/client/dist/index.html"));
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});