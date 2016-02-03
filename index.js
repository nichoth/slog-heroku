require('dotenv').config({ silent: true });
var http = require('http');
var data = require('./data.json');
var mongodb = require('mongodb');

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

      resp.end('</pre>');

    });

  }).listen(process.env.PORT || 8000);
});


