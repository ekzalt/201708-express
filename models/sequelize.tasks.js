const Sequelize = require('sequelize');

const sequelize = require('../db/sequelize.provider');

const TaskSchema = sequelize.define('task', {
	userId: {
		type: Sequelize.INTEGER
	},
	content: {
		type: Sequelize.STRING
	}
});

/*
// in MySQL
let exampleTask = {
	id: 1, // number integer, default
	userId: 1, // number integer, handle required
	content: 'Some text' // string, handle required
};
*/

// task CRUD

class Task {
	constructor(model) {
		this.model = model;
	}

	createTask(userId, content) {
		return this.model.create({ userId, content })
			.then(result => result)
			.catch(err => {
				console.error('Error write new task to MySQL:\n', err);
				return err;
			});
	}

	readTasks(userId) {
		return this.model.findAll({ where: { userId } })
			.then(results => results)
			.catch(err => {
				console.error('Error read tasks from MySQL:\n', err);
				return err;
			});
	}

	updateTask(id, updates = {}) {
		return this.model.update(updates, { where: { id } })
			.then(result => result)
			.catch(err => {
				console.error('Error update task in MySQL:\n', err);
				return err;
			});
	}

	deleteTask(id) {
		return this.model.destroy({ where: { id } })
			.then(result => true)
			.catch(err => {
				console.error('Error delete task from MySQL:\n', err);
				return err;
			});
	}

	deleteAllUserTasks(userId) {
		return this.model.destroy({ where: { userId } })
			.then(result => true)
			.catch(err => {
				console.error('Error delete user tasks from MySQL:\n', err);
				return err;
			});
	}
};

module.exports = new Task(TaskSchema);
