const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig');
const Company = require('./Company');

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tickets_maximal_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ticket_price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    card_image: {
        type: DataTypes.STRING
    },
    banner_image: {
        type: DataTypes.STRING
    },
    start_time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    end_time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Company,
            key: 'id'
        }
    }
}, {
    tableName: 'events',
    timestamps: true
});


module.exports = Event;