const Sequelize = require('sequelize');

const sequelize = require('../db/sequelize.provider');

// First model
const TaskSchema = sequelize.define('task', {
	content: {
		type: Sequelize.STRING
	}
});

/*
// in MySQL
let exampleTask = {
	id: 0, // default
	content: 'Some text', // required
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
