const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

const MongoClient = require('mongodb').MongoClient;

const dbUrl = process.env.DB;
const port = process.env.PORT;

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
