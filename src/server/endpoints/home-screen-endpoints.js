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

const videosDb = require('../collections/videos-db');

function getHomeInfos(req, res) {
  videosDb.findVideoInfo(req.params.videoId, (videoInfos) => {
    if (videoInfos._id === undefined) {
      res.status(404).json({'error': 'not found'});
      return;
    }
    videoInfos.commentInfos.forEach((comment) => {
      let likeNums = 0;
      let dislikeNums = 0;

      if (comment.LikeStatus.length === 0) {
        comment.likeNums = likeNums;
        comment.dislikeNums = dislikeNums;
      }
      comment.LikeStatus.forEach((value, index) => {
        if (value.liked) {
          likeNums++;
        }
        if (value.disliked) {
          dislikeNums++;
        }
        if (index >= comment.LikeStatus.length - 1) {
          comment.likeNums = likeNums;
          comment.dislikeNums = dislikeNums;
        }
      });
    });
    let token = req.get('Authorization');

    if (token === undefined) {
      res.status(404).send({'error': 'Not login sorry!'});
      return;
    }
    MongoClient.connect(url, (err, db) => {
      db.collection('tokenDescriptors').find({'token': token})
      .toArray(function(err,items){
        if (err) {
          console.log('Unable to connect to the MongoDB server. Error:', err);
          res.status(404).send();
          db.close();
          return;
        }    
        if (items[0] === undefined) {
          res.status(404).send();
          return;
        }
        let userId = items[0].userId;
        videoInfos.commentInfos.forEach((comment) => {
          if (comment.LikeStatus.length === 0) {
            comment.likestatus = false;
            comment.dislikestatus = false;
          }
          comment.LikeStatus.forEach((value, index) => {
            if (value.userId === userId.toString()) {
              comment.likestatus = value.liked;
              comment.dislikestatus = value.disliked;
            }
          });
        });
        res.status(200).json({
          // videoId should be same with _id, here just for testing
          // in your PC please change here
          '_id':videoInfos._id.toString(),
          'videoId': videoInfos.videoId,
          'videoUrl': videoInfos.videoUrl,
          'videoDetails': videoInfos.videoDetails,
          'uploader':videoInfos.uploader,
          'commentInfos': videoInfos.commentInfos,
        });
      });
    });
  });
}

function postComment(req, res) {
  if (req.get('Authorization') === undefined) {
    res.status(400).json({'error': 'unauthorized'});
    return;
  } else if (req.params.videoId.length !== 24) {
    res.status(400).json({'error': 'bad request'});
    return;
  }

  videosDb.addComment(req.params.videoId,
    req.get('Authorization'),
    req.body.content,
    (insertInfos) => {
      if (insertInfos === undefined) {
        res.status(500).json({'error': 'something went wrong'});
      }
      res.status(200).json({'success': 'insert success'});
    });
}

function getVideoInfos(req, res) {
  videosDb.getAllVideo((allVideos) => {
    if (allVideos.length === 0) {
      res.status(404).json({'error': 'not found'});
      return;
    }

    res.status(200).json(allVideos.map((value) => (
      {
        'videoId': value.videoId,
        'videoSrc': value.videoUrl,
        'previewSrc': value.videoDetails.preview,
        'title': value.videoDetails.title,
        'videoTime': value.videoDetails.time,
        'author': value.uploader.name,
        'viewNumber': value.videoDetails.views,
      }
    )));
  });
}

module.exports = {
  getHomeInfos: getHomeInfos,
  postComment: postComment,
  getVideoInfos: getVideoInfos,
};

