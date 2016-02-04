(function() {
  var MongoClient, assert, url;

  MongoClient = require('mongodb').MongoClient;

  assert = require('assert');

  url = 'mongodb://localhost:27017/test';

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server.");
    return db.close();
  });

}).call(this);
