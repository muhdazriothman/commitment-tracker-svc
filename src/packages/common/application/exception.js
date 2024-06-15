class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

class InvalidPayloadError extends AppError {
    constructor(message = 'Invalid payload provided') {
        super(message, 400);
    }
}

class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

class BusinessLogicError extends AppError {
    constructor(message = 'Business logic error') {
        super(message, 400);
    }
}

class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized') {
        super(message, 401);
    }
}

class InternalServerError extends AppError {
    constructor(message = 'Internal server error') {
        super(message, 500);
    }
}

module.exports = {
    AppError,
    InvalidPayloadError,
    NotFoundError,
    BusinessLogicError,
    UnauthorizedError,
    InternalServerError
};
