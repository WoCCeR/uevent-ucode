const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig');
const Event = require('./Event');
const EventCategory = require('./EventCategory');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'categories',
    timestamps: false
});

Category.hasMany(EventCategory, { foreignKey: 'category_id' });


module.exports = Category;