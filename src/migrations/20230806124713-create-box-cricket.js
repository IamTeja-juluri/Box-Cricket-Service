'use strict';
/** @type {import('sequelize-cli').Migration} */
const {Enums} = require('../utils/common');
const {SMALL,MEDIUM,LARGE} = Enums.BoxSize
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BoxCrickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      areaId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Areas',
          key:'id'
        }
      },
      location: {
        type:Sequelize.STRING,
        allowNull:false
      },
      photo:{
       type: Sequelize.STRING
      },
      price:{
        type:Sequelize.FLOAT,
        allowNull:false
      },
      size:{
        type:Sequelize.ENUM,
        values:[SMALL,MEDIUM,LARGE],
        allowNull:false
      },
      is24hrsOpen:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue : false
      },
      ownerContact:{
        type:Sequelize.BIGINT,
        allowNull:false
      },
      ownerName:{
        type:Sequelize.STRING,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BoxCrickets');
  }
};