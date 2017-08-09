const express = require('express');
const router = express.Router();

// GET registry page
router.get('/', async (req, res, next) => {
  console.log('\n --- GET /registry ---');
  console.log('req.params:', req.params);
  console.log('req.cookies:', req.cookies);
  console.log('req.signedCookies:', req.signedCookies);
  console.log('req.body:', req.body);
  
  res.render('registry', { title: 'Registry' });
});

// POST registry page
router.post('/', async (req, res, next) => {
  console.log('\n --- POST /registry ---');
  console.log('req.params:', req.params);
  console.log('req.cookies:', req.cookies);
  console.log('req.signedCookies:', req.signedCookies);
  console.log('req.body:', req.body);

  // res.redirect('/');
  res.end();
});

module.exports = router;
