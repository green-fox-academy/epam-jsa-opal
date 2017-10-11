'use strict';
const check = require('./checkUserInfo.js');
let bodyParser = require('body-parser');
require('dotenv').config();
const express = require('express');
const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('dist'));


app.get('/heartbeat', (req, res) => {
  res.json({status: 'ok'});
});


/* eslint no-console: "off" */
app.listen(3000, () => {
  console.log('listening on port:3000');
});

app.post('/api/signup', check.checkInfoValid);
