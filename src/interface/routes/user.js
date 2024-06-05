const express = require('express');

const UserRepository = require('../../domain/repositories/user');
const UserService = require('../../application/services/user');

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
            // create dto

            // validate payload

            // excute usecase
            const userService = new UserService(this.userRepository);
            const user = await userService.getUserById(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserRoute;
