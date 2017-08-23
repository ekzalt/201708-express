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
};
*/

// user CRUD

class User {
	constructor(model) {
		this.model = model;
	}

	createUser(user = {}) {
		return this.model.create(user)
			.then(user => user)
			.catch(err => {
				console.error('Error create new user to MongoDB:\n', err);
				return err;
			});
	}

	loginUser(query = { login: 'anonymous', password: 'anonymous' }) {
		return this.model.findOne(query)
			.then(user => user)
			.catch(err => {
				console.error('Error read user from MongoDB:\n', err);
				return err;
			});
	}

	readUser(id) {
		return this.model.findById(id)
			.then(user => user)
			.catch(err => {
				console.error('Error read user from MongoDB:\n', err);
				return err;
			});
	}

	updateUser(id, updates = {}) {
		return this.model.findByIdAndUpdate(id, updates)
			.then(user => user)
			.catch(err => {
				console.error('Error update user in MongoDB:\n', err);
				return err;
			});
	}

	deleteUser(id) {
		return this.model.findByIdAndRemove(id)
			.then(user => user)
			.catch(err => {
				console.error('Error delete user from MongoDB:\n', err);
				return err;
			});
	}
};

module.exports = new User(UserModel);
