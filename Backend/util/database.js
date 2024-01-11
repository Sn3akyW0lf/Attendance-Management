const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_new', 'root', 'S!ddh3sh', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
