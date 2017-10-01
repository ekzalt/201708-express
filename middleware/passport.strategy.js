const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const { users } = require('../models');
const facebookConfig = require('../config/facebook.config');

// LocalStrategy
passport.use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password'

}, (login, password, done) => {
  /* 
  users.loginUser(username, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    if (!user.validPassword(password)) return done(null, false, { message: 'Incorrect password.' });
    return done(null, user);
  });
  */

  login = login.trim();
  password = password.trim();

  if (!login || !password) {
    console.error('Error: No values in auth passport');
    return done(null, false, { message: 'Incorrect login or password.' });
  }

  users.loginUser({ login, password })
    .then(user => {
      if (!user) return done(null, false, { message: 'Incorrect login or password.' });

      return done(null, user);
    })
    .catch(err => done(err));
}));

// FacebookStrategy
passport.use(new FacebookStrategy({
  clientID: facebookConfig.clientID,
  clientSecret: facebookConfig.clientSecret,
  callbackURL: 'http://localhost:3000/login/facebook/callback'

}, (accessToken, refreshToken, profile, done) => { // profile = { id'', username'', displayName'', emails[], ...etc }
  console.log('userProfileFacebook:\n', profile);

  users.findOrCreateUser({
    login: profile.username.toLowerCase() || 'userfacebook',
    password: profile.username.toLowerCase() || 'userfacebook',
    name: profile.displayName || 'UserFacebook',
    email: profile.emails[0].value || 'userfacebook@.site.com'
  })
    .then(user => {
      if (!user) return done(null, false);

      return done(null, user);
    })
    .catch(err => done(err));
}));

passport.serializeUser((user, done) => {
  done(null, user._id || user.id);
});

passport.deserializeUser((id, done) => {
  users.readUser(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});

module.exports = passport;
