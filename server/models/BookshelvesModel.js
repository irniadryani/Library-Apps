"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");
const Books = require("./BookModel.js");

const Bookshelves = sequelize.define(
  "bookshelves",
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
    name: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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
  }
);

module.exports = Bookshelves;
