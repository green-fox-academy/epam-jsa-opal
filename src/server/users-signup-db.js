require('dotenv').config();
const cryptoJs = require('./crypto.js');
let bodyParser = require('body-parser');
const express = require('express');
let protocol = process.env.DB_PROTOCOL;
let host = process.env.DB_HOST;
let port = process.env.DB_PORT;
let name = process.env.DB_NAME;
let url = protocol + '://' + host + ':' +port+ '/' + name;
const app = express();
let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('dist'));


function mongoConnectErrorHandle(res, db) {
  let obj = {
    'error': 'Something wrong!',
  };
  res.status(500).send(obj);
  db.close();
}

function findUserName(res, db) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      mongoConnectErrorHandle(res, db);
      return -1;
    }
    db.collection('user').find({'username': req.body.username})
      .toArray(function(err, items) {
        if (items.length !== 0) {
          let obj = {
            'error': 'username conflicts!',
          };
          res.status(409).send(obj);
          db.close();
          return -1;
        }
        db.close();
      });
  });
}
