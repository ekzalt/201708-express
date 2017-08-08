module.exports = {
  database: 'test',
  username: 'root',
  password: 'mysql',

  options: {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },

    define: {
      timestamps: false // true by default
    }
  }
};
