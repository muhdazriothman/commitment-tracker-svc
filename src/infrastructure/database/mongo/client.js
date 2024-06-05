const { MongoClient } = require('mongodb');

class DbClient {
    /**
     * @param {Object} config
     * @param {string} config.connectionString
     * @returns {MongoClient}
     */
    static create(config) {
        const {
            connectionString
        } = config;

        return new MongoClient(connectionString);
    }
}

module.exports = DbClient;
