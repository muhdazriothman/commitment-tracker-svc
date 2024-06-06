'use strict';

const express = require('express');

const UserRepository = require('../../packages/user/infrastructure/repositories/user/repository');
const GetUserUseCase = require('../../packages/user/application/use-cases/get-user');

class UserRoute {
    /**
     * @param {Object} dependencies
     * @param {UserRepository} dependencies.userRepository
     */
    constructor(dependencies) {
        const {
            userRepository
        } = dependencies;

        this.userRepository = userRepository;
    }

    /**
     * Create a new instance of the UserRoute class
     * @param {Object} dependencies
     * @param {UserRepository} dependencies.userRepository
     * @returns {UserRoute}
     */
    static create(dependencies) {
        const {
            userRepository
        } = dependencies;

        return new UserRoute({
            userRepository: userRepository
        });
    }

    /**
     * Setup routes
     * @param {express.Application} app
     * @returns {void}
     */
    setupRoutes(app) {
        app.get('/user/:id', this.getUserById.bind(this));
    }

    /**
     * Get user by id
     * @param {express.Request} req
     * @param {express.Response} res
     * @returns {Promise<void>}
     */
    async getUserById(req, res) {
        try {
            const useCase = GetUserUseCase.create({
                userRepository: this.userRepository
            });

            const user = await useCase.execute(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserRoute;
