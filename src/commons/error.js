class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequest";
  }
}

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFound";
  }
}

export { BadRequest, NotFound };
