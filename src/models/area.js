'use strict';
const {
  Model
} = require('sequelize');
const db = require('../config/database.js'); // Import the Sequelize instance from your configuration module

module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City,{
        foreignKey:'cityId'
      });

      this.hasMany(models.BoxCricket,{
        foreignKey:'areaId',
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      })

    }
  }
  Area.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    cityId:{ 
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize: db,
    modelName: 'Area',
  });
  return Area;
};