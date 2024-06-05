// src/server.js
const express = require('express');
const DbClient = require('./infrastructure/database/mongo/client');
const UserRepository = require('./domain/repositories/user');
const UserRoute = require('./interface/routes/user');

class Server {
    /**
     * @param {Object} config
     * @param {string} config.connectionString
     * @param {string} config.database
     */
    constructor(config) {
        const {
            connectionString,
            database
        } = config;

        this.app = express();
        this.dbClient = DbClient.create({
            connectionString: connectionString
        });
        this.database = database;
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
            connectionString: config.connectionString
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

        const userRoute = UserRoute.create({
            userRepository: userRepository
        });

        userRoute.setupRoutes(this.app);

        this.app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    }
}

const server = Server.create();
server.start();
