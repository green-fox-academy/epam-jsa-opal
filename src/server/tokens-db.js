'use strict';
let mongodb = require('mongodb');
let randomstring = require('randomstring');
let MongoClient = mongodb.MongoClient;
let protocol = process.env.DB_PROTOCOL;
let host = process.env.DB_HOST;
let port = process.env.DB_PORT;
let name = process.env.DB_NAME;
let url = protocol+'://' + host+':' + port + '/' + name;

function createToken(userId, userAgent) {
  let tokenDescriptor = {};
  const TOKEN_LIFETIME = 7;
  let expiresAt = new Date().getTime() + TOKEN_LIFETIME * 24 * 60 * 60 * 1000;
  tokenDescriptor.userId = userId;
  tokenDescriptor.userAgent = userAgent;
  tokenDescriptor.expiresAt = expiresAt;
  tokenDescriptor.token = randomstring.generate(32);
  searchTokenDescriptor(tokenDescriptor, insertTokenDescriptor);
  return {
    token: tokenDescriptor.token,
    expiresAt: tokenDescriptor.expiresAt,
  };
}
// delete Token from db
function deleteToken(token) {
  MongoClient.connect(url, (err, db) => {
    try {
      let tokensDb = db.collection('tokenDescriptors');
      tokensDb.remove({'token': token}, (err) => {
        try {
          db.close();
          throw err;
        } catch (e) {
          console.log(e.name + ':' + e.message);
        }
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
        try {
          if (err) throw err;
          if (result === null) {
            callback([]);
          } else {
            callback(result);
          }
          db.close();
        } catch (e) {
          console.log(e.name + ':' + e.message);
        }
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
        try {
          db.close();
          throw err;
        } catch (e) {
          console.log(e.name + ':' + e.message);
        }
      });
    } catch (e) {
      console.log(e.name + ':' + e.message);
    }
  });
}
// serach token from database
function searchTokenDescriptor(tokenDescriptor, callback) {
  MongoClient.connect(url, (err, db) => {
    try {
      if (err) {
        throw err;
      }
      let tokensDb = db.collection('tokenDescriptors');
      tokensDb.findOne({'token': tokenDescriptor.token}, (err, result) => {
        try {
          if (err) {
            throw err;
          }
          db.close();
          if (result === null) {
            callback(tokenDescriptor);
          } else {
            return;
          }
        } catch (e) {
          console.log(e.name + ':' + e.message);
        }
      });
    } catch (e) {
      /* eslint no-console: "off" */
      console.log(e.name + ':' + e.message);
    }
  });
}

module.exports= {
  createToken: createToken,
  deleteToken: deleteToken,
  getToken: getToken,
};
