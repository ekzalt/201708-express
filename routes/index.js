const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('\n --- GET / ---');
  console.log('req.cookies:', req.cookies);
  console.log('req.signedCookies:', req.signedCookies);
  console.log('req.body:', req.body);
  
  res.render('index', { title: 'Home' });
});

module.exports = router;
