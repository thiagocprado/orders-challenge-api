import supertest from 'supertest';
import status from 'http-status';
import path from 'path';
import { FILE_TEMP_PATH_TEST } from '@/enums/index.js';

import mockDatabase from '../mocks/database.mock.js';
import mockOrderRepository from '../mocks/order.repository.mock.js';
import mockOrderProductRepository from '../mocks/order.product.repository.mock.js';
import mockUserRepository from '../mocks/user.repository.mock.js';
import {
  mockOrdersData,
  mockSingleOrder,
  writeMockEmptyFile,
  writeMockFile,
} from '../data/order.data.mock.js';
import { rm } from 'fs/promises';

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

describe('Orders Routes', () => {
  let request;
  let mockerOrderRepository;

  beforeAll(async () => {
    mockerOrderRepository = (await import('../../src/repositories/order.repository.js')).default();

    const { default: createApp } = await import('../../src/app.js');
    const app = await createApp();
    request = supertest(app);
  });

  afterAll(async () => {
    await rm(FILE_TEMP_PATH_TEST, { recursive: true, force: true });
  });

  describe('GET /orders', () => {
    it('GET /orders should return 200 with empty data when no orders found', async () => {
      mockerOrderRepository.getAllOrders.mockResolvedValue({ count: 0, data: [] });

      const response = await request.get('/api/v1/orders');

      expect(response.status).toBe(status.OK);
      expect(response.body.data).toEqual([]);
      expect(response.body.pagination.total).toBe(0);
    });

    it('GET /orders should return 200 with orders data', async () => {
      mockOrderRepository.getAllOrders.mockResolvedValue(mockOrdersData);
      const response = await request.get('/api/v1/orders');

      expect(response.status).toBe(status.OK);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.pagination.total).toBe(2);
      expect(response.body.data[0]).toHaveProperty('order_id', 1);
      expect(response.body.data[0]).toHaveProperty('total', '29.99');
      expect(response.body.data[0]).toHaveProperty('date', '2024-01-15');
      expect(response.body.data[0].products).toEqual([{ product_id: 456, value: '29.99' }]);
    });

    it('GET /orders should return 200 with custom pagination and sorting parameters', async () => {
      mockOrderRepository.getAllOrders.mockResolvedValue(mockOrdersData);
      const response = await request.get('/api/v1/orders').query({
        page: 2,
        pageSize: 5,
        orderBy: 'date',
        sort: 'DESC',
      });

      expect(response.status).toBe(status.OK);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.pagination.total).toBe(2);
      expect(response.body.pagination.page).toBe('2');
      expect(response.body.pagination.pageSize).toBe('5');
      expect(response.body.pagination.orderBy).toBe('date');
      expect(response.body.pagination.sort).toBe('DESC');
    });

    it('GET /orders should return 500 when database error occurs', async () => {
      const dbError = new Error('Database connection failed');
      mockOrderRepository.getAllOrders.mockRejectedValue(dbError);

      const response = await request.get('/api/v1/orders');

      expect(response.status).toBe(status.INTERNAL_SERVER_ERROR);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('code');
    });
  });

  describe('GET /orders/:id', () => {
    it('GET /orders/:id should return 200 with order data when order exists', async () => {
      mockOrderRepository.getOrderById.mockResolvedValue(mockSingleOrder);
      const response = await request.get('/api/v1/orders/1');

      expect(response.status).toBe(status.OK);
      expect(response.body.data).toHaveProperty('order_id', 1);
      expect(response.body.data).toHaveProperty('total', '29.99');
      expect(response.body.data).toHaveProperty('date', '2024-01-15');
      expect(response.body.data.products).toEqual([{ product_id: 456, value: '29.99' }]);
    });

    it('GET /orders/:id should return 400 when invalid order ID is provided', async () => {
      const response = await request.get('/api/v1/orders/invalid-id');

      expect(response.status).toBe(status.BAD_REQUEST);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('code');
    });

    it('GET /orders/:id should return 404 when order is not found', async () => {
      mockOrderRepository.getOrderById.mockResolvedValue({ found: false, data: null });
      const response = await request.get('/api/v1/orders/999');

      expect(response.status).toBe(status.NOT_FOUND);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('code');
    });

    it('GET /orders/:id should return 500 when database error occurs', async () => {
      const dbError = new Error('Database connection failed');
      mockOrderRepository.getOrderById.mockRejectedValue(dbError);

      const response = await request.get('/api/v1/orders/1');

      expect(response.status).toBe(status.INTERNAL_SERVER_ERROR);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('code');
    });
  });

  describe('POST /orders', () => {
    it('POST /orders should return 201 when uploading valid file', async () => {
      writeMockFile();

      const filePath = path.resolve(FILE_TEMP_PATH_TEST, 'file.txt');
      const response = await request.post('/api/v1/orders').attach('orders_data', filePath);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('message');
    });

    it('POST /orders should return 400 when uploading invalid file', async () => {
      writeMockEmptyFile();

      const filePath = path.resolve(FILE_TEMP_PATH_TEST, 'empty_file.txt');
      const response = await request.post('/api/v1/orders').attach('orders_data', filePath);

      expect(response.status).toBe(status.BAD_REQUEST);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('code');
      expect(response.body.code).toBe(status.BAD_REQUEST);
    });

    it('POST /orders should return 500 when database error occurs', async () => {
      writeMockFile();

      const dbError = new Error('Database connection failed');
      mockOrderRepository.findOrCreateOrder.mockRejectedValue(dbError);

      const filePath = path.resolve(FILE_TEMP_PATH_TEST, 'file.txt');
      const response = await request.post('/api/v1/orders').attach('orders_data', filePath);

      expect(response.status).toBe(status.INTERNAL_SERVER_ERROR);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('code');
    });
  });
});
