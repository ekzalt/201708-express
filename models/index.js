// uncomment here to use database: MongoDB + Mongoose
// const users = require('./mongoose.users');
// const tasks = require('./mongoose.tasks');

// uncomment here to use database: MySQL + Sequelize
const users = require('./sequelize.users');
const tasks = require('./sequelize.tasks');

module.exports = { users, tasks };
