class BadRequest extends Error {
  constructor(message, cause = null) {
    super(message);
    this.name = 'BadRequest';
    this.cause = cause;
  }
}

class NotFound extends Error {
  constructor(message, cause = null) {
    super(message);
    this.name = 'NotFound';
    this.cause = cause;
  }
}

class InternalServerError extends Error {
  constructor(message, cause = null) {
    super(message);
    this.name = 'InternalServerError';
    this.cause = cause;
  }
}

export { BadRequest, NotFound, InternalServerError };
