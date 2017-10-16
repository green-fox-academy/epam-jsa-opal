'use strict';
let mongodb = require('mongodb');
let randomstring = require('randomstring');
let MongoClient = mongodb.MongoClient;
let protocol = process.env.DB_PROTOCOL;
let host = process.env.DB_HOST;
let port = process.env.DB_PORT;
let name = process.env.DB_NAME;
let url = protocol+'://' + host+':' + port + '/' + name;
const TOKEN_LIFETIME = 7;

function createToken(userId, userAgent) {
  let tokenDescriptor = {};
  let expiresAt = new Date().getTime() + TOKEN_LIFETIME * 24 * 60 * 60 * 1000;
  tokenDescriptor.userId = userId;
  tokenDescriptor.userAgent = userAgent;
  tokenDescriptor.expiresAt = expiresAt;
  tokenDescriptor.token = randomstring.generate(32);
  checkLogin(tokenDescriptor.userId, tokenDescriptor.userAgent);
  insertTokenDescriptor(tokenDescriptor);
  return tokenDescriptor;
}
// delete Token from db
function deleteToken(token) {
  /* eslint no-console: "off" */
  MongoClient.connect(url, (err, db) => {
    try {
      let tokensDb = db.collection('tokenDescriptors');
      tokensDb.remove({'token': token}, (err) => {
        if (err !== null) {
          console.log(err.name + ':' + err.message);
          return;
        }
        db.close();
      });
    } catch (e) {
      console.log(e.name + ':' + e.message);
    }
  });
}
// get Token from db
function getToken(token, callback) {
  MongoClient.connect(url, (err, db) => {
    try {
      if (err) {
        throw err;
      }
      let tokensDb = db.collection('tokenDescriptors');
      tokensDb.findOne({'token': token}, (err, result) => {
        if (err) {
          console.log(err.name + ':' + err.message);
          return;
        }
        if (result === null) {
          callback([]);
        } else {
          callback(result);
        }
        db.close();
      });
    } catch (e) {
      console.log(e.name + ':' + e.message);
    }
  });
}
// insert tokenDescriptor to database
function insertTokenDescriptor(item) {
  MongoClient.connect(url, (err, db) => {
    try {
      if (err) {
        throw err;
      }
      let tokensDb = db.collection('tokenDescriptors');
      tokensDb.insert(item, (err, result) => {
        if (err !== null) {
          console.log(err.name + ':' + err.message);
        }
        db.close();
      });
    } catch (e) {
      console.log(e.name + ':' + e.message);
    }
  });
}
// check if already logined
function checkLogin(userId, userAgent) {
  MongoClient.connect(url, (err, db) => {
    try {
      if (err) {
        throw err;
      }
      let tokensDb = db.collection('tokenDescriptors');
      tokensDb.remove({'userId': userId, 'userAgent': userAgent}, (err) => {
        if (err !== null) {
          console.log(err.name + ':' + err.message);
          return;
        }
        db.close();
      });
    } catch (e) {
      console.log(e.name + ':' + e.message);
    }
  });
}

module.exports= {
  createToken: createToken,
  deleteToken: deleteToken,
  getToken: getToken,
};
