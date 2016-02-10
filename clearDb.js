require('dotenv').config({ silent: true });
var mongodb = require('mongodb');
var URI = process.env.MONGOLAB_URI;

mongodb.MongoClient.connect(URI, function(err, db) {
  if (err) { throw err; }

  var songs = db.collection('songs');
  songs.remove({}, function(err, res) {
    if (err) throw err;
    console.log('great');
    db.close();
  });
});
