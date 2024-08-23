const { Sequelize } = require('sequelize');

const db = new Sequelize('library_apps', 'postgres', 'irinn1601', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = db;
