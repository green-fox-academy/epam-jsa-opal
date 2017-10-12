'use strict';
const userDbHandler = require('./users_signup_db');


function checkInfoValid(req, res) {
  if (req.body.username.replace(' ', '') === '') {
    let obj = {
      'error': 'the username is void',
    };
    res.setHeader('content-type', 'application/json');
    res.status(400).send(obj);
    return -1;
  }
  if (req.body.email.replace(' ', '') === '') {
    let obj = {
      'error': 'the email is void',
    };
    res.setHeader('content-type', 'application/json');
    res.status(400).send(obj);
    return -1;
  }
  if (!validateEmail(req.body.email)) {
    let obj = {
      'error': 'the email format is invalid',
    };
    res.setHeader('content-type', 'application/json');
    res.status(400).send(obj);
    return -1;
  }
  if (req.body['phone number'].replace(' ', '') === '') {
    let obj = {
      'error': 'the phone number is void',
    };
    res.setHeader('content-type', 'application/json');
    res.status(400).send(obj);
    return -1;
  }
  if (! /^\d+$/.test(req.body['phone number'])) {
    let obj = {
      'error': 'the phone number is invalid',
    };
    res.setHeader('content-type', 'application/json');
    res.status(400).send(obj);
    return -1;
  }
  if (req.body['full name'].replace(' ', '') === '') {
    let obj = {
      'error': 'the full name is void',
    };
    res.setHeader('content-type', 'application/json');
    res.status(400).send(obj);
    return -1;
  }
  if (hasNumber(req.body['full name'])) {
    let obj = {
      'error': 'the full name is invalid',
    };
    res.setHeader('content-type', 'application/json');
    res.status(400).send(obj);
    return -1;
  }
  if (req.body.password.replace(' ', '') === '') {
    let obj = {
      'error': 'the password is void',
    };
    res.setHeader('content-type', 'application/json');
    res.status(400).send(obj);
    return -1;
  }
  if (req.body.password.length<=5) {
    let obj = {
      'error': 'the password is too short',
    };
    res.setHeader('content-type', 'application/json');
    res.status(400).send(obj);
    return -1;
  }
  userDbHandler.dbHandler(req, res);
}
function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function hasNumber(myString) {
  return /\d/.test(myString);
}

module.exports = {
  checkInfoValid: checkInfoValid,
};
