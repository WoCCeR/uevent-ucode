const { DataTypes } = require('sequelize');
const { sequelize }= require('../dbConfig');
const User = require('./User');

const Links = sequelize.define('Links', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    activate_link: {
        type: DataTypes.TEXT
    },
    reset_password_link: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'links',
    timestamps: false
});

module.exports = Links;