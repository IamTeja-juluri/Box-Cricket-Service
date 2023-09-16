'use strict';
const {
  Model
} = require('sequelize');
const db = require('../config/database.js'); // Import the Sequelize instance from your configuration module

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.State,{
        foreignKey:'stateId'
      });

      this.hasMany(models.Area,{
        foreignKey:'cityId',
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      });

    }
  }
  City.init({
    name:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    stateId: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize:db,
    modelName: 'City',
  });
  return City;
};