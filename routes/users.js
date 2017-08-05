const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  console.log('\n --- GET /users ---');
  console.log('req.cookies:', req.cookies);
  console.log('req.signedCookies:', req.signedCookies);
  console.log('req.body:', req.body);
  
  res.send('users');
});

module.exports = router;
