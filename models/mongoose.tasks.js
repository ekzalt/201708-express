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
	_id: '8342ru982u298ru29r2r', // string, default
	userId: '8342ru982u298ru29r2r', // string, required
	content: 'Some text' // string, required
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

	updateTask(id, updates = {}) {
		return this.model.findByIdAndUpdate(id, updates)
			.then(result => result)
			.catch(err => {
				console.error('Error update task in MongoDB:\n', err);
				return err;
			});
	}

	deleteTask(id) {
		return this.model.findByIdAndRemove(id)
			.then(result => true)
			.catch(err => {
				console.error('Error delete task from MongoDB:\n', err);
				return err;
			});
	}

	deleteAllUserTasks(userId) {
		return this.model.remove({ userId })
			.then(result => true)
			.catch(err => {
				console.error('Error delete all user tasks from MongoDB:\n', err);
				return err;
			});
	}
};

module.exports = new Task(TaskModel);
