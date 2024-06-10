'use strict';

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

    async execute(dto) {


        return this.commitmentRepository.create(data);
    }
}

module.exports = CreateCommitmentUseCase;