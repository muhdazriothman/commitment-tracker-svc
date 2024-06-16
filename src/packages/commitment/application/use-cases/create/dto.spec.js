'use strict';

const sinon = require('sinon');
const should = require('should');

const CreateCommitmentDto = require('../../use-cases/create/dto');

describe('src/packages/commitment/application/use-cases/create/dto.js', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    let data;

    beforeEach(() => {
        data = {
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
        };
    });

    describe('#create', () => {
        it('should return an instance of CreateCommitmentDto', () => {
            const dto = CreateCommitmentDto.create(data);

            should(dto).be.instanceOf(CreateCommitmentDto);
            should(dto).have.properties({
                type: data.type,
                title: data.title,
                description: data.description,
                provider: data.provider,
                category: data.category,
                amount: data.amount,
                frequency: data.frequency,
                firstPaymentDate: data.firstPaymentDate,
                lastPaymentDate: data.lastPaymentDate,
                lastPaymentAmount: data.lastPaymentAmount,
                notes: data.notes
            });
        });

        describe('type', () => {
            it('should throw an error if type is not provided', () => {
                sandbox.stub(data, 'type').value(undefined);

                should(() => CreateCommitmentDto.create(data)).throw('data must have required property \'type\'');
            });

            it('should throw an error if type is not a string', () => {
                sandbox.stub(data, 'type').value(123);

                should(() => CreateCommitmentDto.create(data)).throw('data/type must be string');
            });

            it('should throw an error if type is not a valid CommitmentType', () => {
                sandbox.stub(data, 'type').value('invalid');

                should(() => CreateCommitmentDto.create(data)).throw('data/type must be equal to one of the allowed values');
            });
        });

        describe('title', () => {
            it('should throw an error if title is not provided', () => {
                sandbox.stub(data, 'title').value(undefined);

                should(() => CreateCommitmentDto.create(data)).throw('data must have required property \'title\'');
            });

            it('should throw an error if title is not a string', () => {
                sandbox.stub(data, 'title').value(123);

                should(() => CreateCommitmentDto.create(data)).throw('data/title must be string');
            });
        });

        describe('description', () => {
            it('should throw an error if description is not a string', () => {
                sandbox.stub(data, 'description').value(123);

                should(() => CreateCommitmentDto.create(data)).throw('data/description must be string');
            });
        });

        describe('provider', () => {
            it('should throw an error if provider is not provided', () => {
                sandbox.stub(data, 'provider').value(undefined);

                should(() => CreateCommitmentDto.create(data)).throw('data must have required property \'provider\'');
            });

            it('should throw an error if provider is not a string', () => {
                sandbox.stub(data, 'provider').value(123);

                should(() => CreateCommitmentDto.create(data)).throw('data/provider must be string');
            });
        });

        describe('category', () => {
            it('should throw an error if category is not provided', () => {
                sandbox.stub(data, 'category').value(undefined);

                should(() => CreateCommitmentDto.create(data)).throw('data must have required property \'category\'');
            });

            it('should throw an error if category is not a string', () => {
                sandbox.stub(data, 'category').value(123);

                should(() => CreateCommitmentDto.create(data)).throw('data/category must be string');
            });

            it('should throw an error if category is not a valid CommitmentCategory', () => {
                sandbox.stub(data, 'category').value('invalid');

                should(() => CreateCommitmentDto.create(data)).throw('data/category must be equal to one of the allowed values');
            });
        });

        describe('amount', () => {
            it('should throw an error if amount is not provided', () => {
                sandbox.stub(data, 'amount').value(undefined);

                should(() => CreateCommitmentDto.create(data)).throw('data must have required property \'amount\'');
            });

            it('should throw an error if amount is not a number', () => {
                sandbox.stub(data, 'amount').value('invalid');

                should(() => CreateCommitmentDto.create(data)).throw('data/amount must be number');
            });
        });

        describe('frequency', () => {
            it('should throw an error if frequency is not provided', () => {
                sandbox.stub(data, 'frequency').value(undefined);

                should(() => CreateCommitmentDto.create(data)).throw('data must have required property \'frequency\'');
            });

            it('should throw an error if frequency is not a string', () => {
                sandbox.stub(data, 'frequency').value(123);

                should(() => CreateCommitmentDto.create(data)).throw('data/frequency must be string');
            });

            it('should throw an error if frequency is not a valid CommitmentFrequency', () => {
                sandbox.stub(data, 'frequency').value('invalid');

                should(() => CreateCommitmentDto.create(data)).throw('data/frequency must be equal to one of the allowed values');
            });
        });

        describe('firstPaymentDate', () => {
            it('should throw an error if firstPaymentDate is not provided', () => {
                sandbox.stub(data, 'firstPaymentDate').value(undefined);

                should(() => CreateCommitmentDto.create(data)).throw('data must have required property \'firstPaymentDate\'');
            });

            it('should throw an error if firstPaymentDate is not a string', () => {
                sandbox.stub(data, 'firstPaymentDate').value(123);

                should(() => CreateCommitmentDto.create(data)).throw('data/firstPaymentDate must be string');
            });

            it('should throw an error if firstPaymentDate is not a valid date', () => {
                sandbox.stub(data, 'firstPaymentDate').value('invalid');

                should(() => CreateCommitmentDto.create(data)).throw('data/firstPaymentDate must match format "date"');
            });
        });

        describe('lastPaymentDate', () => {
            it('should throw an error if lastPaymentDate is not provided', () => {
                sandbox.stub(data, 'lastPaymentDate').value(undefined);

                should(() => CreateCommitmentDto.create(data)).throw('data must have required property \'lastPaymentDate\'');
            });

            it('should throw an error if lastPaymentDate is not a string', () => {
                sandbox.stub(data, 'lastPaymentDate').value(123);

                should(() => CreateCommitmentDto.create(data)).throw('data/lastPaymentDate must be string');
            });

            it('should throw an error if lastPaymentDate is not a valid date', () => {
                sandbox.stub(data, 'lastPaymentDate').value('invalid');

                should(() => CreateCommitmentDto.create(data)).throw('data/lastPaymentDate must match format "date"');
            });
        });

        describe('lastPaymentAmount', () => {
            it('should throw an error if lastPaymentAmount is not provided', () => {
                sandbox.stub(data, 'lastPaymentAmount').value(undefined);

                should(() => CreateCommitmentDto.create(data)).throw('data must have required property \'lastPaymentAmount\'');
            });

            it('should throw an error if lastPaymentAmount is not a number', () => {
                sandbox.stub(data, 'lastPaymentAmount').value('invalid');

                should(() => CreateCommitmentDto.create(data)).throw('data/lastPaymentAmount must be number');
            });
        });

        describe('notes', () => {
            it('should throw an error if notes is not a string', () => {
                sandbox.stub(data, 'notes').value(123);

                should(() => CreateCommitmentDto.create(data)).throw('data/notes must be string');
            });
        });
    });
});