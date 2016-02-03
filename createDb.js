var mongodb = require('mongodb');
var URI = process.env.MONGOLAB_URI;
var data = require('./data.json');

mongodb.MongoClient.connect(URI, function(err, db) {
  if (err) { throw err; }

  var songs = db.collection('songs');
  songs.insert(data, function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
