import dotenv from 'dotenv';
dotenv.config();

const environment = {
  app: {
    env: process.env.NODE_ENV || 'dev',
    logLevel: process.env.LOG_LEVEL || 'debug',
    port: process.env.APP_PORT ? Number(process.env.APP_PORT) : 3000,
  },
  db: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    logging: process.env.DB_LOGGING,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    user: process.env.DB_USER,
  },
};

export default environment;
