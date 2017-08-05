module.exports = {
  uri: 'mongodb://localhost/test',

  options: {
    useMongoClient: true,
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30
  }
};
