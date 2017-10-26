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

function update(videosId, commentId, votetype, res, req) {
  let userId;

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

            commentLikeCallHandler(inputObj);
          });
      });
  });
}

function countLikeAndDislikedNumber(commentUserArray) {
  let likednumber = 0;
  let dislikednumber = 0;

  commentUserArray.forEach(function(element) {
    if (element.liked === true) {
      likednumber++;
    }
    if (element.disliked === true) {
      dislikednumber++;
    }
  });
  let result = {
    'likedNumber': likednumber,
    'dislikedNumber': dislikednumber,
  };

  return result;
}

function updateCommentsInfo(VideoObject, commentId, tempArray, db, videosId) {
  VideoObject.commentInfos[commentId - 1].LikeStatus = tempArray;
  db.collection('videos')
    .update({'videoId': videosId},
      {$set: {'commentInfos': VideoObject.commentInfos}});
}

function createObj(whetherFind, like, dislike, tempArray, userId) {
  if (!whetherFind) {
    let objInsert = {
      'userId': userId.toString(),
      'liked': like,
      'disliked': dislike,
    };

    tempArray.push(objInsert);
  }
}

function iterateArray(tempArray, changedValue, userId, target) {
  for (let i = 0; i < tempArray.length; i++) {
    if (tempArray[i].userId === userId.toString()) {
      if (target === 'disliked') {
        tempArray[i].disliked = changedValue;
      } else if (target === 'liked') {
        tempArray[i].liked = changedValue;
      }
      return true;
    }
  }
}

function sendResponse(tempArray, res, db) {
  let sendObj = countLikeAndDislikedNumber(tempArray);

  res.setHeader('content-type', 'application/json');
  res.status(200).send(sendObj);
  db.close();
}

function commentLikeCallHandler(obj) {
  let tempArray = obj.VideoObject.commentInfos[obj.commentId - 1].LikeStatus;
  let whetherFind = false;

  if (obj.votetype === 'likeenable') {
    whetherFind = iterateArray(tempArray, true, obj.userId, 'liked');
    createObj(whetherFind, true, false, tempArray, obj.userId);
    updateCommentsInfo(obj.VideoObject, obj.commentId,
      tempArray, obj.db, obj.videosId);
  } else if (obj.votetype === 'dislikeenable') {
    whetherFind = iterateArray(tempArray, true, obj.userId, 'disliked');
    createObj(whetherFind, false, true, tempArray, obj.userId);
    updateCommentsInfo(obj.VideoObject, obj.commentId,
      tempArray, obj.db, obj.videosId);
  } else if (obj.votetype === 'likedisable') {
    iterateArray(tempArray, false, obj.userId, 'liked');
    updateCommentsInfo(obj.VideoObject, obj.commentId,
      tempArray, obj.db, obj.videosId);
  } else if (obj.votetype === 'dislikedisable') {
    iterateArray(tempArray, false, obj.userId, 'disliked');
    updateCommentsInfo(obj.VideoObject, obj.commentId,
      tempArray, obj.db, obj.videosId);
  }
  sendResponse(tempArray, obj.res, obj.db);
}

module.exports = {updateComments: update};
