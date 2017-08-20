const bunyan = require('bunyan');

const log = bunyan.createLogger({
  name: 'myapp',
  streams: [{
    level: 'info',
    // log INFO to stdout - development
    stream: process.stdout
  }, {
    level: 'error',
    // uncomment here to log ERROR to stderr - development
    stream: process.stderr
    // uncomment here to log ERROR to a file - production
    // path: '/var/tmp/myapp-error.log'
  }]
});

module.exports = log;
