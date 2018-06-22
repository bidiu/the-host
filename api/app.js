const http = require('http');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const queryParser = require('./middleware/queries/query-parser');
const notFoundHandler = require('./middleware/errors/not-found');
const apiErrorHandler = require('./middleware/errors/api-errors');
const errorHandler = require('./middleware/errors/errors');
const apiV1 = require('./routes/api-v1');

require('./models/models');
require('./db/mongo');

const app = express();

// global middleware
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(queryParser);

// api v1 route
app.use('/api/v1', apiV1);

// error handlers
app.use(notFoundHandler);
app.use(apiErrorHandler);
app.use(errorHandler);

// create the deamon and listen
http.createServer(app).listen(4010);
