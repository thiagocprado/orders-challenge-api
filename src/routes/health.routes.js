import { Router } from 'express';
import { ping } from '../configs/database.js';
import logger from '../utils/logger.js';

const healthRoutes = Router();

healthRoutes.get('/', async (_req, res) => {
  const date = new Date();
  const formatted = date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  try {
    await ping();
    res.json({ status: 'UP', database: 'UP', timestamp: formatted });
  } catch (error) {
    logger.error(`Health check failed: ${error.message}`);
    res.status(500).json({ status: 'DOWN', database: 'DOWN', timestamp: formatted });
  }
});

export default healthRoutes;
