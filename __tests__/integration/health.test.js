import request from 'supertest';
import express from 'express';
import healthRoutes from '../../src/routes/health.routes.js';

describe('Health Check', () => {
  let app;

  beforeAll(async () => {
    app = express();
    app.use(express.json());
    app.use('/health', healthRoutes);
  });

  describe('GET /health', () => {
    it('should return health check status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'UP');
    });
  });
});
