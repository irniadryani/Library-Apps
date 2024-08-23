"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert sample data into the Category table
    await queryInterface.bulkInsert('category', [
      {
        id: Sequelize.literal('uuid_generate_v4()'), // Use Sequelize to generate a UUID
        name: 'Fiction',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null // Provide a default value, if necessary
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'), // Use Sequelize to generate a UUID
        name: 'Non-Fiction',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null // Provide a default value, if necessary
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'), // Use Sequelize to generate a UUID
        name: 'Science',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null // Provide a default value, if necessary
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all data from the Category table
    await queryInterface.bulkDelete('category', null, {});
  }
};
