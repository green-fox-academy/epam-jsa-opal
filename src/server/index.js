'use strict';
const signUp = require('./endpoints/signup-endpoints');
const bodyParser = require('body-parser');
require('dotenv').config();
const DatabaseHealth = require('./endpoints/heartbeat');
const express = require('express');
const app = express();
const path = require('path');
const jsonParser = bodyParser.json();
const loginController = require('./endpoints/login-endpoints');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('dist'));
app.post('/api/signup', signUp.signupUser);
app.post('/api/login', jsonParser, loginController.login);
app.get('/heartbeat', DatabaseHealth.checkDatabaseHealth);
app.get('*', (req, res) =>{
  res.sendFile('index.html', {root: path.join(__dirname, '../../dist')});
});



let portNum = process.env.PORT || 3000;

app.listen(portNum, () => {
  console.log(`listening on port:${portNum}`);
});

