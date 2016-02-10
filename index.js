require('dotenv').config({ silent: true });
var http = require('http');
var data = require('./data.json');
var mongodb = require('mongodb');
var es = require('elasticsearch');
var client = new es.Client({
  host: process.env.SEARCHBOX_URL
});
var URI = process.env.MONGOLAB_URI;

mongodb.MongoClient.connect(URI, function(err, db) {

  if (err) { return console.log(err); }

  var server = http.createServer(function(req, resp) {
    resp.setHeader('Content-Type', 'text/html');
    resp.write('<pre>');

    var songs = db.collection('songs');
    songs.find({}).toArray(function(err, docs) {

      if (err) {
        return console.log(err);
      }

      resp.write('docs: '+docs.length);
      resp.write('\n');
      resp.write(JSON.stringify(docs, null, 2));


      // elastic search
      resp.write('\n\nelastic search\n--------------\n');
      client.search({}, function(err, res) {
        resp.write(JSON.stringify(res, null, 2));
        resp.end('</pre>');
      });

    });

  }).listen(process.env.PORT || 8000);
});


