'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        name: 'Librarian',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        name: 'Member',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
