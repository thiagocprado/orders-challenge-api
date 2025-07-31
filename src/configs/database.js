import { Sequelize } from "sequelize";
import environment from "./environment";

const { database, user, password, host, port } = environment;
const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: "postgres",
  port: port,
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("database connection established successfully.");
  } catch (error) {
    console.error("unable to connect to the database:", error);
    process.exit(1);
  }
};

const closeDB = async () => {
  try {
    await sequelize.close();
    console.log("database connection closed successfully.");
  } catch (error) {
    console.error("error closing the database connection:", error);
  }
};

export { connectDB, closeDB, sequelize };
