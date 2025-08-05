import supertest from 'supertest';
import status from 'http-status';
import mockDatabase from '../mocks/database.mock.js';

jest.unstable_mockModule('src/configs/database.js', () => mockDatabase);

describe('Health Check', () => {
  let request;

  beforeAll(async () => {
    const { default: createApp } = await import('../../src/app.js');
    const app = await createApp();
    request = supertest(app);
  });

  describe('GET /health', () => {
    it('should return health check status', async () => {
      const response = await request.get('/health');

      expect(response.status).toBe(status.OK);
      expect(response.body).toHaveProperty('status', 'UP');
      expect(response.body).toHaveProperty('database', 'UP');
      expect(response.body).toHaveProperty('timestamp');
    });
  });
});
