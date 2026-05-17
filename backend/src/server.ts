import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gigflow-7cfc.vercel.app",
    ],
    credentials: true,
  })
);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gigflow-7cfc.vercel.app",
      "https://gigflow-jx774rghw-aakash-2204s-projects.vercel.app",
      "https://gigflow-6d4vzw81r-aakash-2204s-projects.vercel.app"
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});