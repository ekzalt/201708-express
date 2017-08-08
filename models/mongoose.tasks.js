// MongoDB + Mongoose code

// const mongodb = require('mongodb');
const mongoose = require('mongoose');

// Use native promises - http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

const config = require('./mongoose.config');

mongoose.connect(config.uri, config.options);

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
