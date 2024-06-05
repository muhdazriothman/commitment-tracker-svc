const {
    Collection,
    ObjectId,
    MongoClient
} = require('mongodb');

class UserRepository {
    /**
     * @param {Object} dependencies
     * @param {Collection} dependencies.collection
     */
    constructor(dependencies) {
        const {
            collection
        } = dependencies;

        this.collection = collection;
    }

    /**
     * Create a new instance of the UserRepository class
     * @param {Object} dependencies
     * @param {MongoClient} dependencies.dbClient
     * @param {Object} config
     * @param {string} config.database
     * @returns {UserRepository}
     */
    static create(dependencies, config) {
        const {
            dbClient
        } = dependencies;

        const {
            database
        } = config;

        return new UserRepository({
            collection: dbClient.db(database).collection(UserRepository.collectionName())
        });
    }

    /**
     * Get collection name
     * @returns {string}
     */
    static collectionName() {
        return 'users';
    }

    /**
     * Find user by id
     * @param {string} id
     * @returns {Promise<Object>}
     */
    async findUserById(id) {
        const result = await this.collection.findOne({ _id: ObjectId.createFromHexString(id) });

        // map to domain object

        return result;
    }

    // Add other repository methods here
}

module.exports = UserRepository;
