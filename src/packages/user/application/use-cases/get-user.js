'use strict';

const UserRepository = require('../../infrastructure/repositories/user/repository');

class GetUserUseCase {
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
     * Create a new instance of the GetUserUseCase class
     * @param {Object} dependencies
     * @param {UserRepository} dependencies.userRepository
     * @returns {GetUserUseCase}
     */
    static create(dependencies) {
        const {
            userRepository
        } = dependencies;

        return new GetUserUseCase({
            userRepository: userRepository
        });
    }

    async execute(id) {
        return this.userRepository.findUserById(id);
    }
}

module.exports = GetUserUseCase;
