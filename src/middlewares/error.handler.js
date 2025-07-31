import status from "http-status";
import { BadRequest, NotFound } from "../commons/error.js";
import logger from "../utils/logger.js";

const errorHandlerMiddleware = (error, _req, resp, _next) => {
  let code = status.INTERNAL_SERVER_ERROR;
  let message = "Erro interno no servidor!";

  if (error instanceof BadRequest) {
    code = status.BAD_REQUEST;
    message = error.message;
  } else if (error instanceof NotFound) {
    code = status.NOT_FOUND;
    message = error.message;
  } else {
    message = error.message || message;
  }

  logger.error(`message: ${message}, code: ${code}, stack: ${error.stack}`);
  resp.status(code).json({ code, message });
};

export default errorHandlerMiddleware;
