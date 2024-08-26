const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");
const Loans = require("./LoansModel");
const Category = require("./CategoryModel");
const BookshelvesModel = require("./BookshelvesModel");

const Books = sequelize.define(
  "books",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.UUID,
      references: {
        model: Category,
        key: "id",
      },
      onDelete: "SET NULL",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Available', 'Borrowed']],
      },
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publication_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_added: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    source: {
      type: DataTypes.STRING,
    },
    old_book: {
      type: DataTypes.BOOLEAN,
    },
    bookshelf_id: {
      type: DataTypes.UUID,
      references: {
        model: BookshelvesModel,
        key: "id",
      },
      onDelete: "SET NULL",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);


Books.belongsTo(BookshelvesModel, { foreignKey: "bookshelf_id", as: 'bookshelves' });

module.exports = Books;
