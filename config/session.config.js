const genuuid = () => {
  //
};

module.exports = {
  secret: 'secret1', // must be changed in production
  name: 'name1', // must be changed in production, default value is 'connect.sid'
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000 // 1 hour
    // secure: true // recommended in production
  } 
};
