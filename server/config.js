'use strict';

require('dotenv').config();

const dbUrl = {
  production: process.env.DATABASE_URL,
  development: 'mongodb://localhost/capstone',
  test: 'mongodb://localhost/capstone/test'
};

exports.DATABASE_URL = dbUrl[process.env.NODE_ENV];
exports.TEST_DATABASE_URL = dbUrl.test;
exports.PORT = process.env.PORT || 3001;