'use strict';

class ExceptionHandler {
    static handle(err, req, res, next) {
        err.statusCode = err.statusCode || 500;
        err.status = err.status || 'error';

        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    static create() {
        return new ExceptionHandler();
    }
}

module.exports = ExceptionHandler;