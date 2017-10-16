'use strict';
const signUp = require('./signup-endpoints.js');
const bodyParser = require('body-parser');
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const jsonParser = bodyParser.json();
const loginController = require('./endpoints/login-endpoints');

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
  let url = protocol+'://' + host+':' + port + '/' + name;
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

let portNum = process.env.PORT || 3000;
app.listen(portNum, () => {
  console.log(`listening on port:${portNum}`);
});
