const { DataTypes } = require('sequelize');
const { sequelize }= require('../dbConfig');
const UserCompany = require('./UserCompany');

const Company = sequelize.define('Company', {
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
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'company',
    timestamps: true
});

Company.hasMany(UserCompany, { foreignKey: 'company_id' });

module.exports = Company;