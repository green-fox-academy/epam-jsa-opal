'use strict';
let mongodb = require('mongodb');
let mongoClient = mongodb.MongoClient;
let ObjectID = require('mongodb').ObjectID;
let url = 'mongodb://localhost:27017/epam';
mongoClient.connect(url, function(err, db) {
  if (err) {
    console.log('can not connect to the mongodb server');
  }
  console.log('connected to the server '+url);
  insertData(db, function(result) {
    console.log(result);
  });
  db.close();
});

function insertData(db, consoleFunction) {
  let collection = db.collection('user');
  let data = [
    {
      'username': 'haochenli',
      'email': 'lihaohen@qq.com',
      'phone number': '139981232',
      'full name': 'haochenli',
      'password': 'abcdefg',
    },
  ];

  collection.insert(data, function() {
    return consoleFunction;
  });
}
