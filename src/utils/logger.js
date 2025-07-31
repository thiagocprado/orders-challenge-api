import loggerConfig from "../configs/logger";

const logger = {
  debug: (message) => loggerConfig.debug(message),
  error: (message) => loggerConfig.error(message),
  info: (message) => loggerConfig.info(message),
  warn: (message) => loggerConfig.warn(message),
};

export default logger;
