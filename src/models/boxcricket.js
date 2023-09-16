'use strict';
const {
  Model
} = require('sequelize');
const sequelize = require('../config/db'); // Import the Sequelize instance from your configuration module

const {Enums} = require('../utils/common');

const {SMALL,MEDIUM,LARGE} = Enums.BoxSize;

module.exports = (sequelize, DataTypes) => {
  class BoxCricket extends Model {
    /**   
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Area,{
        foreignKey:'areaId'
      })
      
    }
  }
  BoxCricket.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    areaId:{ 
      type:DataTypes.INTEGER,
      allowNull:false
    },
    location:{
      type:DataTypes.STRING,
      allowNull:false
    },
    price:{
      type:DataTypes.FLOAT,
      allowNull:false
    },
    size:{
      type:DataTypes.ENUM,
      values:[SMALL,MEDIUM,LARGE],
      allowNull:false
    },
    is24hrsOpen:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue : false
    },
    ownerContact:{
      type:DataTypes.BIGINT,
      allowNull:false
    },
    ownerName:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'BoxCricket',
  });
  return BoxCricket;
};