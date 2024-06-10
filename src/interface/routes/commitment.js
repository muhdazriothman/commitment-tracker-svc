'use strict';

const express = require('express');

const CommitmentRepository = require('../../packages/commitment/infrastructure/repositories/commitment/repository');
const CreateCommitmentUseCase = require('../../packages/commitment/application/use-cases/create/use-case');

class CommitmentRoute {
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
            commitmentRepository: commitmentRepository
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
    async createCommitment(req, res) {
        try {
            const useCase = CreateCommitmentUseCase.create({
                commitmentRepository: this.commitmentRepository
            });

            const commitment = await useCase.execute(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CommitmentRoute;
