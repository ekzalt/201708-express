const mongoose = require('../db/mongoose.provider');

const taskSchema = mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	}
});

const TaskModel = mongoose.model('Task', taskSchema);

/*
// in MongoDB

let exampleTask = {
	_id: 1, // default
	userId: '1', // required
	content: 'Some text' // required
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
				console.error('Error write new task to MongoDB:\n', err);
				return err;
			});
	}

	readTasks(userId) {
		return this.model.find({ userId })
			.then(results => results)
			.catch(err => {
				console.error('Error read tasks from MongoDB:\n', err);
				return err;
			});
	}

	updateTask(taskId, updates = {}) {
		return this.model.findByIdAndUpdate(taskId, updates)
			.then(result => result)
			.catch(err => {
				console.error('Error update task in MongoDB:\n', err);
				return err;
			});
	}

	deleteTask(taskId) {
		return this.model.findByIdAndRemove(taskId)
			.then(result => result)
			.catch(err => {
				console.error('Error delete task from MongoDB:\n', err);
				return err;
			});
	}
};

module.exports = new Task(TaskModel);
