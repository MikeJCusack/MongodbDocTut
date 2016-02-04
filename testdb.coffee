# out: testdb.js
MongoClient = require('mongodb').MongoClient
assert = require 'assert'
ObjectId = require('mongodb').ObjectID
url = 'mongodb://localhost:27017/test'

insertDoc = (db, callback) ->
  db.collection('restaurants').insertOne {
    "address":
      "street": "2 Avenue"
      "zipcode": "10075"
      "building": "1480"
      "coord": [ -73.9557413, 40.7720266 ]
    "borough": "Manhattan"
    "cuisine": "Italian"
    "grades": [
      {
        "date": new Date "2014-10-01T00:00:00Z"
        "grade": "A"
        "score": 11
      }, {
        "date": new Date "2014-01-16T00:00:00Z"
        "grade": "B"
        "score": 17
      }
    ]
    "name": "Vella"
    "restaurant_id": "41704620"
  }, (err, result) ->
    assert.equal null, err
    console.log "Inserted a document into the restaurants collection."
    callback result

findRestaurants = (db, callback) ->
  restaurants = db.collection('restaurants').find(
    "cuisine": "Italian"
    "address.zipcode": "10075"
  )
  restaurants.each (err, doc) ->
    assert.equal null, err
    if doc isnt null then console.dir doc else callback()

MongoClient.connect url, (err, db) ->
  assert.equal null, err
  findRestaurants db, ->
    db.close()
  console.log "All operations completed successfully."
