'use strict';

const express = require('express');

const ErrorHandler = require('./packages/common/application/exception-handler')
const DbClient = require('./packages/common/infrastructure/mongo/client');
const UserRepository = require('./packages/user/infrastructure/repositories/user/repository');
const UserRoute = require('./interface/routes/user');

const CommitmentRepository = require('./packages/commitment/infrastructure/repositories/commitment/repository');
const CommitmentRoute = require('./interface/routes/commitment');

const Logger = require('./packages/common/application/logger');

const {
    NODE_ENV,
    PORT
} = require('./config/env');

class Server {
    /**
     * @param {Object} config
     * @param {string} config.connectionString
     * @param {string} config.database
     * @param {Logger} config.logger
     */
    constructor(config) {
        const {
            connectionString,
            database,
            logger
        } = config;

        this.app = express();
        this.dbClient = DbClient.create({
            connectionString: connectionString
        });
        this.database = database;
        this.logger = logger;
    }

    /**
     * Create a new instance of the Server class
     * @returns {Server}
     */
    static create() {
        const config = {
            connectionString: process.env.connectionString || 'mongodb://localhost:55000/commitment-tracker',
            database: process.env.database || 'users'
        };

        return new Server({
            connectionString: config.connectionString,
            logger: Logger.create(),
        });
    }

    /**
     * Starts the server
     * @returns {Promise<void>}
     */
    async start() {
        await this.dbClient.connect();

        const userRepository = UserRepository.create({
            dbClient: this.dbClient
        }, {
            database: this.database
        });

        const commitmentRepository = CommitmentRepository.create({
            dbClient: this.dbClient
        }, {
            database: this.database
        });

        const userRoute = UserRoute.create({
            userRepository: userRepository
        });

        const commitmentRoute = CommitmentRoute.create({
            commitmentRepository: commitmentRepository
        });

        this.app.use(express.json());

        userRoute.setupRoutes(this.app);
        commitmentRoute.setupRoutes(this.app);

        this.app.use(ErrorHandler.handle);

        this.app.listen(PORT, () => {
            this.logger.info(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
        });
    }
}

const server = Server.create();
server.start();
