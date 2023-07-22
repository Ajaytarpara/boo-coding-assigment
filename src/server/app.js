/**
 * app.js
 * Use `app.js` to run your app.
 * To start the server, run: `node app.js`.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const { authLimiter } = require('./middleware/rateLimiter');
dotenv.config({ path: '.env' });
global.__basedir = __dirname;
const passport = require('passport');
let logger = require('morgan');
const { clientPassportStrategy } = require('./middleware/clientPassportStrategy');
//all routes
const routes = require('../services/index');

const app = express();

/**Need to update */
const corsOptions = { origin: process.env.ALLOW_ORIGIN };
app.use(cors(corsOptions));
//template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

clientPassportStrategy(passport);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(require('../utils/response/responseHandler'));
app.use(routes);
// set security HTTP headers
app.use(helmet());
// sanitize request data
app.use(xss());
app.use(mongoSanitize());


// limit repeated failed requests to auth endpoints
if (process.env.NODE_ENV === 'production') {
  app.use('/', authLimiter);
}

module.exports = app;
