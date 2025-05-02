const { DataTypes } = require('sequelize');
const { sequelize }= require('../dbConfig');
const Event = require('./Event');
const User = require('./User');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
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
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Event,
            key: 'id'
        }
    }
}, {
    tableName: 'comment',
    timestamps: true
});


module.exports = Comment;