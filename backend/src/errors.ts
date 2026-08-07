export class AppError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message: string) {
    super(message, 422);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message = "Too many requests. Please try again shortly.") {
    super(message, 429);
  }
}

export class BadGatewayError extends AppError {
  constructor(message = "Upstream service failed.") {
    super(message, 502);
  }
}
