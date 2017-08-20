const mongoose = require('../db/mongoose.provider');

const taskSchema = mongoose.Schema({
	content: {
		type: String,
		required: true
	}
});

const TaskModel = mongoose.model('Task', taskSchema);

/*
// in MongoDB
let exampleTask = {
	_id: 0, // default
	content: 'Some text', // required
};
*/

// CRUD

class Task {
	constructor(model) {
		this.model = model;
	}

	showList() {
		/*
		// callback way
		return this.model.find({}, (err, results) => {
			if (err) {
				console.error('Error read tasks from MongoDB:\n', err);
				return err;
			}

			return results;
		});
		*/

		// promise way
		return this.model.find()
			.then(results => results)
			.catch(err => {
				console.error('Error read tasks from MongoDB:\n', err);
				return err;
			});
	}

	addTask(content) {
		/*
		// callback way
		return this.model.create({ content }, (err, result) => {
			if (err) {
				console.error('Error write new task to MongoDB:\n', err);
				return err;
			}

			return result;
		});
		*/

		// promise way
		return this.model.create({ content })
			.then(result => result)
			.catch(err => {
				console.error('Error write new task to MongoDB:\n', err);
				return err;
			});
	}

	changeTask(id, content) {
		/*
		// callback way
		return this.model.findByIdAndUpdate(id, { content }, (err, result) => {
			if (err) {
				console.error('Error update task in MongoDB:\n', err);
				return err;
			}

			return result;
		});
		*/

		// promise way
		return this.model.findByIdAndUpdate(id, { content })
			.then(result => result)
			.catch(err => {
				console.error('Error update task in MongoDB:\n', err);
				return err;
			});
	}

	deleteTask(id) {
		/*
		// callback way
		return this.model.findByIdAndRemove(id, err => {
			if (err) {
				console.error('Error delete task from MongoDB:\n', err);
				return err;
			}

			return true;
		});
		*/

		// promise way
		return this.model.findByIdAndRemove(id)
			.then(() => true)
			.catch(err => {
				console.error('Error delete task from MongoDB:\n', err);
				return err;
			});
	}
};

module.exports = new Task(TaskModel);
