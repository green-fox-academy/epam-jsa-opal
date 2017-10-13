'use strict';
let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
let protocol = process.env.DB_PROTOCOL;
let host = process.env.DB_HOST;
let port = process.env.DB_PORT;
let name = process.env.DB_NAME;
let username = process.env.Username;
let password = process.env.Password;
let url;
console.log(username + 'inlogin');
console.log(password + 'inlogin');
if (password !== undefined) {
  // url: 'mongodb://54wallis_a_good_man:haha@ds015869.mlab.com:15869/walkingdead'
  url = protocol +'://' + username + ':' + password + '@' + host+':' + port + '/' + name;
} else {
  url = protocol +'://' + host+':' + port + '/' + name;
}

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
