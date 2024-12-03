'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const users = [
            {
                id: '1',
                firstName: 'Bob',
                lastName:   'Holness',
                email: 'bob@example.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        // Bulk insert the states into the 'States' table
        return queryInterface.bulkInsert('Users',users, {});
    },

    down: async (queryInterface, Sequelize) => {
        // Remove all the states from the 'States' table
        return queryInterface.bulkDelete('Users', null, {});
    }
};