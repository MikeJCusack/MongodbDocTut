# out: testdb.js
MongoClient = require('mongodb').MongoClient
assert = require 'assert'
url = 'mongodb://localhost:27017/test'

MongoClient.connect url, (err, db) ->
  assert.equal null, err
  console.log "Connected successfully to server."
  db.close()
