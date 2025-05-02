const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'uevent',
    `${process.env.DB_USER}`,
    `${process.env.DB_PASS}`,
    {
        host: `${process.env.DB_HOST}`,
        dialect: 'mysql',
        retry: {
            match: [/Deadlock/i],
            max: 3,
            backoffBase: 1000,
            backoffExponent: 1.5,
        },
    });


module.exports = { sequelize };
