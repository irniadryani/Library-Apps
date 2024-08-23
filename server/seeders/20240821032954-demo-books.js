'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add seed data here
    await queryInterface.bulkInsert('books', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        status: 'Available',
        publisher: 'J.B. Lippincott & Co.',
        publication_year: 1960,
        date_added: new Date(),
        source: 'Library donation',
        old_book: false,
        bookshelf_id: null, // Replace with a valid bookshelf_id if needed
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        title: 'A Brief History of Time',
        author: 'Stephen Hawking',
        status: 'Available',
        publisher: 'Bantam Books',
        publication_year: 1988,
        date_added: new Date(),
        source: 'Purchased',
        old_book: false,
        bookshelf_id: null, // Replace with a valid bookshelf_id if needed
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        title: '1984',
        author: 'George Orwell',
        status: 'Borrowed',
        publisher: 'Secker & Warburg',
        publication_year: 1949,
        date_added: new Date(),
        source: 'Library donation',
        old_book: true,
        bookshelf_id: null, // Replace with a valid bookshelf_id if needed
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Undo the seed data if needed
    await queryInterface.bulkDelete('Books', null, {});
  }
};
