'use strict';
const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const db = require('./db');

console.log(process.env.DB_URL);
app.use(express.static('dist'));
app.get('/heartbeat', (req, res) => {
  let MongoClient = require('mongodb').MongoClient;
  let protocol = process.env.DB_PROTOCOL;
  let host = process.env.DB_HOST;
  let port = process.env.DB_PORT;
  let name = process.env.DB_NAME;
  let url = protocol+'://' + host+':' + port + '/' + name;
  MongoClient.connect(url, function(err, db) {
    let adminDb = db.admin();
    adminDb.serverStatus(function(err, info) {
      console.log(info.version);
      res.json(info.version);
      db.close();
    });
  });
});

function validateEmail(email) {
  let reg = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  return reg.test(email);
}
function validatePossword(password) {
  let reg = /\S{6,}/;
  return reg.test(password);
}
// handle post: login
app.post('/api/login', jsonParser, (req, res) => {
  let email = req.body.username;
  let password = req.body.password;
  let statusNum = 200;
  let contentType = req.headers['content-type'].toLowerCase();
  let obj = {};

  db.findData(email, (userinfo)=>{
    if (contentType !== 'application/json') {
      obj = {
        'error': 'Content-Type wrong',
      };
      statusNum = 400;
    } else if (validateEmail(email) === false) {
      obj = {
        'error': 'email format error',
      };
      statusNum = 400;
      res.status(statusNum).json(obj);
      return;
    } else if (validatePossword(password) === false) {
      obj = {
        'error': 'password format error(with space or less than 6 charaters)',
      };
      statusNum = 400;
      res.status(statusNum).json(obj);
      return;
    } else if (!email || !password) {
      obj = {
        'error': 'missing field',
      };
      statusNum = 400;
    } else if (userinfo === undefined) {
      obj = {
        'error': 'something went wrong',
      };
      statusNum = 500;
    } else if (password === userinfo.password) {
      let days = 7;
      let expiresAt = new Date().getTime() + days * 24 * 60 * 60 * 1000;
      obj = {
        'expiresAt': expiresAt,
        'token': userinfo.token,
      };
      statusNum = 200;
    } else {
      obj = {
        'error': 'password or username not match',
      };
      statusNum = 403;
    }
    res.status(statusNum).json(obj);
  });
});

/* eslint no-console: "off" */
let portNum = process.env.PORT || 3000;
app.listen(portNum, () => {
  console.log(`listening on port:${portNum}`);
});
