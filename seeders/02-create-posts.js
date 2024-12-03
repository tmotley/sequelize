'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const posts = [
            {
                id: '1',
                title: 'Interesting Blog Post',
                user_id: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        // Bulk insert the states into the 'States' table
        return queryInterface.bulkInsert('Posts', posts, {});
    },

    down: async (queryInterface, Sequelize) => {
        // Remove all the states from the 'States' table
        return queryInterface.bulkDelete('Posts', null, {});
    }
};