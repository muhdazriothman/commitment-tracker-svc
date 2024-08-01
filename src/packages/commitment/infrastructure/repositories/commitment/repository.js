'use strict';

const {
    Collection,
    ObjectId,
    MongoClient
} = require('mongodb');

const Commitment = require('../../../domain/entities/commitment');

class CommitmentRepository {
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

        return new CommitmentRepository({
            collection: dbClient.db(database).collection(CommitmentRepository.collectionName())

        });
    }

    /**
     * Get collection name
     * @returns {string}
     */
    static collectionName() {
        return 'commitment';
    }

    /**
     * Create a commitment from entity
     * @param {Commitment} commitment
     * @returns {import('./schema').CommitmentDO}
     */
    static toDO(commitment) {
        return {
            _id: ObjectId.createFromTime(Date.now()),
            // TODO: Enable userId when authentication is implemented
            // userId : commitment.userId,
            type: commitment.type,
            name: commitment.name,
            description: commitment.description,
            provider: commitment.provider,
            category: commitment.category,
            amount: commitment.amount,
            amountPaid: commitment.amountPaid,
            duration: commitment.duration,
            frequency: commitment.frequency,
            startDate: commitment.startDate,
            endDate: commitment.endDate,
            notes: commitment.notes,
            status: commitment.status,
            createdAt: commitment.createdAt,
            updatedAt: commitment.updatedAt,
            deleted: false,
            deletedAt: null
        };
    }

    /**
     * Create a commitment from domain object
     * @param {import('./schema').CommitmentDO} document
     * @returns {Commitment}
     */
    static toDomain(document) {
        return Commitment.create({
            id: document._id.toString(),
            // TODO: Enable userId when authentication is implemented
            // userId : commitment.userId,
            type: document.type,
            name: document.name,
            description: document.description,
            provider: document.provider,
            category: document.category,
            amount: document.amount,
            amountPaid: document.amountPaid,
            duration: document.duration,
            frequency: document.frequency,
            startDate: document.startDate,
            endDate: document.endDate,
            notes: document.notes,
            status: document.status,
            createdAt: document.createdAt,
            updatedAt: document.updatedAt,
            deleted: document.deleted,
            deletedAt: document.deletedAt
        });
    }

    /**
     * Create a commitment
     * @param {Commitment} entity
     * @returns {Promise<Commitment>}
     */
    async create(entity) {
        const commitmentDO = CommitmentRepository.toDO(entity);

        try {
            const result = await this.collection.insertOne(commitmentDO, {
                ignoreUndefined: true
            });

            if (!result.acknowledged) {
                throw new Error('Failed to create commitment');
            }

            return CommitmentRepository.toDomain(commitmentDO);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = CommitmentRepository;
