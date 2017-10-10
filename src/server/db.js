'use strict';
let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
let protocol = process.env.DB_PROTOCOL;
let host = process.env.DB_HOST;
let port = process.env.DB_PORT;
let name = process.env.DB_NAME;
let url = protocol+'://' + host+':' + port + '/' + name;

function initDB() {
  let initInfo = [
    {
      'username': 'defalut01',
      'password': '123',
    },
    {
      'username': 'defalut02',
      'password': '123',
    },
  ];
  MongoClient.connect(url, (err, db) => {
    /* eslint no-console: "off" */
    try {
      if (err !== null) {
        throw new Error('can not connect to database');
      }
      console.log(`Connect to ${url}`);
      if (!db.collection('users')) {
        db.createCollection('users', (err, res) => {
          if (err) {
            throw new Error(`cannot create collection`);
          }
        });
      }
      let usersDB = db.collection('users');
      usersDB.remove();
      usersDB.insertMany(initInfo, (err, res) => {
        if (err) {
          throw new Error(`cannot insert info`);
        }
        db.close();
      });
    } catch (e) {
      console.log(e);
    }
  });
}
// find data throw email
function findData(email, callback) {
  try {
    MongoClient.connect(url, (err, db) => {
      if (err) {
        callback(undefined);
        throw new Error('can not connect to database');
      }
      let usersDB = db.collection('users');
      usersDB.find({'email': email}).toArray((err, result) =>{
        if (result[0] === undefined) {
          callback([]);
          db.close();
          return;
        }
        let userinfo = result[0];
        db.close();
        callback(userinfo);
      });
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports= {
  initDB: initDB,
  findData: findData,
};
