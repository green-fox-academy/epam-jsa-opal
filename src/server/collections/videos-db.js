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

// function thumbupVideo(videoId, userId) {
//   MongoClient.connect(url, (err, db) => {
//     try {
//       if (err) {
//         throw err;
//       }
//       let videosDB = db.collection('videos');

//       videosDB.update({'_id': ObjectId(videoId), 'likeDetails.likeStatus.userId': userId}, {'videoDetails.likeStatus.userId': userId, 'videoDetails.likeStatus.liked': true, 'videoDetails.likeStatus.disliked': false}, (err, result) => {
//         if (err) {
//           console.log(err);
//         }
//         db.close();
//       });
//     } catch (e) {
//       console.log(e.name + ':' + e.message);
//     }
//   });
// }

// function thumbdownVideo(videoId) {
//   MongoClient.connect(url, (err, db) => {
//     try {
//       if (err) {
//         throw err;
//       }
//       let videosDB = db.collection('videos');

//       videosDB.update({'_id': ObjectId(videoId)}, {'$inc': {'videoDetails.dislikeNum': 1}}, (err, result) => {
//         if (err) {
//           console.log(err);
//         }
//         db.close();
//       });
//     } catch (e) {
//       console.log(e.name + ':' + e.message);
//     }
//   });
// }

// function cancelthumbupVideo(videoId) {
//   MongoClient.connect(url, (err, db) => {
//     try {
//       if (err) {
//         throw err;
//       }
//       let videosDB = db.collection('videos');

//       videosDB.update({'_id': ObjectId(videoId)}, {'$inc': {'videoDetails.likesNum': -1}}, (err, result) => {
//         if (err) {
//           console.log(err);
//         }
//         db.close();
//       });
//     } catch (e) {
//       console.log(e.name + ':' + e.message);
//     }
//   });
// }

// function cancelthumbdownVideo(videoId) {
//   MongoClient.connect(url, (err, db) => {
//     try {
//       if (err) {
//         throw err;
//       }
//       let videosDB = db.collection('videos');

//       videosDB.update({'_id': ObjectId(videoId)}, {'$inc': {'videoDetails.dislikeNum': -1}}, (err, result) => {
//         if (err) {
//           console.log(err);
//         }
//         db.close();
//       });
//     } catch (e) {
//       console.log(e.name + ':' + e.message);
//     }
//   });
// }

function updateVideoInfo(videoInfos, videoId) {
  MongoClient.connect(url, (err, db) => {
    try {
      if (err) {
        throw err;
      }
      let videosDB = db.collection('videos');

      videosDB.update({'_id': ObjectId(videoId)}, {'$set': videoInfos}, (err, result) => {
        if (err) {
          console.log(err);
        }
        db.close();
      });
    } catch (e) {
      // console.log(e.name + ':' + e.message);
    }
  });
}

function findVideoInfo(videoId, callback) {
  MongoClient.connect(url, (err, db) => {
    if (err) {
      console.log(err.name + ':' + err.message);
      return callback(undefined);
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
      return callback(result);
    });
  });
}

function addCommentToVideo(userInfo, videoId, content, callback) {
  MongoClient.connect(url, (err, db) => {
    if (err) {
      console.log(err.name + ':' + err.message);
      return callback(undefined);
    }
    let videosDB = db.collection('videos');

    videosDB.findOne({'_id': ObjectId(videoId)}, (err, videoInfo) => {
      if (err) {
        console.log(err);
        return callback(undefined);
      }
      let commentId = videoInfo
        .commentInfos[videoInfo.commentInfos.length - 1].commentId + 1;
      let obj = {
        'username': userInfo.username,
        'userId': userInfo._id,
        'avatar': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLDxSdH8lLX-y9TJzLDWZPvoLexXrE8Ft5EAAWaZNyQHVM-yh-3A',
        'commentTime': Date.now(),
        'LikeStatus': [],
        'commentContent': content,
        'commentId': commentId,
      };

      videosDB.update({'_id': ObjectId(videoId)},
        {$push: {'commentInfos': obj}},
        (err, result) => {
          if (err) {
            console.log(err);
          }
          db.close();
          if (result === null) {
            return callback([]);
          }
          return callback(result);
        });
    });
  });
}

function addComment(videoId, token, content, callback) {
  tokensDb.getToken(token, (tokenInfo) => {
    usersDb.findUserInfoById(tokenInfo.userId, (userInfo) => {
      addCommentToVideo(userInfo, videoId, content, callback);
    });
  });
}

module.exports = {
  findVideoInfo: findVideoInfo,
  updateVideoInfo: updateVideoInfo,
  addComment: addComment,
};

