require('dotenv').config({ silent: true });
var elasticsearch = require('elasticsearch');
var data = require('./data.json');
var xtend = require('xtend');

var connectionString = process.env.SEARCHBOX_URL;

var client = new elasticsearch.Client({
  host: connectionString
});

data.forEach(function(d, i) {
  client.index({
    index: 'songs',
    type: 'songstype',
    id: i,
    body: d
  }, console.log);
});
