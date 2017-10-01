const express = require('express');
const router = express.Router();

const log = require('../utils/log');
const passport = require('../middleware/passport.strategy');

// GET login page

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), async (req, res, next) => {
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
  
  res.redirect('/');
});

router.get('/facebook', passport.authenticate('facebook'));

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

  if (req.isAuthenticated()) {
    res.redirect('/logout');
    return;
  }

  res.render('login', { title: 'Login' });
});

// POST login page

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router;
