const express = require('express');
const router = express.Router();

const log = require('../utils/log');
const passport = require('../middleware/passport.strategy');
const checkAuth = require('../middleware/passport.checkAuth');

const { users, tasks } = require('../models');

/*
get user id
put user id -> update -> redirect /user:id
delete user id -> delete, clear session -> redirect /logout
*/

let messages = {
  actionError: '',
  loadError: '',
  actionSuccess: ''
};

router.all('/*', checkAuth);
router.all('/', checkAuth);

// GET user page

/*
passport.authenticate('local', {
  failureRedirect: '/login',
})
*/

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

  res.render('user', {
    messages: messages,
    title: 'User',
    user: req.user // {} || undefined
  });

  messages.actionError = messages.loadError = messages.actionSuccess = '';
});

// DELETE user page

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

  let userId = req.user._id || req.user.id;

  if (req.params.id != userId) {
    console.error(`Error Bad Request! req.params.id: ${req.params.id} != userId: ${userId}`);
    res.end();
    return;
  }

  let todos;
  let user;

  try {
    todos = await tasks.deleteAllUserTasks(userId);
    user = await users.deleteUser(userId);
    // messages.actionSuccess = 'Пользователь успешно удален.';

  } catch (err) {
    console.error('Error: User data is not deleted from DB\n', err);
    // messages.actionError = 'Ошибка: пользователь не удален.';
  }

  res.redirect('/logout');
});

// PUT user page

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

  let userId = req.user._id || req.user.id;

  if (req.params.id != userId) {
    console.error(`Error Bad Request! req.params.id: ${req.params.id} != userId: ${userId}`);
    res.end();
    return;
  }

  let updates = {}; // password, name, email

  if (req.body.password) {
    let valPassword = req.body.password.trim();
    if (valPassword) updates.password = valPassword;
  }

  if (req.body.name) {
    let valName = req.body.name.trim();
    if (valName) updates.name = valName;
  }

  if (req.body.email) {
    let valEmail = req.body.email.trim();
    if (valEmail) updates.email = valEmail;
  }

  if (!updates.password && !updates.name && !updates.email) {
    console.error('Error: No values in updates');
    res.end();
    return;
  }

  let user;

  try {
    user = await users.updateUser(userId, updates);
    messages.actionSuccess = 'Данные пользователя успешно обновлены.';

  } catch (err) {
    console.error('Error: User is not updated in DB\n', err);
    messages.actionError = 'Ошибка: данные пользователя не обновлены.';
  }

  res.redirect('/user');
});

module.exports = router;
