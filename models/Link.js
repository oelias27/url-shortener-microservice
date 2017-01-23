const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = new Schema({
  key: String,
  shortUrl: String,
  originalUrl: String
}, {collection: 'shorturl'});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link
