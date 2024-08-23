'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add seed data here
    await queryInterface.bulkInsert('bookshelves', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        name: 'Fiction',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        name: 'Non-Fiction',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        name: 'Science',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Undo the seed data if needed
    await queryInterface.bulkDelete('bookshelves', null, {});
  },
};
