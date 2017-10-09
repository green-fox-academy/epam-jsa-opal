'use strict';
let bodyParser = require('body-parser');
const express = require('express');
const url = 'mongodb://localhost:27017/JSA';// already defined;
const app = express();
let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
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

app.post('/api/signup', function(req, res) {
  console.log(req.body);
  let sendContent = {
    'username': ' ',
    'email': '',
    'phone number': '',
    'full name': '',
    'password': '',
  };
  usernameCheck(req, res);
});

function phonenumberCheck(req, res) {
  if (req.body['phone number'] === '') {
    let obj = {
      'error': 'the phone number is void',
    };
    res.status(400).send(obj);
    return -1;
  }
  if (! /^\d+$/.test(req.body['phone number'])) {
    let obj = {
      'error': 'the phone number is invalid',
    };
    res.status(400).send(obj);
    return -1;
  }
  MongoClient.connect(url, function(err, db) {
    if (err) {
      let obj = {
        'error': 'something went wrong',
      };
      res.status(500).send(obj);
      db.close();
      return -1;
    }
    db.collection('user').find({'username': req.body.username})
      .toArray(function(err, items) {
        if (items.length !== 0) {
          let obj = {
            'error': 'phone number conflicts!',
          };
          res.status(409).send(obj);
          db.close();
          return -1;
        }
        db.close();
        fullnameCheck(req, res);
      });
  });
}
function usernameCheck(req, res) {
  if (req.body.username.replace(' ', '') === '') {
    let obj = {
      'error': 'the username is void',
    };
    res.status(400).send(obj);
    return -1;
  }
  if (hasNumber(req.body.username)) {
    let obj = {
      'error': 'the username is invalid',
    };
    res.status(400).send(obj);
    return -1;
  }
  MongoClient.connect(url, function(err, db) {
    if (err) {
      let obj = {
        'error': 'something went wrong',
      };
      res.status(500).send(obj);
      db.close();
      console.log('its conflict!');
      return -1;
    }
    db.collection('user').find({'username': req.body.username})
      .toArray(function(err, items) {
        console.log(items.length);
        if (items.length !== 0) {
          let obj = {
            'error': 'username conflicts!',
          };
          console.log('~~~~~~~~~~~~~~~~~~~~~~~~~');
          res.status(409).send(obj);
          db.close();
          return -1;
        }
        db.close();
        emailCheck(req, res);
      });
  });
}
function emailCheck(req, res) {
  if (req.body.email.replace(' ', '') === '') {
    let obj = {
      'error': 'the email is void',
    };
    res.status(400).send(obj);
    return -1;
  }
  if (!validateEmail(req.body.email)) {
    let obj = {
      'error': 'the email format is invalid',
    };
    res.status(400).send(obj);
    return -1;
  }
  MongoClient.connect(url, function(err, db) {
    if (err) {
      let obj = {
        'error': 'something went wrong',
      };
      res.status(500).send(obj);
      db.close();
      return -1;
    }
    db.collection('user').find({'email': req.body.email})
      .toArray(function(err, items) {
        if (items.length !== 0) {
          let obj = {
            'error': 'email conflicts!',
          };
          res.status(409).send(obj);
          db.close();
          return -1;
        }
        db.close();
        phonenumberCheck(req, res);
      });
  });
}
function fullnameCheck(req, res) {
  if (req.body['full name'].replace(' ', '') === '') {
    let obj = {
      'error': 'the full name is void',
    };
    res.status(400).send(obj);
    return -1;
  }
  if (hasNumber(req.body['full name'])) {
    let obj = {
      'error': 'the full name is invalid',
    };
    res.status(400).send(obj);
    return -1;
  }
  passwordCheck(req, res);
}
function passwordCheck(req, res) {
  let encrypted = CryptoJS.AES.encrypt(req.body.password, 'Secret Passphrase');
  let decrypted = CryptoJS.AES.decrypt(encrypted, 'Secret Passphrase');
  console.log(decrypted.toString(CryptoJS.enc.Utf8));
}

function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function hasNumber(myString) {
  return /\d/.test(myString);
}
