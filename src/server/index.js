'use strict';
const check = require('./checkUserInfo.js');
let bodyParser = require('body-parser');
require('dotenv').config();
const express = require('express');
const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true}));
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


/* eslint no-console: "off" */
let portNum = process.env.PORT || 3000;
app.listen(portNum, () => {
  console.log(`listening on port:${portNum}`);
});

app.post('/api/signup', check.checkInfoValid);
