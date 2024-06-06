const { DataTypes } = require('sequelize')
const db = require('../db.js')

const Tasks = db.define('tasks',
  // Описание таблицы
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ready: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    mark_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
  },
  // Опции
  {
    timestamps: false
  }
)

db.sync().then(result=>{
    console.log(result);
  })
  .catch(err=> console.log(err));

module.exports = Tasks;