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

if (password !== undefined) {
  url = protocol + '://' + username + ':' + password + '@' + host + ':' + port + '/' + name;
} else {
  url = protocol + '://' + host + ':' + port + '/' + name;
}

function dbError(err, res, db) {
  if (err) {
    res.status(404).send();
    db.close();
    return;
  }
}

function commentRequestHandler(req, res, callback) {
  let userId;
  let videosId = req.params.videoId;
  let commentId = req.params.commentsId;
  let votetype = req.params.votetype;

  MongoClient.connect(url, (err, db) => {
    if (err) {
      throw err;
    }
    db.collection('videos').find({'videoId': videosId})
      .toArray(function(err, items) {
        dbError(err, res, db);
        let VideoObject = items[0];
        let token = req.get('Authorization');

        db.collection('tokenDescriptors')
          .find({'token': token})
          .toArray(function(err, subitems) {
            dbError(err, res, db);
            if (items[0] === undefined) {
              console.log('Not login', err);
              res.status(404).send({'error': 'Not login sorry!'});
              db.close();
              return;
            }
            userId = subitems[0].userId;
            let inputObj = {
              'votetype': votetype,
              'db': db,
              'videosId': videosId,
              'userId': userId,
              'VideoObject': VideoObject,
              'res': res,
              'commentId': commentId,
            };
            callback(inputObj);
          });
      });
  });
}



// function commentLikeCallHandler(obj) {
//   let tempArray = obj.VideoObject.commentInfos[obj.commentId - 1].LikeStatus;
//   let whetherFind = false;

//   if (obj.votetype === 'likeenable') {
//     whetherFind = iterateArray(tempArray, true, obj.userId, 'liked');
//     createObj(whetherFind, true, false, tempArray, obj.userId);
//     updateCommentsInfo(obj.VideoObject, obj.commentId,
//       tempArray, obj.db, obj.videosId);
//   } else if (obj.votetype === 'dislikeenable') {
//     whetherFind = iterateArray(tempArray, true, obj.userId, 'disliked');
//     createObj(whetherFind, false, true, tempArray, obj.userId);
//     updateCommentsInfo(obj.VideoObject, obj.commentId,
//       tempArray, obj.db, obj.videosId);
//   } else if (obj.votetype === 'likedisable') {
//     iterateArray(tempArray, false, obj.userId, 'liked');
//     updateCommentsInfo(obj.VideoObject, obj.commentId,
//       tempArray, obj.db, obj.videosId);
//   } else if (obj.votetype === 'dislikedisable') {
//     iterateArray(tempArray, false, obj.userId, 'disliked');
//     updateCommentsInfo(obj.VideoObject, obj.commentId,
//       tempArray, obj.db, obj.videosId);
//   }
//   sendResponse(tempArray, obj.res, obj.db);
// }

function updateCommentsInfo(obj, tempArray) {
  obj.VideoObject.commentInfos[obj.commentId - 1].LikeStatus = tempArray;
  obj.db.collection('videos')
    .update({'videoId': obj.videosId},
      {$set: {'commentInfos': obj.VideoObject.commentInfos}});
}

module.exports = {
  commentRequestHandler: commentRequestHandler,
  updateCommentsInfo: updateCommentsInfo,
};