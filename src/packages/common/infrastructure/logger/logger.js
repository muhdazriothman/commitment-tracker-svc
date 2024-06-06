const winston = require('winston');
require('winston-daily-rotate-file');

class Logger {
    constructor() {
        const { combine, timestamp, printf, colorize } = winston.format;

        // Define your custom format
        const myFormat = printf(({ level, message, timestamp }) => {
            return `${timestamp} ${level}: ${message}`;
        });

        const transports = [];

        if (process.env.NODE_ENV === 'development') {
            // In development, log to console only
            transports.push(new winston.transports.Console({
                format: combine(
                    colorize(),
                    timestamp(),
                    myFormat
                )
            }));
        } else {
            // In other environments, log to file and daily rotate file
            transports.push(
                new winston.transports.Console({
                    format: combine(
                        colorize(),
                        timestamp(),
                        myFormat
                    )
                }),
                new winston.transports.File({ filename: 'combined.log' }),
                new winston.transports.DailyRotateFile({
                    filename: 'application-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    maxFiles: '14d' // Keep logs for 14 days
                })
            );
        }

        this.logger = winston.createLogger({
            level: 'info', // Log level (info, warn, error, etc.)
            format: combine(
                timestamp(),
                myFormat
            ),
            transports: transports
        });
    }

    /**
     * Create a new instance of the Logger class
     * @returns {Logger}
     */
    static create() {
        return new Logger();
    }

    /**
     * Log a message with the info level
     * @param {string} message
     * @returns {void}
     */
    info(message) {
        this.logger.info(message);
    }

    /**
     * Log a message with the warn level
     * @param {string} message
     * @returns {void}
     */
    warn(message) {
        this.logger.warn(message);
    }

    /**
     * Log a message with the error level
     * @param {string} message
     * @returns {void}
     */
    error(message) {
        this.logger.error(message);
    }
}

module.exports = Logger;
