const http = require('http');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const queryParser = require('./middleware/queries/query-parser');
const session = require('express-session');
const notFoundHandler = require('./middleware/errors/not-found');
const validationErrorHandler = require('./middleware/errors/validation-errors');
const mongoErrorHandler = require('./middleware/errors/mongo-errors');
const apiErrorHandler = require('./middleware/errors/api-errors');
const errorHandler = require('./middleware/errors/errors');
const apiV1 = require('./routes/api-v1');
const env = require('./env/env');

require('./models/models');
require('./db/mongo');

const app = express();

// global middleware
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(queryParser);
app.use(session({ secret: env.secret }));

// api v1 route
app.use('/api/v1', apiV1);

// error handlers
app.use(notFoundHandler);
app.use(validationErrorHandler);
app.use(mongoErrorHandler);
app.use(apiErrorHandler);
app.use(errorHandler);

// create the deamon and listen
http.createServer(app).listen(4010);
