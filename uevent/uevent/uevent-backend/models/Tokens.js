const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig');
const User = require('./User');

const Tokens = sequelize.define('Tokens', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    refresh_token: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    session_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    tableName: 'tokens',
    timestamps: false
});

module.exports = Tokens;