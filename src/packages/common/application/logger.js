'use strict';

const {
    createLogger,
    transports,
    format
} = require('winston');

const {
    combine,
    colorize,
    timestamp,
} = format;


class Logger {
    constructor() {
        this.logger = createLogger({
            level: 'info',
            format: format.json(),
            transports: [],
        });

        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new transports.Console({
                format: combine(
                    colorize(),
                    timestamp(),
                    format.simple()
                )
            }));
        }
    }

    static create() {
        return new Logger();
    }

    error(message, error) {
        this.logger.error(message, error);
    }

    info(message) {
        this.logger.info(message);
    }
}

module.exports = Logger;
