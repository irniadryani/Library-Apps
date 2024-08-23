"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");
const Books = require("../models/BookModel.js")

const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
      defaultValue: DataTypes.NOW,
      allowNull: true,
    }
  },
  {
    freezeTableName: true,
    tableName: 'category',
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);


module.exports = Category;
