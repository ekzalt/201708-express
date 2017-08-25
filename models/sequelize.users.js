const Sequelize = require('sequelize');

const sequelize = require('../db/sequelize.provider');

const UserSchema = sequelize.define('user', {
  login: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
});

/*
// in MySQL
let exampleUser = {
	id: 1, // number integer, default
	login: 'nick', // string, handle required, handle unique
	password: 'nick', // string, handle required
	name: 'Nick', // string, handle required
	email: 'nick@site.com' // string, handle required
};
*/

// user CRUD

class User {
  constructor(model) {
    this.model = model;
  }

  createUser(user = {}) {
    // handle unique login
    return this.model.findOne({ where: { login: user.login } })
      .then(result => {
        if (result) Promise.reject('User with such login already exists');
      })
      .then(() => this.model.create(user))
      .then(result => result)
      .catch(err => {
        console.error('Error write new user to MySQL:\n', err);
        return err;
      });

    /*
    // without handle unique login
    return this.model.create(user)
      .then(result => result)
      .catch(err => {
        console.error('Error write new user to MySQL:\n', err);
        return err;
      });
    */
  }

  loginUser(query = { login: 'anonymous', password: 'anonymous' }) {
    return this.model.findOne({ where: query })
      .then(result => {
        if (!result) return Promise.reject('User not found');
        return result;
      })
      .catch(err => {
        console.error('Error read user from MySQL:\n', err);
        return err;
      });
  }

  readUser(id) {
    return this.model.findOne({ where: { id } })
      .then(result => {
        if (!result) return Promise.reject('User not found');
        return result;
      })
      .catch(err => {
        console.error('Error read user from MySQL:\n', err);
        return err;
      });
  }

  updateUser(id, updates = {}) {
    return this.model.update(updates, {
      where: { id }
    })
      .then(result => result)
      .catch(err => {
        console.error('Error update user in MySQL:\n', err);
        return err;
      });
  }

  deleteUser(id) {
    return this.model.destroy({
      where: { id }
    })
      .then(result => true)
      .catch(err => {
        console.error('Error delete user from MySQL:\n', err);
        return err;
      });
  }
};

module.exports = new User(UserSchema);
