var xtend = require('xtend');
var after = require('after');

module.exports = function(db, es) {
  return {

    // create an elastic search index after doc is put in mongodb
    putSongs: function(data, cb) {
      var songs = db.collection('songs');
      songs.insert(data, function(err, result) {
        if (err) throw err;
        var next = after(result.ops.length, cb);
        console.log(result);

        result.ops.forEach(function(op) {
          es.index({
            index: 'songs',
            type: 'songtype',
            id: op._id,
            body: (function(){ var o = xtend(op); delete o._id; return o; })()
          }, next);
        });

      });
    }

  };
};

