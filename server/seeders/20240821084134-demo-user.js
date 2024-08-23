"use strict";

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt'); // To hash passwords

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash passwords for security
    const hashedPassword = await bcrypt.hash('defaultpassword', 10); // Example password hash

    // Define user data to be inserted
    const users = [
      {
        id: uuidv4(),
        role_id: '943e6657-51b9-449a-a488-e14c487b6ba3', // Replace with the actual role ID
        full_name: 'John',
        email: 'john@gmail.com',
        phone_number: '123-456-7890',
        age: 30,
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: uuidv4(),
        role_id: 'e71e0e13-84ec-4997-94ce-ddfe38ee7eab', // Replace with the actual role ID
        full_name: 'Jessie',
        email: 'jessie@gmail.com',
        phone_number: '987-654-3210',
        age: 25,
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    ];

    // Insert data into the users table
    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all users
    await queryInterface.bulkDelete('users', null, {});
  }
};
