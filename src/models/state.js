'use strict';
const { Model } = require('sequelize');
const db = require('../config/database.js'); // Import the Sequelize instance from your configuration module

module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.City,{
        foreignKey:'stateId',
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      });
    }
  }
  
  State.init(
  {
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    }
  }, {
    sequelize: db,
    modelName: 'State',
  });
  return State;
};