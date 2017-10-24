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
    try {
      if (err) {
        throw err;
      }
      let videosDB = db.collection('videos');

      console.log(typeof (videoId) + ':' + videoId);

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

module.exports = {
  findVideoInfo: findVideoInfo,
  // thumbupVideo: thumbupVideo,
  // thumbdownVideo: thumbdownVideo,
  // cancelthumbupVideo: cancelthumbupVideo,
  // cancelthumbdownVideo: cancelthumbdownVideo,
  updateVideoInfo: updateVideoInfo,
};

