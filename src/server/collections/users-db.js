'use strict';

require('dotenv').config();
const cryptoJs = require('../modules/crypt-data');
const tokensDb = require('../collections/tokens-db');
const RETURN_FAILS = -1;
let protocol = process.env.DB_PROTOCOL;
let host = process.env.DB_HOST;
let port = process.env.DB_PORT;
let name = process.env.DB_NAME;
let username = process.env.Username;
let password = process.env.Password;
let url;

if (password !== undefined) {
  url = protocol + '://' + username + ':' + password + '@' + host + ':' + port + '/' + name;
} else {
  url = protocol + '://' + host + ':' + port + '/' + name;
}
let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;

function createToken(userinfo, userAgent, callback) {
  callback(tokensDb.createToken(userinfo._id, userAgent));
}

function notFound(req, res, db, sendContent) {
  db.collection('users').insert(sendContent, function() {
    let userId = sendContent._id;

    createToken(userId, req.headers['user-agent'], (tokenData) => {
      res.set('location', '/api/users/' + userId);
      res.setHeader('content-type', 'application/json');
      res.status(201).json({
        expiresAt: tokenData.expiresAt,
        token: tokenData.token,
      });
    });

    db.close();
    return RETURN_FAILS;
  });
}

function userNameConflict(res, db, sendContent) {
  let obj = {'error': 'username conflicts!'};

  res.setHeader('content-type', 'application/json');
  res.status(409).send(obj);
  db.close();
  return RETURN_FAILS;
}

function emailConflict(res, db, sendContent) {
  let obj = {'error': 'email conflicts!'};

  res.setHeader('content-type', 'application/json');
  res.status(409).send(obj);
  db.close();
  return RETURN_FAILS;
}

function phoneConflict(res, db, sendContent) {
  let obj = {'error': 'phone number conflicts!'};

  res.setHeader('content-type', 'application/json');
  res.status(409).send(obj);
  db.close();
  return RETURN_FAILS;
}

function mongoConnectErrorHandle(res, db) {
  let obj = {'error': 'Something wrong!'};

  res.setHeader('content-type', 'application/json');
  res.status(500).send(obj);
  db.close();
}

function dbInsert(req, res) {
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
  sendContent.password = cryptoJs.encryptoData(req.body.password);
  MongoClient.connect(url, function(err, db) {
    if (err) {
      mongoConnectErrorHandle(res, db);
      return RETURN_FAILS;
    }
    db.collection('users').find({
      $or: [
        {'username': req.body.username},
        {'email': req.body.email},
        {'phone number': req.body['phone number']},
      ],
    }).toArray(function(err, items) {
      if (err) {
        console.log(err);
        return;
      } else if (items.length === 0) {
        notFound(req, res, db, sendContent);
      } else if (items[0].username === req.body.username) {
        userNameConflict(res, db, sendContent);
      } else if (items[0].email === req.body.email) {
        emailConflict(res, db, sendContent);
      } else if (items[0]['phone number'] === req.body['phone number']) {
        phoneConflict(res, db, sendContent);
      }
    });
  });
}

// find userinfo throw email
function findUserInfo(email, callback) {
  MongoClient.connect(url, (err, db) => {
    try {
      if (err) {
        throw err;
      }
      let usersDB = db.collection('users');

      usersDB.findOne({'email': email}, (err, result) => {
        if (err) {
          console.log(err);
        }
        db.close();
        if (result === null) {
          return callback([]);
        }
        let userinfo = result;

        return callback(userinfo);
      });
    } catch (e) {
      console.log(e.name + ':' + e.message);
      return callback(undefined);
    }
  });
}
module.exports = {
  storeUser: dbInsert,
  findUserInfo: findUserInfo,
};
