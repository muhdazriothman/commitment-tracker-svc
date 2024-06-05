class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getUserById(id) {
        return this.userRepository.findUserById(id);
    }

    // Add other service methods here
}

module.exports = UserService;
