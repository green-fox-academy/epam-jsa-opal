'use strict';
let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
let protocol = process.env.DB_PROTOCOL;
let host = process.env.DB_HOST;
let port = process.env.DB_PORT;
let name = process.env.DB_NAME;
let url = protocol+'://' + host+':' + port + '/' + name;

// find userinfo throw email
function findUserInfo(email, callback) {
  MongoClient.connect(url, (err, db) => {
    try {
      if (err) {
        callback(undefined);
        throw err;
      }
      let usersDB = db.collection('users');
      usersDB.findOne({'email': email}, (err, result) => {
        if (result === null) {
          callback([]);
          db.close();
          return;
        }
        let userinfo = result;
        db.close();
        callback(userinfo);
      });
    } catch (e) {
      /* eslint no-console: "off" */
      console.log(e.name + ':' + e.message);
    }
  });
}

module.exports= {
  findUserInfo: findUserInfo,
};
