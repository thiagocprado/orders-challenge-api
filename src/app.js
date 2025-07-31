import { connectDB, sequelize } from "./configs/database.js";
import cors from "cors";
import express from "express";
import healthRoutes from "./routes/health.routes.js";
import "./models/index.js"; 

const createApp = async () => {
  const app = express();

  await connectDB();
  await sequelize.sync();

  app.use(cors());
  app.use(express.json());

  app.use("/health", healthRoutes);

  return app;
};

export default createApp;
