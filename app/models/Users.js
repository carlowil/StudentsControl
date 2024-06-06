const { DataTypes } = require('sequelize')
const db = require('../db.js')

const Users = db.define('users',
  // Описание таблицы
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'student',
        allowNull: false
    },
    can_see_marks: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    can_see_exams: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
  },
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

module.exports = Users