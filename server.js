var bodyParser = require('body-parser');
var express = require('express');
var mongodb = require('mongodb')
var morgan = require('morgan');
var validUrl = require('valid-url');

var app = express();

var MongoClient = require('mongodb').MongoClient;

var dbUrl = process.env.DB;
var root = process.env.ROOT;
var port = process.env.PORT;

app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static(__dirname + '/public/styles'));
app.use('/css', express.static(__dirname + '/public/styles'))
app.use(morgan('dev'));
app.use(bodyParser());

app.get('/', function(req, res) {
  res.render('index');
})

app.post('/new/:url(*)', function(req, res) {
  MongoClient.connect(dbUrl, function(err, db) {
    if (err) {
      console.log('Could not connect to server', err)
    }
    else {
      var collection = db.collection('shorturl');
      var params = req.body.url;
      if (validUrl.isUri(params)) {
        console.log('Uri is good');
        var itemId = Math.floor(Math.random() * 10000);
        var shortenedURL = root + itemId;
        var insertedItem = {
          _id: itemId.toString(),
          shortUrl: shortenedURL,
          originalUrl: params
        }
        collection.insert(insertedItem);
        res.render('index', {
          originalUrl: params,
          URL: shortenedURL
        });
      }
      else {
        res.render('index', {URL: 'URL not recognized - please use a properly formatted URL'})
      }
    }
    db.close();
  })
})

app.listen(port);
