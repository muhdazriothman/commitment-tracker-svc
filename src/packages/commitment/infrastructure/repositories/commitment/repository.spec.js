'use strict';

const { MongoClient } = require('mongodb');
const CommitmentRepository = require('./repository');
const Commitment = require('../../../domain/entities/commitment');

describe('src/packages/commitment/infrastructure/repositories/commitment/repository.spec.js', () => {
    let client;
    let db;

    /** @type {CommitmentRepository} */
    let repository;

    before(async () => {
        const connectionString = 'mongodb://localhost:55001';
        client = await MongoClient.connect(connectionString);
        db = client.db('testdb');  // Use any test database name

        repository = new CommitmentRepository({
            collection: db.collection(CommitmentRepository.collectionName())
        });
    });

    after(async () => {
        await client.close();
    });

    afterEach(async () => {
        await repository.collection.deleteMany({});
    });

    it('should create a new commitment', async () => {
        const commitment = new Commitment({
            type: 'loan',
            title: 'Car Loan',
            description: 'Monthly car loan payment',
            provider: 'Bank',
            category: 'Vehicle',
            amount: 300.00,
            frequency: 'monthly',
            firstPaymentDate: new Date('2022-01-01'),
            lastPaymentDate: null,
            nextPaymentDate: new Date('2022-02-01'),
            lastPaymentAmount: 300.00,
            notes: 'This is a test note',
            reminder: true,
            isCompleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const result = await repository.create(commitment);

        should(result).be.Object();
        should(result._id).be.equal(commitment.id);
        should(result.type).be.equal(commitment.type);
        should(result.title).be.equal(commitment.title);
        should(result.description).be.equal(commitment.description);
        should(result.provider).be.equal(commitment.provider);
        should(result.category).be.equal(commitment.category);
        should(result.amount).be.equal(commitment.amount);
        should(result.frequency).be.equal(commitment.frequency);
        should(result.firstPaymentDate).be.eql(commitment.firstPaymentDate);
        should(result.lastPaymentDate).be.eql(commitment.lastPaymentDate);
        should(result.nextPaymentDate).be.eql(commitment.nextPaymentDate);
        should(result.lastPaymentAmount).be.equal(commitment.lastPaymentAmount);
        should(result.notes).be.equal(commitment.notes);
        should(result.reminder).be.equal(commitment.reminder);
        should(result.isCompleted).be.equal(commitment.isCompleted);
        should(result.createdAt).be.eql(commitment.createdAt);
        should(result.updatedAt).be.eql(commitment.updatedAt);
        should(result.deleted).be.false();
        should(result.deletedAt).be.null();

    });
});
