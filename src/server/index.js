'use strict';
const express = require('express');
require('dotenv').config();
const app = express();

console.log(process.env.DB_URL);
app.use(express.static('dist'));
app.get('/heartbeat', (req, res) => {
  var response;
  var MongoClient = require('mongodb').MongoClient;
  var url = process.env.DB_URL;
  MongoClient.connect(url,function(err,db) {
    var adminDb = db.admin();
    adminDb.serverStatus(function(err,info) {
      console.log(info.version);
      res.json(info.version);
      db.close();
    });
  });
});

/* eslint no-console: "off" */
app.listen(3000, () => {
  console.log('listening on port:3000');
});
