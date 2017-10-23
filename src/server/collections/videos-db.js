'use strict';

require('dotenv').config();
let protocol = process.env.DB_PROTOCOL;
let host = process.env.DB_HOST;
let port = process.env.DB_PORT;
let name = process.env.DB_NAME;
let username = process.env.Username;
let password = process.env.Password;
let url;
let ObjectId = require('mongodb').ObjectID;

if (password !== undefined) {
  url = protocol + '://' + username + ':' + password + '@' + host + ':' + port + '/' + name;
} else {
  url = protocol + '://' + host + ':' + port + '/' + name;
}
let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
const tokensDb = require('./tokens-db');
const usersDb = require('./users-db');

function findVideoInfo(videoId, callback) {
  MongoClient.connect(url, (err, db) => {
    try {
      if (err) {
        throw err;
      }
      if (videoId.length !== 24) {
        return callback([]);
      }
      let videosDB = db.collection('videos');

      videosDB.findOne({'_id': ObjectId(videoId)}, (err, result) => {
        if (err) {
          console.log(err);
        }
        db.close();
        if (result === null) {
          return callback([]);
        }
        let videoInfos = result;

        return callback(videoInfos);
      });
    } catch (e) {
      console.log(e.name + ':' + e.message);
      return callback(undefined);
    }
  });
}

function addComment(videoId, token, callback) {
  tokensDb.getToken(token, (tokenInfo) => {
    usersDb.findUserInfoById(tokenInfo.userId, (userInfo) => {
      MongoClient.connect(url, (err, db) => {
        try {
          if (err) {
            throw err;
          }
          if (videoId.length !== 24) {
            return callback([]);
          }
          let videosDB = db.collection('videos');

          videosDB.findOne({'_id': ObjectId(videoId)}, (err, videoInfo) => {
            if (err) {
              console.log(err);
            }
            let commentId = videoInfo.commentInfos[videoInfo.commentInfos.length - 1].commentId + 1;
            let obj = {
              'username': userInfo.username,
              'userId': userInfo._id,
              'avatar': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLDxSdH8lLX-y9TJzLDWZPvoLexXrE8Ft5EAAWaZNyQHVM-yh-3A',
              'commentTime': 1508743106105,
              'likeNum': 0,
              'dislikeNum': 0,
              'clickedLike': false,
              'clickedDislike': false,
              'commentContent': 'hahaha i like it',
              'commentId': commentId,
            };

            videosDB.update({'_id': ObjectId(videoId)}, {$push: {'commentInfos': obj}},
              (err, result) => {
                if (err) {
                  console.log(err);
                }
                db.close();
                if (result === null) {
                  return callback([]);
                }
                let insertInfos = result;

                return callback(insertInfos);
              });
          });
        } catch (e) {
          console.log(e.name + ':' + e.message);
          return callback(undefined);
        }
      });
    });
  });
}

module.exports = {
  findVideoInfo: findVideoInfo,
  addComment: addComment,
};

