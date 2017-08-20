const express = require('express');
const router = express.Router();

const log = require('../middleware/log');
const passport = require('../middleware/passport.strategy');

// uncomment here to use database: MongoDB + Mongoose
const users = require('../models/mongoose.users');

// GET registry page

router.get('/', async (req, res, next) => {
  log.info({
    method: req.method,
    url: req.url,
    params: req.params,
    cookies: req.cookies,
    signedCookies: req.signedCookies,
    session: req.session,
    body: req.body
  });

  if (req.isAuthenticated()) {
    res.redirect('/logout');
    return;
  }

  res.render('registry', { title: 'Registry' });
});

// POST registry page

router.post('/', async (req, res, next) => {
  log.info({
    method: req.method,
    url: req.url,
    params: req.params,
    cookies: req.cookies,
    signedCookies: req.signedCookies,
    session: req.session,
    body: req.body
  });

  if (req.isAuthenticated()) {
    res.redirect('/logout');
    return;
  }

  let newUser = {}; // login, password, name, email

  if (req.body.login) {
    let valLogin = req.body.login.trim();
    if (valLogin) newUser.login = valLogin;
  }

  if (req.body.password) {
    let valPassword = req.body.password.trim();
    if (valPassword) newUser.password = valPassword;
  }

  if (req.body.name) {
    let valName = req.body.name.trim();
    if (valName) newUser.name = valName;
  }

  if (req.body.email) {
    let valEmail = req.body.email.trim();
    if (valEmail) newUser.email = valEmail;
  }

  if (!newUser.login || !newUser.password || !newUser.name || !newUser.email) {
    console.error('Error: No value in field');
    res.redirect('/registry');
    return;
  }

  let user;

  try {
    user = await users.createUser(newUser);
    res.redirect('/login');
    return;

  } catch (err) {
    console.error('Error: Task is not saved to DB\n', err);
    res.redirect('/registry');
    return;
  }
});

module.exports = router;
