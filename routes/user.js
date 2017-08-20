const express = require('express');
const router = express.Router();

const log = require('../middleware/log');
const passport = require('../middleware/passport.strategy');

// uncomment here to use database: MongoDB + Mongoose
const users = require('../models/mongoose.users');

/*
прочитать, изменить, удалить (добавить - через регистрацию)

get user id
put user id -> update -> redirect /user:id
delete user id -> delete, clear session -> redirect /logout
*/

let messages = {
  actionError: '',
  loadError: '',
  actionSuccess: ''
};

let defaultUser = {
  login: 'anonymous',
  password: 'anonymous',
  name: 'Anonymous',
  email: 'anonymous@mysite.com',
  tasks: []
};

const checkAuth = (req, res, next) => {
	req.isAuthenticated() ? next() : res.redirect('/login');
};

router.all('/*', checkAuth);
router.all('/', checkAuth);

// GET user page

/*
passport.authenticate('local', {
  failureRedirect: '/login',
})
*/

router.get('/:id', async (req, res, next) => {
  log.info({
    method: req.method,
    url: req.url,
    params: req.params,
    cookies: req.cookies,
    signedCookies: req.signedCookies,
    session: req.session,
    body: req.body
  });

  let user;

  try {
    user = await users.getUser(req.params.id);

  } catch (err) {
    console.error('Error: No user loaded from DB\n', err);
    messages.loadError = 'Ошибка: данные пользователя не получены.';
  }

  res.render('user', {
    actionError: messages.actionError,
    loadError: messages.loadError,
    actionSuccess: messages.actionSuccess,
    title: 'User',
    user: user || defaultUser
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
    body: req.body
  });

  let user;

  try {
    user = await users.deleteUser(req.params.id);
    messages.actionSuccess = 'Пользователь успешно удален.';

  } catch (err) {
    console.error('Error: User is not deleted from DB\n', err);
    messages.actionError = 'Ошибка: пользователь не удален.';
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
    body: req.body
  });

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
    res.redirect(`/user/${req.params.id}`);
    return;
  }

  let user;

  try {
    user = await users.updateUser(req.params.id, updates);
    messages.actionSuccess = 'Данные пользователя успешно обновлены.';

  } catch (err) {
    console.error('Error: User is not updated in DB\n', err);
    messages.actionError = 'Ошибка: данные пользователя не обновлены.';
  }

  res.redirect(`/user/${req.params.id}`);
});

module.exports = router;
