import { jest } from '@jest/globals';
import supertest from 'supertest';
import status from 'http-status';

import mockDatabase from '../mocks/database.mock.js';
import mockOrderRepository from '../mocks/order.repository.mock.js';
import mockOrderProductRepository from '../mocks/order.product.repository.mock.js';
import mockUserRepository from '../mocks/user.repository.mock.js';
import { mockUsersData, mockSingleUser, mockEmptyUsersData } from '../data/user.data.mock.js';

jest.unstable_mockModule('src/configs/database.js', () => mockDatabase);
jest.unstable_mockModule('src/repositories/order.repository.js', () => ({
  default: () => mockOrderRepository,
}));
jest.unstable_mockModule('src/repositories/order.product.repository.js', () => ({
  default: () => mockOrderProductRepository,
}));
jest.unstable_mockModule('src/repositories/user.repository.js', () => ({
  default: () => mockUserRepository,
}));

describe('Users Routes', () => {
  let request;
  let mockerUserRepository;

  beforeAll(async () => {
    mockerUserRepository = (await import('../../src/repositories/user.repository.js')).default();

    const { default: createApp } = await import('../../src/app.js');
    const app = await createApp();
    request = supertest(app);
  });

  describe('GET /users/orders', () => {
    it('GET /users/orders should return 200 with empty data when no users found', async () => {
      mockerUserRepository.getAllUsersOrders.mockResolvedValue(mockEmptyUsersData);

      const response = await request.get('/api/v1/users/orders');

      expect(response.status).toBe(status.OK);
      expect(response.body.data).toEqual([]);
      expect(response.body.pagination.total).toBe(0);
    });

    it('GET /users/orders should return 200 with users data', async () => {
      mockUserRepository.getAllUsersOrders.mockResolvedValue(mockUsersData);
      const response = await request.get('/api/v1/users/orders');

      expect(response.status).toBe(status.OK);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.pagination.total).toBe(2);
      expect(response.body.data[0]).toHaveProperty('user_id', 123);
      expect(response.body.data[0]).toHaveProperty('name', 'João Silva');
      expect(response.body.data[0]).toHaveProperty('orders');
      expect(response.body.data[0].orders).toHaveLength(1);
      expect(response.body.data[0].orders[0]).toHaveProperty('order_id', 1);
      expect(response.body.data[0].orders[0]).toHaveProperty('total', '29.99');
      expect(response.body.data[0].orders[0]).toHaveProperty('date', '2024-01-15');
      expect(response.body.data[0].orders[0].products).toEqual([
        { product_id: 456, value: '29.99' },
      ]);
    });

    it('GET /users/orders should return 200 with custom pagination and sorting parameters', async () => {
      mockUserRepository.getAllUsersOrders.mockResolvedValue(mockUsersData);
      const response = await request.get('/api/v1/users/orders').query({
        page: 2,
        pageSize: 5,
        orderBy: 'createdAt',
        sort: 'DESC',
      });

      expect(response.status).toBe(status.OK);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.pagination.total).toBe(2);
      expect(response.body.pagination.page).toBe('2');
      expect(response.body.pagination.pageSize).toBe('5');
      expect(response.body.pagination.orderBy).toBe('createdAt');
      expect(response.body.pagination.sort).toBe('DESC');
    });

    it('GET /users/orders should return 500 when database error occurs', async () => {
      const dbError = new Error('Database connection failed');
      mockUserRepository.getAllUsersOrders.mockRejectedValue(dbError);

      const response = await request.get('/api/v1/users/orders');

      expect(response.status).toBe(status.INTERNAL_SERVER_ERROR);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('code');
    });
  });

  describe('GET /users/:id/orders', () => {
    it('GET /users/:id/orders should return 200 with user data when user exists', async () => {
      mockUserRepository.getUserOrdersById.mockResolvedValue(mockSingleUser);
      const response = await request.get('/api/v1/users/123/orders');

      expect(response.status).toBe(status.OK);
      expect(response.body.data).toHaveProperty('user_id', 123);
      expect(response.body.data).toHaveProperty('name', 'João Silva');
      expect(response.body.data).toHaveProperty('orders');
      expect(response.body.data.orders).toHaveLength(2);
      expect(response.body.data.orders[0]).toHaveProperty('order_id', 1);
      expect(response.body.data.orders[0]).toHaveProperty('total', '29.99');
      expect(response.body.data.orders[0]).toHaveProperty('date', '2024-01-15');
      expect(response.body.data.orders[0].products).toEqual([{ product_id: 456, value: '29.99' }]);
    });

    it('GET /users/:id/orders should return 400 when invalid user ID is provided', async () => {
      const response = await request.get('/api/v1/users/invalid-id/orders');

      expect(response.status).toBe(status.BAD_REQUEST);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('code');
    });

    it('GET /users/:id/orders should return 404 when user is not found', async () => {
      mockUserRepository.getUserOrdersById.mockResolvedValue({ found: false, data: null });
      const response = await request.get('/api/v1/users/999/orders');

      expect(response.status).toBe(status.NOT_FOUND);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('code');
    });

    it('GET /users/:id/orders should return 500 when database error occurs', async () => {
      const dbError = new Error('Database connection failed');
      mockUserRepository.getUserOrdersById.mockRejectedValue(dbError);

      const response = await request.get('/api/v1/users/123/orders');

      expect(response.status).toBe(status.INTERNAL_SERVER_ERROR);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('code');
    });
  });
});
