'use strict';

const sinon = require('sinon');
const should = require('should');

const Commitment = require('../../../domain/entities/commitment');
const CreateCommitmentDto = require('../../use-cases/create/dto');
const CreateCommitmentUseCase = require('./use-case');
const CommitmentRepository = require('../../../infrastructure/repositories/commitment/repository');

describe('src/packages/commitment/application/use-cases/create/use-case.js', () => {
    const sandbox = sinon.createSandbox();
    const dependencySanbox = sinon.createSandbox();

    const dependencies = {
        commitmentRepository: dependencySanbox.createStubInstance(CommitmentRepository)
    };

    /**
     * @type {CreateCommitmentUseCase}
     */
    const useCase = new CreateCommitmentUseCase(dependencies);

    afterEach(() => {
        dependencySanbox.reset();
        sandbox.restore();
    });

    describe('@constructor', () => {
        it('should return an instance of CreateCommitmentUseCase', () => {
            const useCase = new CreateCommitmentUseCase(dependencies);

            should(useCase).be.instanceOf(CreateCommitmentUseCase);
        });
    });

    describe('#create', () => {
        it('should return an instance of CreateCommitmentUseCase', () => {
            const useCase = CreateCommitmentUseCase.create(dependencies);

            should(useCase).be.instanceOf(CreateCommitmentUseCase);
        });
    });

    describe('#execute', async () => {
        beforeEach(() => {
            sandbox.spy(Commitment, 'create');
            dependencies.commitmentRepository.create.resolves({});
        });

        it('should throw an error if dto is not an instance of CreateCommitmentDto', async () => {
            const dto = 'invalid';

            should(useCase.execute(dto)).be.rejectedWith('createCommitmentDto is required');
        });

        it('should create a new commitment', async () => {
            const dto = CreateCommitmentDto.create({
                type: 'loan-payment',
                title: 'Test Title',
                description: 'Test Description',
                provider: 'Test Provider',
                category: 'housing',
                amount: 100,
                frequency: 'monthly',
                firstPaymentDate: '2021-01-01',
                lastPaymentDate: '2021-12-31',
                lastPaymentAmount: 100,
                notes: 'Test Notes'
            });

            await useCase.execute(dto);

            should(Commitment.create.calledOnce).be.true();
            should(Commitment.create.getCall(0).args.length).be.eql(1);
            should(Commitment.create.getCall(0).args[0]).be.deepEqual({
                type: dto.type,
                title: dto.title,
                description: dto.description,
                provider: dto.provider,
                category: dto.category,
                amount: dto.amount,
                frequency: dto.frequency,
                firstPaymentDate: dto.firstPaymentDate,
                lastPaymentDate: dto.lastPaymentDate,
                nextPaymentDate: '2021-02-01T00:00:00.000Z',
                lastPaymentAmount: dto.lastPaymentAmount,
                notes: dto.notes,
            });

            should(dependencies.commitmentRepository.create.calledOnce).be.true();
            should(dependencies.commitmentRepository.create.getCall(0).args.length).be.eql(1);
            should(dependencies.commitmentRepository.create.getCall(0).args[0]).be.deepEqual(
                Commitment.create.getCall(0).returnValue
            );
        });
    });

    describe('#getNextPaymentDate', () => {
        const params = {
            frequency: 'daily',
            firstPaymentDate: '2024-01-01T00:00:00.000Z',
        };

        it('should return the next payment date for a daily frequency', () => {
            const nextPaymentDate = CreateCommitmentUseCase.getNextPaymentDate(params);

            should(nextPaymentDate).be.equal('2024-01-02T00:00:00.000Z');
        });

        it('should return the next payment date for a weekly frequency', () => {
            sandbox.stub(params, 'frequency').value('weekly');

            const nextPaymentDate = CreateCommitmentUseCase.getNextPaymentDate(params);

            should(nextPaymentDate).be.equal('2024-01-08T00:00:00.000Z');
        });

        it('should return the next payment date for a monthly frequency', () => {
            sandbox.stub(params, 'frequency').value('monthly');

            const nextPaymentDate = CreateCommitmentUseCase.getNextPaymentDate(params);

            should(nextPaymentDate).be.equal('2024-02-01T00:00:00.000Z');
        });

        it('should return the next payment date with offset when offset is provided', () => {
            sandbox.stub(params, 'frequency').value('daily');
            sandbox.stub(params, 'firstPaymentDate').value('2024-01-31T05:00:00.000Z');

            const nextPaymentDate = CreateCommitmentUseCase.getNextPaymentDate(params);

            should(nextPaymentDate).be.equal('2024-02-01T05:00:00.000Z');
        });

        it('should return the next payment date for a daily frequency when the next payment date is a leap date', () => {
            sandbox.stub(params, 'frequency').value('daily');
            sandbox.stub(params, 'firstPaymentDate').value('2024-02-28T00:00:00.000Z');

            const nextPaymentDate = CreateCommitmentUseCase.getNextPaymentDate(params);

            should(nextPaymentDate).be.equal('2024-02-29T00:00:00.000Z');
        });

        it('should return the next payment date for a monthly frequncy when the next payment date is the last day of a leap month', () => {
            sandbox.stub(params, 'frequency').value('monthly');
            sandbox.stub(params, 'firstPaymentDate').value('2024-01-31T00:00:00.000Z');

            const nextPaymentDate = CreateCommitmentUseCase.getNextPaymentDate(params);

            should(nextPaymentDate).be.equal('2024-02-29T00:00:00.000Z');
        });

        it('should return the next payment date for a monthly frequency when the next payment date is the last day of a non-leap month', () => {
            sandbox.stub(params, 'frequency').value('monthly');
            sandbox.stub(params, 'firstPaymentDate').value('2024-03-31T00:00:00.000Z');

            const nextPaymentDate = CreateCommitmentUseCase.getNextPaymentDate(params);

            should(nextPaymentDate).be.equal('2024-04-30T00:00:00.000Z');
        });

        it('should return the next payment date for a monthly frequency when the next payment date is not the last day of the month', () => {
            sandbox.stub(params, 'frequency').value('monthly');
            sandbox.stub(params, 'firstPaymentDate').value('2024-01-15T00:00:00.000Z');

            const nextPaymentDate = CreateCommitmentUseCase.getNextPaymentDate(params);

            should(nextPaymentDate).be.equal('2024-02-15T00:00:00.000Z');
        });

        it('should throw an error if the frequency is not valid', () => {
            sandbox.stub(params, 'frequency').value('invalid');

            should(() => CreateCommitmentUseCase.getNextPaymentDate(params)).throw('Invalid frequency');
        });
    });
});