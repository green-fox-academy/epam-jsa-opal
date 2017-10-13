'use strict';
require('dotenv').config();
const signUp = require('./signup-endpoints.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const loginController = require('./login-endpoints');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('dist'));
app.post('/api/signup', signUp.userSignup);
app.get('*', (req, res) =>{
  res.sendFile('index.html', {root: path.join(__dirname, '../../dist')});
});

app.get('/heartbeat', (req, res) => {
  let MongoClient = require('mongodb').MongoClient;
  let protocol = process.env.DB_PROTOCOL;
  let host = process.env.DB_HOST;
  let port = process.env.DB_PORT;
  let name = process.env.DB_NAME;
  let username = process.env.Username;
  let password = process.env.Password;
  let url;
  console.log(username);
  if (password !== 'local') {
    // url: 'mongodb://54wallis_a_good_man:haha@ds015869.mlab.com:15869/walkingdead'
    url = protocol +'://' + username + ':' + password + '@' + host+':' + port + '/' + name;
  } else {
    url = protocol +'://' + host+':' + port + '/' + name;
  }
  MongoClient.connect(url, function(err, db) {
    let adminDb = db.admin();
    adminDb.serverStatus(function(err, info) {
      res.json(info.version);
      db.close();
    });
  });
});

// handle post: login
app.post('/api/login', jsonParser, loginController.login);

/* eslint no-console: "off" */
let portNum = process.env.PORT || 3000;
app.listen(portNum, () => {
  console.log('listening on port:' + portNum);
});


