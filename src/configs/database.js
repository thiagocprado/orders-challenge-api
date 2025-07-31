import { Sequelize } from "sequelize";
import environment from "./environment.js";
import logger from "../utils/logger.js";

const { database, user, password, host, port } = environment.db;
const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: "postgres",
  port: port,
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info("database connection established successfully.");
  } catch (error) {
    logger.error(`unable to connect to the database: ${error}`);
    process.exit(1);
  }
};

const closeDB = async () => {
  try {
    await sequelize.close();
    logger.info("database connection closed successfully.");
  } catch (error) {
    logger.error(`error closing the database connection: ${error}`);
  }
};

export { connectDB, closeDB, sequelize };
