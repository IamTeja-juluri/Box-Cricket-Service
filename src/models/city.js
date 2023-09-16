'use strict';
const {
  Model
} = require('sequelize');
const sequelize = require('../config/db'); // Import the Sequelize instance from your configuration module

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
      allowNull:false
    },
    stateId: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};