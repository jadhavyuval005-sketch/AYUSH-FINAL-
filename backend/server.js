import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "AYUSH portal API is running." });
});

app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`AYUSH portal API listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

startServer();