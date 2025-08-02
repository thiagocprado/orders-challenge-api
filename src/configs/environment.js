import dotenv from 'dotenv';
dotenv.config();

const environment = {
  app: {
    port: Number(process.env.APP_PORT),
  },
  db: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    logging: process.env.DB_LOGGING,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
  },
};

export default environment;
