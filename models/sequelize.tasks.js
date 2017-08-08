// MySQL + Sequelize code

const Sequelize = require('sequelize');

const config = require('./sequelize.config');

// Setting up a connection
const sequelize = new Sequelize(config.database, config.username, config.password, config.options);

// Or you can simply use a connection uri
// const db = new Sequelize('postgres://user:pass@example.com:5432/dbname');

// Test the connection
sequelize.authenticate()
	.then(() => {
		console.log(`Connection to database ${config.database} has been established successfully! :)`);
	})
	.catch(err => {
		console.error(`Unable to connect to the database ${config.database}:\n`, err);
	});

// First model
const TaskSchema = sequelize.define('task', {
	content: {
		type: Sequelize.STRING
	}
});

/*
// in MongoDB
let exampleTask = {
	_id: 0,
	content: 'Some text',
};

// in MySQL
let exampleTask = {
	id: 0,
	content: 'Some text',
};

/////////////////////////

// in MongoDB
let exampleUser = {
	_id: 0,
	name: 'Alex',
	tasks: [{
		content: 'Some text 1'
	}, {
		content: 'Some text 2'
	}, {
		content: 'Some text 3'
	}]
};

// in MySQL - 2 tables
let exampleUser = {
	id: 0,
	name: 'Alex'
};
let exampleTasks = {
	id: 0,
	userID: 0,
	content: 'Some text',
};
*/

// CRUD

class Task {
	constructor(model) {
		this.model = model;
	}

	showList() {
		return this.model.findAll()
			.then(results => results)
			.catch(err => {
				console.error('Error read tasks from MySQL:\n', err);
				return err;
			});
	}

	addTask(content) {
		return this.model.create({ content })
			.then(result => result)
			.catch(err => {
				console.error('Error write new task to MySQL:\n', err);
				return err;
			});
	}

	changeTask(id, content) {
		return this.model.update({ content }, {
			where: { id }
		})
			.then(result => result)
			.catch(err => {
				console.error('Error update task in MySQL:\n', err);
				return err;
			});
	}

	deleteTask(id) {
		return this.model.destroy({
			where: { id }
		})
			.then(() => true)
			.catch(err => {
				console.error('Error delete task from MySQL:\n', err);
				return err;
			});
	}
};

module.exports = new Task(TaskSchema);
