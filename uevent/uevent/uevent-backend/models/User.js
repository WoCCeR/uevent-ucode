const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email_confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    notifications: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    profile_image: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;