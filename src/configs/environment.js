import dotenv from "dotenv";
dotenv.config();

const environment = {
  app: {
    port: process.env.APP_PORT,
  },
  db: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
};

export default environment;
