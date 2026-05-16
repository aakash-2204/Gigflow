import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";

import {
  errorHandler,
  notFound,
} from "./middleware/errorMiddleware";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});