class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends ApiError {
  constructor(message = "Resource not found") {
    super(404, message);
  }
}

class ValidationError extends ApiError {
  constructor(message) {
    super(400, message);
  }
}

module.exports = {
  ApiError,
  NotFoundError,
  ValidationError,
};
