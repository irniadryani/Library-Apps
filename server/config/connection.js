const { Sequelize } = require('sequelize');

// Create a new Sequelize instance to connect to the PostgreSQL database
const sequelize = new Sequelize({
    username: "postgres",
    password: "irinn1601",
    database: "library_apps",
    host: "127.0.0.1",
    dialect: "postgres",
    port: 5432
});


module.exports = sequelize;
