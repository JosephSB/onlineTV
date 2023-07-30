const Sequelize = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(config.DB.NAME, config.DB.USER, config.DB.PASSWORD, {
    host: config.DB.HOST,
    // port: '6001',
    dialect: config.DB.dialect,
    dialectOptions: {
        supportBigNumbers: true
    },
    operatorsAliases: false,
    pool: {
        max: config.DB.pool.max,
        min: config.DB.pool.min,
        acquire: config.DB.pool.acquire,
        idle: config.DB.pool.idle
    },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;