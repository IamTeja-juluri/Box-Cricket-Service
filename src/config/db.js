// database.js

const { Sequelize } = require('sequelize');
const ServerConfig = require('./server-config')

const sequelize = new Sequelize(ServerConfig.DB_NAME, ServerConfig.DB_USER, ServerConfig.DB_PASSWORD, {
  host: ServerConfig.DB_HOST,
  dialect: 'mysql'
});

module.exports = sequelize;
