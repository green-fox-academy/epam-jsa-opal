'use strict';
let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
let protocol = process.env.DB_PROTOCOL;
let host = process.env.DB_HOST;
let port = process.env.DB_PORT;
let name = process.env.DB_NAME;
let url = protocol+'://' + host+':' + port + '/' + name;
function createToken(userId, userAgent) {
  let tokenDescriptor = {};
  let days = 7;
  let expiresAt = new Date().getTime() + days * 24 * 60 * 60 * 1000;
  let userAgentToString;
  tokenDescriptor.userId = userId;
  tokenDescriptor.userAgent = userAgent;
  tokenDescriptor.expiresAt = expiresAt;
  if (tokenDescriptor.userAgent.includes('Windows')) {
    userAgentToString = 'qwerasdf';
  } else if (tokenDescriptor.userAgent.includes('Mac')) {
    userAgentToString = 'asdfzxcv';
  } else if (tokenDescriptor.userAgent.includes('iPhone')) {
    userAgentToString = 'zxcvasdf';
  } else if (tokenDescriptor.userAgent.includes('Android')) {
    userAgentToString = 'asdfqwer';
  } else {
    userAgentToString = 'zxcvzxcv';
  }
  tokenDescriptor.token = tokenDescriptor.userId + userAgentToString;
  // confirm if the token already exited
  searchTokenDescriptor(tokenDescriptor, insertTokenDescriptor);
  return {
    token: tokenDescriptor.token,
    expiresAt: tokenDescriptor.expiresAt,
  };
}
// delete Token from db
function deleteToken(userId) {
  MongoClient.connect(url, (err, db) => {
    let tokensDb = db.collection('tokenDescriptors');
    tokensDb.remove({'userId': userId}, (err) => {
      db.close();
    });
  });
}
// get Token from db
function getToken(userId, callback) {
  MongoClient.connect(url, (err, db) => {
    let tokensDb = db.collection('tokenDescriptors');
    tokensDb.findOne({'userId': userId}, (err, result) => {
      if (result === null) {
        callback([]);
      } else {
        callback(result);
      }
      db.close();
    });
  });
}
// insert tokenDescriptor to database
function insertTokenDescriptor(item) {
  MongoClient.connect(url, (err, db) => {
    let tokensDb = db.collection('tokenDescriptors');
    tokensDb.insert(item, (err, result) => {
      db.close();
    });
  });
}
// serach token from database
function searchTokenDescriptor(tokenDescriptor, callback) {
  MongoClient.connect(url, (err, db) => {
    let tokensDb = db.collection('tokenDescriptors');
    tokensDb.findOne({'token': tokenDescriptor.token}, (err, result) => {
      db.close();
      if (result === null) {
        callback(tokenDescriptor);
      } else {
        return;
      }
    });
  });
}

module.exports= {
  createToken: createToken,
  deleteToken: deleteToken,
  getToken: getToken,
};
