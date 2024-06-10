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

        return new UserRepository({
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
            // userId : commitment.userId,
            type: commitment.type,
            title: commitment.title,
            description: commitment.description,
            provider: commitment.provider,
            category: commitment.category,
            amount: commitment.amount,
            frequency: commitment.frequency,
            firstPaymentDate: commitment.firstPaymentDate,
            lastPaymentDate: commitment.lastPaymentDate,
            nextPaymentDate: commitment.nextPaymentDate,
            lastPaymentAmount: commitment.lastPaymentAmount,
            notes: commitment.notes,
            reminder: commitment.reminder,
            isCompleted: commitment.isCompleted,
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
        return new Commitment({
            id: document._id.toString(),
            // userId : commitment.userId,
            type: document.type,
            title: document.title,
            description: document.description,
            provider: document.provider,
            category: document.category,
            amount: document.amount,
            frequency: document.frequency,
            firstPaymentDate: document.firstPaymentDate,
            lastPaymentDate: document.lastPaymentDate,
            nextPaymentDate: document.nextPaymentDate,
            lastPaymentAmount: document.lastPaymentAmount,
            notes: document.notes,
            reminder: document.reminder,
            isCompleted: document.isCompleted,
            createdAt: document.createdAt,
            updatedAt: document.updatedAt
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
