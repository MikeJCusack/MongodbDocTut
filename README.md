# MongodbDocTut

## Start mongod
`mongod --port 27017 --dbpath=./data`

## Populate test db
`mongoimport --db test --collection restaurants --drop --file primer-dataset.json`
