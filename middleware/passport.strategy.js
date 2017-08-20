const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = require('../models/mongoose.users');

passport.use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password'

}, (username, password, done) => {
  /* 
  users.loginUser(username, (err, user) => {
    if (err) return done(err);

    if (!user) return done(null, false, { message: 'Incorrect username.' });

    if (!user.validPassword(password)) return done(null, false, { message: 'Incorrect password.' });

    return done(null, user);
  });
  */

  users.loginUser({ login: username, password: password })
    .then(user => {
      if (!user) return done(null, false, { message: 'Incorrect login or password.' });

      return done(null, user);
    })
    .catch(err => done(err));
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  users.getUser(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});

module.exports = passport;