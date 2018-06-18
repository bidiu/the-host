const http = require('http');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const queryParser = require('./middleware/queries/query-parser');
const apiV1 = require('./routes/api-v1');

require('./models/models');
require('./db/mongo');

const app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(queryParser);

app.use('/api/v1', apiV1);

http.createServer(app).listen(4010);
