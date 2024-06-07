'use strict';

const sinon = require('sinon');
const should = require('should');

const Commitment = require('./commitment');

describe('src/packages/commitment/domain/entities/commitment.spec.js', () => {
    const sandbox = sinon.createSandbox();

    let props;

    beforeEach(() => {
        props = {
            id: '643038dfafceebafd191b186',
            // userId
            type: 'loan payment',
            title: 'Loan Payment',
            description: 'Loan Payment Description',
            provider: 'Loan Provider',
            category: 'debt',
            amount: 100,
            frequency: 'monthly',
            firstPaymentDate: new Date('2024-01-01'),
            lastPaymentDate: new Date('2024-12-01'),
            nextPaymentDate: new Date('2024-02-01'),
            lastPaymentAmount: 100,
            notes: 'Loan Payment Notes',
            isCompleted: false,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            deleted: false,
            deletedAt: null
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('CommitmentType', () => {
        it('should have a CommitmentType enum', () => {
            Commitment.CommitmentType.should.be.eql({
                LoanPayment: 'loan payment',
                Rent: 'rent',
                Utility: 'utility',
                Subscription: 'subscription',
                Other: 'other'
            });
        });
    });

    describe('CommitmentCategory', () => {
        it('should have a CommitmentCategory enum', () => {
            Commitment.CommitmentCategory.should.be.eql({
                Housing: 'housing',
                Transportation: 'transportation',
                Food: 'food',
                Utilities: 'utilities',
                Clothing: 'clothing',
                MedicalHealthcare: 'medical/healthcare',
                Insurance: 'insurance',
                Savings: 'savings',
                Personal: 'personal',
                Debt: 'debt',
                Entertainment: 'entertainment',
                Miscellaneous: 'miscellaneous'
            });
        });
    });

    describe('FrequencyType', () => {
        it('should have a FrequencyType enum', () => {
            Commitment.FrequencyType.should.be.eql({
                Daily: 'daily',
                Weekly: 'weekly',
                Monthly: 'monthly'
            });
        });
    });

    describe('#constructor', () => {
        it('should create a new instance of Commitment', () => {
            const commitment = new Commitment(props);

            should(commitment).be.instanceOf(Commitment);
            should(commitment.id).be.eql(props.id);
            should(commitment.type).be.eql(props.type);
            should(commitment.title).be.eql(props.title);
            should(commitment.description).be.eql(props.description);
            should(commitment.provider).be.eql(props.provider);
            should(commitment.category).be.eql(props.category);
            should(commitment.amount).be.eql(props.amount);
            should(commitment.frequency).be.eql(props.frequency);
            should(commitment.firstPaymentDate).be.eql(props.firstPaymentDate);
            should(commitment.lastPaymentDate).be.eql(props.lastPaymentDate);
            should(commitment.nextPaymentDate).be.eql(props.nextPaymentDate);
            should(commitment.lastPaymentAmount).be.eql(props.lastPaymentAmount);
            should(commitment.notes).be.eql(props.notes);
            should(commitment.isCompleted).be.eql(props.isCompleted);
            should(commitment.createdAt).be.eql(props.createdAt);
            should(commitment.updatedAt).be.eql(props.updatedAt);
            should(commitment.deleted).be.eql(props.deleted);
            should(commitment.deletedAt).be.eql(props.deletedAt);
        });
    });

    describe('#createForLoanPayment', () => {
        it('should create a new instance of Commitment for loan payment', () => {
            const commitment = Commitment.createForLoanPayment(props);

            should(commitment).be.instanceOf(Commitment);
            should(commitment.id).be.eql(props.id);
            should(commitment.type).be.eql(Commitment.CommitmentType.LoanPayment);
            should(commitment.title).be.eql(props.title);
            should(commitment.description).be.eql(props.description);
            should(commitment.provider).be.eql(props.provider);
            should(commitment.category).be.eql(props.category);
            should(commitment.amount).be.eql(props.amount);
            should(commitment.frequency).be.eql(props.frequency);
            should(commitment.firstPaymentDate).be.eql(props.firstPaymentDate);
            should(commitment.lastPaymentDate).be.eql(props.lastPaymentDate);
            should(commitment.nextPaymentDate).be.eql(props.nextPaymentDate);
            should(commitment.lastPaymentAmount).be.eql(props.lastPaymentAmount);
            should(commitment.notes).be.eql(props.notes);
            should(commitment.isCompleted).be.eql(props.isCompleted);
            should(commitment.createdAt).be.eql(props.createdAt);
            should(commitment.updatedAt).be.eql(props.updatedAt);
            should(commitment.deleted).be.eql(props.deleted);
            should(commitment.deletedAt).be.eql(props.deletedAt);
        });
    });
});