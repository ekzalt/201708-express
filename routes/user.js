const express = require('express');
const router = express.Router();

// GET user page
router.get('/', (req, res, next) => {
  console.log('\n --- GET /users ---');
  console.log('req.cookies:', req.cookies);
  console.log('req.signedCookies:', req.signedCookies);
  console.log('req.body:', req.body);
  
  res.send('user');
});

module.exports = router;
