'use strict';
const express = require('express');

const app = express();

app.use(express.static('dist'));
app.get('/heartbeat', (req, res) => {
  var response;
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/epam';
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
