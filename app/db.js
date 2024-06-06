const Sequelize = require("sequelize");
module.exports = new Sequelize('app', 'web', 'web234!', {
    host: '192.168.1.36',
    dialect: 'postgres',
    operatorsAliases: 0,
    pool: {
      max: 100,
      min: 0,
      acquire: 3000,
      idle: 10000
    }
});
