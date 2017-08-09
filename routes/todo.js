const express = require('express');
const router = express.Router();

// uncomment here to use database: MongoDB + Mongoose
const tasks = require('../models/mongoose.tasks');

// uncomment here to use database: MySQL + Sequelize
// const tasks = require('../models/sequelize.tasks');

/*
let todos = [{
  _id: 0,
  content: 'Выучить верстку HTML/CSS'
}, {
  _id: 1,
  content: 'Выучить JavaScript'
}, {
  _id: 2,
  content: 'Выучить Node.js'
}, {
  _id: 3,
  content: 'Выучить PHP/SQL'
}];
*/

let messages = {
  actionError: '',
  loadError: '',
  actionSuccess: ''
};

// GET todo page
router.get('/', async (req, res, next) => {
  console.log('\n --- GET /todo ---');
  console.log('req.params:', req.params);
  console.log('req.cookies:', req.cookies);
  console.log('req.signedCookies:', req.signedCookies);
  console.log('req.body:', req.body);

  /*
  res.render('todo', {
    error: null,
    success: null,
    title: 'ToDo',
    todos: todos
  });
  */

  let todos;

  try {
    todos = await tasks.showList();

  } catch (err) {
    console.error('Error: No data loaded from DB\n', err);
    messages.loadError = 'Ошибка: список задач не получен.';
  }

  res.render('todo', {
    actionError: messages.actionError,
    loadError: messages.loadError,
    actionSuccess: messages.actionSuccess,
    title: 'ToDo',
    todos: todos || []
  });

  messages.actionError = messages.loadError = messages.actionSuccess = '';
});

// POST todo page
router.post('/', async (req, res, next) => {
  console.log('\n --- POST /todo ---');
  console.log('req.params:', req.params);
  console.log('req.cookies:', req.cookies);
  console.log('req.signedCookies:', req.signedCookies);
  console.log('req.body:', req.body);

  /*
  let val = req.body.task.trim();

  if (val) {
    todos.push({
      _id: todos.length,
      content: val
    });
  }

  res.redirect('/todo');
  */

  let val = req.body.task.trim();

  if (!val) {
    console.error('Error: No value in task');
    res.redirect('/todo');
    return;
  }

  let todo;

  try {
    todo = await tasks.addTask(val);
    messages.actionSuccess = 'Задача успешно добавлена.';

  } catch (err) {
    console.error('Error: Task is not saved to DB\n', err);
    messages.actionError = 'Ошибка: задача не сохранена.';
  }

  // res.redirect('/todo');
  res.end();
});

// DELETE todo page
router.delete('/:id', async (req, res, next) => {
  console.log('\n --- DELETE /todo/:id ---');
  console.log('req.params:', req.params);
  console.log('req.cookies:', req.cookies);
  console.log('req.signedCookies:', req.signedCookies);
  console.log('req.body:', req.body);

  /*
  todos.forEach((task, i) => {
    if (task._id == req.params.id) {
      todos.splice(i, 1);
      return;
    }
  });

  res.redirect('/todo');
  */

  let todo;

  try {
    todo = await tasks.deleteTask(req.params.id);
    messages.actionSuccess = 'Задача успешно удалена.';

  } catch (err) {
    console.error('Error: Task is not deleted from DB\n', err);
    messages.actionError = 'Ошибка: задача не удалена.';
  }

  // res.redirect('/todo');
  res.end();
});

// PUT todo page
router.put('/:id', async (req, res, next) => {
  console.log('\n --- PUT /todo/:id ---');
  console.log('req.params:', req.params);
  console.log('req.cookies:', req.cookies);
  console.log('req.signedCookies:', req.signedCookies);
  console.log('req.body:', req.body);

  /*
  let val = req.body.task.trim();

  if (val) {
    todos.forEach((task, i) => {
      if (task._id == req.params.id) {
        task.content = req.body.task;
        return;
      }
    });
  }

  res.redirect('/todo');
  */

  let val = req.body.task.trim();

  if (!val) {
    console.error('Error: No value in task');
    res.redirect('/todo');
    return;
  }

  let todo;

  try {
    todo = await tasks.changeTask(req.params.id, val);
    messages.actionSuccess = 'Задача успешно изменена.';

  } catch (err) {
    console.error('Error: Task is not updated in DB\n', err);
    messages.actionError = 'Ошибка: задача не изменена.';
  }

  // res.redirect('/todo');
  res.end();
});

module.exports = router;
