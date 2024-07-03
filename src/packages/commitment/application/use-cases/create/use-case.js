'use strict';

const luxon = require('luxon');

const Commitment = require('../../../domain/entities/commitment');
const CreateCommitmentDto = require('./dto');
const CommitmentRepository = require('../../../infrastructure/repositories/commitment/repository');

class CreateCommitmentUseCase {
    /**
     * @param {Object} dependencies
     * @param {CommitmentRepository} dependencies.commitmentRepository
     */
    constructor(dependencies) {
        const {
            commitmentRepository
        } = dependencies;

        if (!(commitmentRepository instanceof CommitmentRepository)) {
            throw new Error('commitmentRepository must be an instance of CommitmentRepository');
        }

        this.commitmentRepository = commitmentRepository;
    }

    /**
     * Create a new instance of the CreateCommitmentUseCase class
     * @param {Object} dependencies
     * @param {CommitmentRepository} dependencies.commitmentRepository
     * @returns {CreateCommitmentUseCase}
     */
    static create(dependencies) {
        const {
            commitmentRepository
        } = dependencies;

        return new CreateCommitmentUseCase({
            commitmentRepository: commitmentRepository
        });
    }

    /**
     * Create a new commitment
     * @param {Object} dto
     * @returns {Promise<Commitment>}
     */
    async execute(dto) {
        if (!(dto instanceof CreateCommitmentDto)) {
            throw new Error('createCommitmentDto is required');
        }

        const commitment = Commitment.create({
            type: dto.type,
            title: dto.title,
            description: dto.description,
            provider: dto.provider,
            category: dto.category,
            amount: dto.amount,
            frequency: dto.frequency,
            firstPaymentDate: dto.firstPaymentDate,
            lastPaymentDate: dto.lastPaymentDate,
            nextPaymentDate: CreateCommitmentUseCase.getNextPaymentDate({
                frequency: dto.frequency,
                firstPaymentDate: dto.firstPaymentDate
            }),
            lastPaymentAmount: dto.lastPaymentAmount,
            notes: dto.notes
        });

        return this.commitmentRepository.create(commitment);
    }

    /**
     * Get the next payment date
     * @param {Object} params
     * @param {string} params.frequency
     * @param {string} params.firstPaymentDate
     * @returns {luxon.DateTime}
     */
    static getNextPaymentDate(params) {
        const {
            frequency,
            firstPaymentDate
        } = params;

        const date = luxon.DateTime.fromISO(firstPaymentDate, { zone: 'utc' });

        let dateOperation;

        if (frequency === Commitment.FrequencyType.Daily) {
            dateOperation = { days: 1 };
        } else if (frequency === Commitment.FrequencyType.Weekly) {
            dateOperation = { weeks: 1 };
        } else if (frequency === Commitment.FrequencyType.Monthly) {
            dateOperation = { months: 1 };
        } else {
            throw new Error('Invalid frequency');
        }

        return date.plus(dateOperation).toUTC().toISO();
    }
}

module.exports = CreateCommitmentUseCase;