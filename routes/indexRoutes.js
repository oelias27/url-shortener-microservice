const express = require('express');
const validUrl = require('valid-url');
const router = express.Router();

const root = process.env.ROOT;

const generator = require('../services/keyGenerator.js');
const Link = require('../models/Link');

// Index
router.get('/', function(req, res) {
  res.render('index');
})

// Add a new url. If url has been shortened, send existing url to user
router.post('/new/:url(*)', (req, res) => {
  let originalUrl = req.body.url;

  if (validUrl.isUri(originalUrl)) {
    Link.findOne({originalUrl}, (err, doc) => {
      if (doc !== null) {
        console.log(doc)
        res.render('index', {
          originalUrl: originalUrl,
          URL: doc.shortUrl
        })
      }
      else {
        let key = generator(7);
        let shortUrl =  root + '/' + key;
        let newShortUrl = new Link({
          key,
          shortUrl,
          originalUrl
        })

        newShortUrl.save((err, short) => {
          if (err) {
            res.render('index', {error: err})
          }
          else {
            res.render('index', {
              originalUrl: originalUrl,
              URL: short.shortUrl
            })
          }
        })
      }
    })
  }
  else {
    res.render('index', {
      error: 'Please enter a valid URL'
    })
  }
})

// Redirect using shortened url
router.get('/:short', (req, res) => {
  let params = req.params.short;

  Link.findOne({key: params}, (err, doc) => {
    if (doc != null) {
      res.redirect(doc.originalUrl);
    }
    else {
      res.render('index', {error: 'Could not find shortened URL'})
    }
  })
})

// Handle undefined routes
router.get('*', function(req, res){
  res.render('index');
});


module.exports = router;
