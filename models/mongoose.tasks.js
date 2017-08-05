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
let exampleOneTask = {
	_id: 0,
	content: 'Some text',
};

let exampleOneUser = {
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
*/

// CRUD

class Task {
	constructor(model) {
		this.model = model;
	}

	showList() {
		// emit: 'Показать все задачи'
		// action: show all tasks
		// GET /todo

		/*
		return this.model.find({}, (err, results) => {
			if (err) {
				console.error('Error read tasks from MongoDB:\n', err);
				return null;
			}

			return results;
		});
		*/

		return this.model.find()
			.then(results => results)
			.catch(err => {
				console.error('Error read tasks from MongoDB:\n', err);
				return err;
			});
	}

	addTask(content) {
		// emit: 'Добавить задачу'
		// action: add new task
		// POST /todo

		/*
		return this.model.create({ content }, (err, result) => {
			if (err) {
				console.error('Error write new task to MongoDB:\n', err);
				return null;
			}

			return result;
		});
		*/

		return this.model.create({ content })
			.then(result => result)
			.catch(err => {
				console.error('Error write new task to MongoDB:\n', err);
				return err;
			});
	}

	changeTask(id, content) {
		// emit: 'Изменить задачу'
		// action: change task content by id
		// PUT /todo/:id

		/*
		return this.model.findByIdAndUpdate(id, { content }, (err, result) => {
			if (err) {
				console.error('Error update task in MongoDB:\n', err);
				return null;
			}

			return result;
		});
		*/

		return this.model.findByIdAndUpdate(id, { content })
			.then(result => result)
			.catch(err => {
				console.error('Error update task in MongoDB:\n', err);
				return err;
			});
	}

	deleteTask(id) {
		// emit: 'Удалить'
		// action: delete task by id
		// DELETE /todo/:id

		/*
		return this.model.findByIdAndRemove(id, err => {
			if (err) {
				console.error('Error delete task from MongoDB:\n', err);
				return null;
			}

			return true;
		});
		*/

		return this.model.findByIdAndRemove(id)
			.then(() => true)
			.catch(err => {
				console.error('Error delete task from MongoDB:\n', err);
				return err;
			});
	}
};

module.exports = new Task(TaskModel);
