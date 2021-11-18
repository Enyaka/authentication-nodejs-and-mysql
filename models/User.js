const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');


const User = sequelize.define('User',{
    id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false,
        
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
        validate: {
            isEmail:true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    phone: {
        type: DataTypes.STRING
    }
},{
    timestamps: true,
    
})

module.exports = User;


