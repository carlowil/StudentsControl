const Sequelize = require("sequelize");
module.exports = new Sequelize('app', 'web', 'web234!', {
    host: '78.107.195.27',
    dialect: 'postgres',
    port: 2000,
    operatorsAliases: 0,
    pool: {
      max: 100,
      min: 0,
      acquire: 3000,
      idle: 10000
    }
});
