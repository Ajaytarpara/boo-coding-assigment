const dotenv = require('dotenv');
dotenv.config();

const config = {
  default: {
    PORT: process.env.PORT,
    JWT_CLIENT_SECRET: process.env.JWT_CLIENT_SECRET,
    ALLOW_ORIGIN: process.env.ALLOW_ORIGIN,
    NODE_ENV: process.env.NODE_ENV
  },
  development: {},
  testing: {},
  staging: {},
  production: {},
};

module.exports = config;
