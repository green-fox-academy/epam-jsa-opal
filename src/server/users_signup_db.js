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

function dbHandler(req, res) {
  let sendContent = {
    'username': ' ',
    'email': '',
    'phone number': '',
    'full name': '',
    'password': '',
  };
  sendContent.username = req.body.username;
  sendContent.email = req.body.email;
  sendContent['phone number'] = req.body['phone number'];
  sendContent['full name'] = req.body['full name'];
  sendContent.password = cryptoJs.crypto(req.body.password);
  MongoClient.connect(url, function(err, db) {
    if (err) {
      mongoConnectErrorHandle(res, db);
      return -1;
    }
    db.collection('user').find({$or: [
      {'username': req.body.username},
      {'email': req.body.email},
      {'phone number': req.body['phone number']},
    ]}).toArray(function(err, items) {
      if (items.length === 0) {
        db.collection('user').insert(sendContent, function() {
          let objectId = sendContent._id;
          res.set('location', '/api/signup/'+objectId);
          res.status(201).send();
          db.close();
          return -1;
        });
      } else if (items[0].username === req.body.username) {
        let obj = {
          'error': 'username conflicts!',
        };
        res.status(409).send(obj);
        db.close();
        return -1;
      } else if (items[0].email === req.body.email) {
        let obj = {
          'error': 'email conflicts!',
        };
        res.status(409).send(obj);
        db.close();
        return -1;
      } else if (items[0]['phone number'] === req.body['phone number']) {
        let obj = {
          'error': 'phone number conflicts!',
        };
        res.status(409).send(obj);
        db.close();
        return -1;
      }
    });
  });
}

module.exports = {
  dbHandler: dbHandler,
};
