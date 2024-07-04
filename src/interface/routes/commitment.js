'use strict';

const express = require('express');

const Logger = require('../../packages/common/application/logger');

const CommitmentDto = require('../../packages/commitment/application/use-cases/create/dto');
const CommitmentRepository = require('../../packages/commitment/infrastructure/repositories/commitment/repository');
const CreateCommitmentUseCase = require('../../packages/commitment/application/use-cases/create/use-case');

class CommitmentRoute {
    /**
     * @param {Object} dependencies
     * @param {CommitmentRepository} dependencies.commitmentRepository
     * @param {Logger} dependencies.logger
     */
    constructor(dependencies) {
        const {
            commitmentRepository,
            logger
        } = dependencies;

        if (!(commitmentRepository instanceof CommitmentRepository)) {
            throw new Error('commitmentRepository must be an instance of CommitmentRepository');
        }

        if (!(logger instanceof Logger)) {
            throw new Error('logger must be an instance of Logger');
        }

        this.commitmentRepository = commitmentRepository;
        this.logger = logger;
    }

    /**
     * Create a new instance of the CommitmentRoute
     * @param {Object} dependencies
     * @param {CommitmentRepository} dependencies.commitmentRepository
     * @returns {CommitmentRoute}
     */
    static create(dependencies) {
        const {
            commitmentRepository
        } = dependencies;

        return new CommitmentRoute({
            commitmentRepository: commitmentRepository,
            logger: Logger.create()
        });
    }

    /**
     * Setup routes
     * @param {express.Application} app
     * @returns {void}
     */
    setupRoutes(app) {
        app.post('/commitment', this.createCommitment.bind(this));
    }

    /**
     * Get user by id
     * @param {express.Request} req
     * @param {express.Response} res
     * @returns {Promise<void>}
     */
    async createCommitment(req, res, next) {
        try {
            this.logger.info('Incoming request to create commitment');

            const useCase = CreateCommitmentUseCase.create({
                commitmentRepository: this.commitmentRepository
            });

            console.log('req.body', req.body);

            const dto = CommitmentDto.create(req.body);

            const commitment = await useCase.execute(dto);

            res.json(commitment);
        } catch (error) {
            this.logger.error('Unexpected error creating commitment', error);
            next(error);
        }
    }
}

module.exports = CommitmentRoute;
