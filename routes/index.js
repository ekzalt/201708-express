const express = require('express');
const router = express.Router();

const log = require('../middleware/log');
const passport = require('../middleware/passport.strategy');

// uncomment here to use database: MongoDB + Mongoose
const users = require('../models/mongoose.users');

// GET home page

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

  if (req.isAuthenticated() && req.user) {
    if (req.user.id) {
      let user;

      try {
        user = await users.getUser(req.user.id);
        res.render('index', {
          title: 'Home',
          user: user
        });
        return;

      } catch (err) {
        console.error('Error: No user loaded from DB\n', err);
        res.redirect('/logout');
        return;
      }
    }
  }

  res.render('index', {
    title: 'Home',
    user: null
  });
});

module.exports = router;
