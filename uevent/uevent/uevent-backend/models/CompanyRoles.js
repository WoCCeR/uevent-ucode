const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig');

const CompanyRoles = sequelize.define('CompanyRoles', {
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
    tableName: 'company_roles',
    timestamps: false
});

module.exports = CompanyRoles;