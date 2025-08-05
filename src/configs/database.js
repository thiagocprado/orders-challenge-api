import { Sequelize } from 'sequelize';
import environment from './environment.js';
import logger from '../utils/logger.js';

const { dialect, host, logging, name, password, port, user } = environment.db;
const sequelize = new Sequelize(name, user, password, {
  dialect,
  host,
  logging: logging === 'true' ? true : false,
  port,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('database connection established successfully.');
  } catch (error) {
    logger.error(`unable to connect to the database: ${error}`);
    process.exit(1);
  }
};

const closeDB = async () => {
  try {
    await sequelize.close();
    logger.info('database connection closed successfully.');
  } catch (error) {
    logger.error(`error closing the database connection: ${error}`);
  }
};

const ping = async () => {
  try {
    await sequelize.authenticate();
    logger.info('database connection is alive.');
  } catch (error) {
    logger.error(`error pinging the database: ${error}`);
    throw error;
  }
};

export { connectDB, closeDB, ping, sequelize };
