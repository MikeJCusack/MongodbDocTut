(function() {
  var MongoClient, ObjectId, assert, findRestaurants, insertDoc, updateRestaurant, url;

  MongoClient = require('mongodb').MongoClient;

  assert = require('assert');

  ObjectId = require('mongodb').ObjectID;

  url = 'mongodb://localhost:27017/test';

  insertDoc = function(db, callback) {
    return db.collection('restaurants').insertOne({
      "address": {
        "street": "2 Avenue",
        "zipcode": "10075",
        "building": "1480",
        "coord": [-73.9557413, 40.7720266]
      },
      "borough": "Manhattan",
      "cuisine": "Italian",
      "grades": [
        {
          "date": new Date("2014-10-01T00:00:00Z"),
          "grade": "A",
          "score": 11
        }, {
          "date": new Date("2014-01-16T00:00:00Z"),
          "grade": "B",
          "score": 17
        }
      ],
      "name": "Vella",
      "restaurant_id": "41704620"
    }, function(err, result) {
      assert.equal(null, err);
      console.log("Inserted a document into the restaurants collection.");
      return callback(result);
    });
  };

  findRestaurants = function(db, callback) {
    var restaurants;
    restaurants = db.collection('restaurants').find({
      "cuisine": "Italian",
      "grades.grade": "A"
    }).sort({
      "borough": 1,
      "address.zipcode": 1
    });
    return restaurants.each(function(err, doc) {
      assert.equal(null, err);
      if (doc !== null) {
        return console.dir(doc);
      } else {
        return callback();
      }
    });
  };

  updateRestaurant = function(db, callback) {
    return db.collection('restaurants').replaceOne({
      "restaurant_id": "41704620"
    }, {
      "name": "Vella 2",
      "address": {
        "coord": [-73.9557413, 40.7720266],
        "building": 1480,
        "street": "2 Avenue",
        "zipcode": "10075"
      }
    }, function(err, results) {
      if (err) {
        console.error(err);
      }
      console.log(results);
      return callback();
    });
  };

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    updateRestaurant(db, function() {
      return db.close();
    });
    return console.log("All operations completed successfully.");
  });

}).call(this);
