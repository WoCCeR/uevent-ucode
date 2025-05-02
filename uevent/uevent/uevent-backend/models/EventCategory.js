const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig');
const Event = require('./Event');
const Category = require('./Category');

const EventCategory = sequelize.define('EventCategory', {
    event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Event,
            key: 'id'
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        // references: {
        //     model: Category,
        //     key: 'id'
        // }
    }
}, {
    tableName: 'event_categories',
    timestamps: false
});


module.exports = EventCategory;