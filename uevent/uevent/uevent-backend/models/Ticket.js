const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig');
const Event = require('./Event');
const User = require('./User');

const Ticket = sequelize.define('Ticket', {
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
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
    tableName: 'tickets',
    timestamps: true
});


module.exports = Ticket;