import { jest } from '@jest/globals';

process.env.NODE_ENV = 'test';

process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '5432';
process.env.DB_USER = 'test_user';
process.env.DB_PASSWORD = 'test_password';
process.env.DB_NAME = 'test_db';

global.jest = jest;

global.console = {
  ...console,
};
