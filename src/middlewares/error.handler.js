import status from 'http-status';
import { BadRequest, NotFound, InternalServerError } from '../commons/error.js';
import logger from '../utils/logger.js';

const errorHandlerMiddleware = (error, _req, resp, _next) => {
  let code = status.INTERNAL_SERVER_ERROR;
  let message = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';

  if (error instanceof BadRequest) {
    code = status.BAD_REQUEST;
    message = error.message;
  } else if (error instanceof NotFound) {
    code = status.NOT_FOUND;
    message = error.message;
  } else if (error instanceof InternalServerError) {
    code = status.INTERNAL_SERVER_ERROR;
    message = error.message;
  }

  let stack;
  let errorMessage;
  if (error.cause?.stack) {
    errorMessage = error.cause.original.message;
    stack = error.cause.stack;
  } else {
    stack = error.stack;
    errorMessage = error.message;
  }

  logger.error({
    errorMessage,
    message,
    code,
    stack,
  });
  resp.status(code).json({ code, message });
};

export default errorHandlerMiddleware;
