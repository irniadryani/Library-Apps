"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");
const Books = require("./BookModel.js");

const Loans = sequelize.define(
  "loans",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    book_id: {
      type: DataTypes.UUID,
      references: {
        model: Books,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    borrower_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    loan_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estimated_return_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATE,
    },
    age: {
      type: DataTypes.INTEGER
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

module.exports = Loans;
