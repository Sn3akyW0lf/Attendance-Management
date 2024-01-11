const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Item = sequelize.define('items', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  quantity: {
      type: Sequelize.DOUBLE,
      allowNull: false
  }
});

module.exports = Item;