import { connectDB, sequelize } from './configs/database.js';
import cors from 'cors';
import errorHandlerMiddleware from './middlewares/error.handler.js';
import notFoundHandler from './middlewares/not.found.handler.js';
import express from 'express';
import healthRoutes from './routes/health.routes.js';
import routesV1 from './routes/v1/index.js';

import './models/index.js';

const createApp = async () => {
  const app = express();

  await connectDB();
  await sequelize.sync();

  app.use(cors());
  app.use(express.json());

  app.use('/health', healthRoutes);
  app.use('/api/v1', routesV1);

  app.use(notFoundHandler);
  app.use(errorHandlerMiddleware);

  return app;
};

export default createApp;
