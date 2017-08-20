const express = require('express');
const router = express.Router();

const log = require('../middleware/log');
const passport = require('../middleware/passport.strategy');

// GET logout page

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

  /*
  // /logout action
  req.session.destroy(function(err) {
    // cannot access session here
  });
  */

  req.logout();
  res.redirect('/');
});

module.exports = router;
