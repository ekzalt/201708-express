const express = require('express');
const router = express.Router();

const log = require('../middleware/log');
const passport = require('../middleware/passport.strategy');
const checkAuth = require('../middleware/passport.checkAuth');

// uncomment here to use database: MongoDB + Mongoose
const tasks = require('../models/mongoose.tasks');

// uncomment here to use database: MySQL + Sequelize
// const tasks = require('../models/sequelize.tasks');

/*
let todos = [{
  id: 0,
  userId: '123',
  content: 'Выучить верстку HTML/CSS'
}, {
  id: 1,
  userId: '123',
  content: 'Выучить JavaScript'
}, {
  id: 2,
  userId: '123',
  content: 'Выучить Node.js'
}, {
  id: 3,
  userId: '123',
  content: 'Выучить PHP/SQL'
}];
*/

let messages = {
  actionError: '',
  loadError: '',
  actionSuccess: ''
};

router.all('/*', checkAuth);
router.all('/', checkAuth);

// GET todo page

router.get('/', async (req, res, next) => {
  log.info({
    method: req.method,
    url: req.url,
    params: req.params,
    cookies: req.cookies,
    signedCookies: req.signedCookies,
    session: req.session,
    user: req.user,
    body: req.body
  });

  let todos;

  try {
    todos = await tasks.readTasks(req.user._id || req.user.id);

  } catch (err) {
    console.error('Error: No data loaded from DB\n', err);
    messages.loadError = 'Ошибка: список задач не получен.';
  }

  res.render('todo', {
    messages: messages,
    title: 'ToDo',
    user: req.user, // {} || undefined
    tasks: todos
  });

  messages.actionError = messages.loadError = messages.actionSuccess = '';
});

// POST todo page

router.post('/', async (req, res, next) => {
  log.info({
    method: req.method,
    url: req.url,
    params: req.params,
    cookies: req.cookies,
    signedCookies: req.signedCookies,
    session: req.session,
    user: req.user,
    body: req.body
  });

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

  let content = req.body.task.trim();

  if (!content) {
    console.error('Error: No value in task');
    res.end();
    return;
  }

  let todo;

  try {
    todo = await tasks.createTask(req.user._id || req.user.id, content);
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
  log.info({
    method: req.method,
    url: req.url,
    params: req.params,
    cookies: req.cookies,
    signedCookies: req.signedCookies,
    session: req.session,
    user: req.user,
    body: req.body
  });

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
  log.info({
    method: req.method,
    url: req.url,
    params: req.params,
    cookies: req.cookies,
    signedCookies: req.signedCookies,
    session: req.session,
    user: req.user,
    body: req.body
  });

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

  let updates = {}; // userId, content

  if (req.body.task) {
    let valTask = req.body.task.trim();
    if (valTask) updates.content = valTask;
  }

  if (!updates.content) {
    console.error('Error: No values in updates');
    res.end();
    return;
  }

  let todo;

  try {
    todo = await tasks.updateTask(req.params.id, updates);
    messages.actionSuccess = 'Задача успешно изменена.';

  } catch (err) {
    console.error('Error: Task is not updated in DB\n', err);
    messages.actionError = 'Ошибка: задача не изменена.';
  }

  // res.redirect('/todo');
  res.end();
});

module.exports = router;
