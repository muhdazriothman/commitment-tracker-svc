'use strict';

const sinon = require('sinon');
const should = require('should');

const {
    MongoClient
} = require('mongodb');
const CommitmentRepository = require('./repository');
const Commitment = require('../../../domain/entities/commitment');

describe('src/packages/commitment/infrastructure/repositories/commitment/repository.spec.js', () => {
    const sandbox = sinon.createSandbox();

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

    beforeEach(async () => {
        await repository.collection.deleteMany({});
    });

    after(async () => {
        await client.close();
    });

    afterEach(async () => {
        sandbox.restore();
    });

    describe('#create', async () => {
        beforeEach(async function () {
            sandbox.spy(CommitmentRepository, 'toDO');
            sandbox.spy(CommitmentRepository, 'toDomain');
        });

        it('should create a new commitment', async () => {
            const commitment = Commitment.create({
                type: 'loan',
                name: 'Car Loan',
                description: 'Monthly car loan payment',
                provider: 'Bank',
                category: 'Vehicle',
                amount: 300.00,
                amountPaid: 0.00,
                duration: {
                    months: 60,
                    unitOfTime: 'months'
                },
                frequency: 'monthly',
                startDate: new Date('2022-01-01'),
                endDate: new Date('2024-12-31'),
                notes: 'This is a test note',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            });

            const result = await repository.create(commitment);

            const dbValues = CommitmentRepository.toDO.getCall(0).returnValue;

            should(CommitmentRepository.toDO.calledOnce).be.true();
            should(CommitmentRepository.toDO.getCall(0).args.length).equal(1);
            should(CommitmentRepository.toDO.getCall(0).args[0]).equal(commitment);


            should(CommitmentRepository.toDomain.calledOnce).be.true();
            should(CommitmentRepository.toDomain.getCall(0).args.length).equal(1);
            should(CommitmentRepository.toDomain.getCall(0).args[0]).equal(dbValues);

            should(result).be.instanceOf(Commitment);
            should(result.id).be.eql(dbValues._id.toString());
            // TODO: Enable userId when authentication is implemented
            // should(result.userId).be.eql(dbValues.userId);
            should(result.type).be.equal(dbValues.type);
            should(result.name).be.equal(dbValues.name);
            should(result.description).be.equal(dbValues.description);
            should(result.provider).be.equal(dbValues.provider);
            should(result.category).be.equal(dbValues.category);
            should(result.amount).be.equal(dbValues.amount);
            should(result.amountPaid).be.equal(dbValues.amountPaid);
            should(result.duration).be.eql(dbValues.duration);
            should(result.frequency).be.equal(dbValues.frequency);
            should(result.startDate).be.eql(dbValues.startDate);
            should(result.endDate).be.eql(dbValues.endDate);
            should(result.notes).be.equal(dbValues.notes);
            should(result.createdAt).be.eql(dbValues.createdAt);
            should(result.updatedAt).be.eql(dbValues.updatedAt);
            should(result.deleted).be.false();
            should(result.deletedAt).be.null();
        });
    });
});
