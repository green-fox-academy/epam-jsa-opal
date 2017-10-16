'use strict';

require('dotenv').config();

const signUp = require('./endpoints/signup-endpoints');
const DatabaseHealth = require('./endpoints/heartbeat');
const express = require('express');
const app = express();
const path = require('path');
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('dist'));
app.post('/api/signup', signUp.signupUser);
app.get('/heartbeat', DatabaseHealth.checkDatabaseHealth);
app.get('*', (req, res) =>{
  res.sendFile('index.html', {root: path.join(__dirname, '../../dist')});
});


let portNum = process.env.PORT || 3000;

app.listen(portNum, () => {
});

