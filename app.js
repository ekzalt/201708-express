const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

// parses request cookies to req.cookies
const cookieParser = require('cookie-parser');
// parses json, x-www-form-urlencoded, text
const bodyParser = require('body-parser');
// recomended session middleware
const expressSession = require('express-session');
// recomended compression middleware
const compression = require('compression');

const sessionConfig = require('./config/session.config');
const passport = require('./middleware/passport.strategy');

const pathways = require('./routes/pathways');
const index = require('./routes/index');
const login = require('./routes/login');
const logout = require('./routes/logout');
const news = require('./routes/news');
const registry = require('./routes/registry');
const todo = require('./routes/todo');
const user = require('./routes/user');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

if (app.get('env') === 'development') {
  app.use(logger('dev'));

} else {
  app.use(logger('default'));
  // compression option: compress all responses add all routes
  app.use(compression());
  // expressSession option: trust first proxy, recommended in production
  app.set('trust proxy', 1);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

// /1/2
app.use(pathways.todo, todo);
app.use(pathways.user, user);
// /1
app.use(pathways.registry, registry);
app.use(pathways.login, login);
app.use(pathways.logout, logout);
app.use(pathways.news, news);
// /
app.use(pathways.index, index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
