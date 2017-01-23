const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

const MongoClient = require('mongodb').MongoClient;

const dbUrl = process.env.DB || 'mongodb://127.0.0.1:27017/shorturl';
const port = process.env.PORT || 3000;

app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static(__dirname + '/public/styles'));
app.use('/css', express.static(__dirname + '/public/styles'))
app.use(morgan('combined', { skip: (req, res) => {return res.statusCode < 400}}));
app.use(bodyParser());

mongoose.connect(dbUrl)

const indexRoutes = require ('./routes/indexRoutes.js')

app.use('/', indexRoutes)

app.listen(port);
