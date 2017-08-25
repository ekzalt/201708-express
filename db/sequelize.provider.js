// MySQL + Sequelize code

const Sequelize = require('sequelize');

const config = require('../config/sequelize.config');

// Setting up a connection
const sequelize = new Sequelize(config.database, config.username, config.password, config.options);

// Or you can simply use a connection uri
// const db = new Sequelize('postgres://user:pass@example.com:5432/dbname');

// Test the connection
sequelize.authenticate()
	.then(data => {
		console.log(`Connection to MySQL database ${config.database} has been established successfully! :)`);
	})
	.catch(err => {
		console.error(`Unable to connect to MySQL database ${config.database}:\n`, err);
	});

module.exports = sequelize;
