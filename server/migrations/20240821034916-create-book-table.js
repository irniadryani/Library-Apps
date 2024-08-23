"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    await queryInterface.createTable("books", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      category_id: {
        type: Sequelize.UUID,
        references: {
          model: "category",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['Available', 'Borrowed']],
        },
      },
      publisher: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      publication_year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date_added: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      source: {
        type: Sequelize.STRING,
      },
      old_book: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      bookshelf_id: {
        type: Sequelize.UUID,
        references: {
          model: "bookshelves", 
          key: "id",
        },
        onDelete: "SET NULL",
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("books");
  },
};
