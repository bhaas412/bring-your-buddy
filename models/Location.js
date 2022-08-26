const { Model, DataTypes } = require('sequelize');

// Make sure connection path is correct!
const sequelize = require('../config/connection');

class Location extends Model {}

Location.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        location_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        location_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pet_type: {
            type: DataTypes.STRING,
            allowNull: false,
          }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'location'
    }
);

module.exports = Location;