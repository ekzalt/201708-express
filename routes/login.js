const express = require('express');
const router = express.Router();

// GET login page
router.get('/', (req, res, next) => {
  console.log('\n --- GET /login ---');
  console.log('req.params:', req.params);
  console.log('req.cookies:', req.cookies);
  console.log('req.signedCookies:', req.signedCookies);
  console.log('req.body:', req.body);
  
  res.render('login', { title: 'Login' });
});

module.exports = router;
