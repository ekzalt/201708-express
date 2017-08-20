const mongoose = require('../db/mongoose.provider');

const userSchema = mongoose.Schema({
	login: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	tasks: {
		type: [{ content: String }],
		default: []
	}
});

const UserModel = mongoose.model('User', userSchema);

/*
// in MongoDB
let exampleUser = {
	_id: 1, // default
	login: 'nick', // required
	password: 'nick', // required
	name: 'Nick', // required
	email: 'nick@site.com', // required
	tasks: [] // default

	// advansed
	confirm: false // default - confirm registration by email
	hash: '' // default - crypto generate on server, based on password + secretSignature
	sid: '' // default - user session id, crypto generate on server, based on hash, -> will send to user

	// tasks structure
	tasks: [{
		content: 'Some text 1' // required
	}, {
		content: 'Some text 2' // required
	}, {
		content: 'Some text 3' // required
	}]
};

// in MySQL - 2 tables
let exampleUser = {
	id: 1, // default
	name: 'Alex' // required
};
let exampleTasks = {
	id: 1, // default
	userId: 1, // required
	content: 'Some text', // required
};
*/

// CRUD

class User {
	constructor(model) {
		this.model = model;
	}

	loginUser(query = { login: test, password: test }) {
		return this.model.findOne(query)
			.then(user => {
				return {
					id: user._id,
					login: user.login,
					password: user.password,
					name: user.name,
					email: user.email,
					tasks: user.tasks
				};
			})
			.catch(err => {
				console.error('Error read user from MongoDB:\n', err);
				return err;
			});
	}

	getUser(id) {
		return this.model.findById(id)
			.then(user => {
				return {
					id: user._id,
					login: user.login,
					password: user.password,
					name: user.name,
					email: user.email,
					tasks: user.tasks
				};
			})
			.catch(err => {
				console.error('Error read user from MongoDB:\n', err);
				return err;
			});
	}

	getUserTasks(userId) {
		return this.model.findById(userId)
			.then(user => user.tasks)
			.catch(err => {
				console.error('Error read user from MongoDB:\n', err);
				return err;
			});
	}
	
	createUser(user = {}) { // user === {}
		return this.model.create(user)
			.then(user => true)
			.catch(err => {
				console.error('Error create new user to MongoDB:\n', err);
				return err;
			});
	}

	deleteUser(id) {
		return this.model.findByIdAndRemove(id)
			.then(() => true)
			.catch(err => {
				console.error('Error delete user from MongoDB:\n', err);
				return err;
			});
	}

	updateUser(id, updates = {}) { // updates === {}
		return this.model.findByIdAndUpdate(id, updates)
			.then(user => user)
			.catch(err => {
				console.error('Error update user in MongoDB:\n', err);
				return err;
			});
	}

  /////////////////////////////////

	changeTask(id, content) {
		return this.model.findByIdAndUpdate(id, { content })
			.then(result => result)
			.catch(err => {
				console.error('Error update task in MongoDB:\n', err);
				return err;
			});
	}

	deleteTask(id) {
		return this.model.findByIdAndRemove(id)
			.then(() => true)
			.catch(err => {
				console.error('Error delete task from MongoDB:\n', err);
				return err;
			});
	}
};

module.exports = new User(UserModel);
