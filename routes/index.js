const express = require('express');
const router = express.Router();

const log = require('../middleware/log');
const passport = require('../middleware/passport.strategy');

// GET home page

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

  res.render('index', {
    title: 'Home',
    user: req.user // {} || undefined
  });
});

module.exports = router;
