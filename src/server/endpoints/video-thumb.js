'use strict';

const videosDb = require('../collections/videos-db');
const tokensDb = require('../collections/tokens-db');

function thumbUp(req, res) {
  let token = req.get('Authorization');
  let userId;

  tokensDb.getToken(token, (userInfos) => {
    userId = userInfos.userId;
    let insertUser = true;
    let videoId = req.params.videoId;

    videosDb.findVideoInfo(req.params.videoId, (videoInfos) => {
      for (let i = 0; i < videoInfos.videoDetails.LikeStatus.length; i++) {
        if (videoInfos.videoDetails.LikeStatus[i].userId.toString() === userId.toString()) {
          videoInfos.videoDetails.LikeStatus[i].liked = true;
          videoInfos.videoDetails.LikeStatus[i].disliked = false;
          insertUser = false;
        }
      }
      if (insertUser) {
        let obj = {
          'userId': userId,
          'liked': true,
          'disliked': false,
        };

        videoInfos.videoDetails.LikeStatus.push(obj);
      }
      videosDb.updateVideoInfo(videoInfos, videoId);
    });
  });

  res.status(200).json({});
}

function thumbDown(req, res) {
  let token = req.get('Authorization');
  let userId;

  tokensDb.getToken(token, (userInfos) => {
    userId = userInfos.userId;
    let insertUser = true;
    let videoId = req.params.videoId;

    videosDb.findVideoInfo(req.params.videoId, (videoInfos) => {
      for (let i = 0; i < videoInfos.videoDetails.LikeStatus.length; i++) {
        if (videoInfos.videoDetails.LikeStatus[i].userId.toString() === userId.toString()) {
          videoInfos.videoDetails.LikeStatus[i].disliked = true;
          videoInfos.videoDetails.LikeStatus[i].liked = false;
          insertUser = false;
        }
      }
      if (insertUser) {
        let obj = {
          'userId': userId,
          'liked': false,
          'disliked': true,
        };

        videoInfos.videoDetails.LikeStatus.push(obj);
      }
      videosDb.updateVideoInfo(videoInfos, videoId);
    });
  });
  res.status(200).json({});
}

function cancelthumbUp(req, res) {
  let token = req.get('Authorization');
  let userId;

  tokensDb.getToken(token, (userInfos) => {
    userId = userInfos.userId;
    let videoId = req.params.videoId;

    videosDb.findVideoInfo(req.params.videoId, (videoInfos) => {
      for (let i = 0; i < videoInfos.videoDetails.LikeStatus.length; i++) {
        if (videoInfos.videoDetails.LikeStatus[i].userId.toString() === userId.toString()) {
          videoInfos.videoDetails.LikeStatus[i].liked = false;
        }
      }
      videosDb.updateVideoInfo(videoInfos, videoId);
    });
  });
  res.status(200).json({});
}

function cancelthumbDown(req, res) {
  let token = req.get('Authorization');
  let userId;

  tokensDb.getToken(token, (userInfos) => {
    userId = userInfos.userId;
    let videoId = req.params.videoId;

    videosDb.findVideoInfo(req.params.videoId, (videoInfos) => {
      for (let i = 0; i < videoInfos.videoDetails.LikeStatus.length; i++) {
        if (videoInfos.videoDetails.LikeStatus[i].userId.toString() === userId.toString()) {
          videoInfos.videoDetails.LikeStatus[i].disliked = false;
        }
      }
      videosDb.updateVideoInfo(videoInfos, videoId);
    });
  });
  res.status(200).json({});
}

function judgeVotetype(req, res) {
  let votetype = req.params.votetype;

  console.log(votetype);
  if (votetype === 'thumbUp') {
    thumbUp(req, res);
  } else if (votetype === 'thumbDown') {
    thumbDown(req, res);
  } else if (votetype === 'cancelThumbup') {
    cancelthumbUp(req, res);
  } else if (votetype === 'cancelThumbdown') {
    cancelthumbDown(req, res);
  }
}

function getHomeInfos(req, res) {
  videosDb.findVideoInfo(req.params.videoId, (videoInfos) => {
    if (videoInfos._id === undefined) {
      res.status(404).json({'error': 'not found'});
      return;
    }
    res.status(200).json({
      // videoId should be same with _id, here just for testing
      // in your PC please change here
      'videoId': '59ed7f1f1707c6894c13e013',
      'videoUrl': 'http://nettuts.s3.amazonaws.com/763_sammyJSIntro/trailer_test.mp4',
      'videoDetails': {
        'title': 'test video',
        'views': '1',
        'likesNum': 100,
        'dislikeNum': 90,
        'clickedLike': false,
        'clickedDislike': false,
        'publishDate': 1508743106405,
      },
      'uploader': {
        'name': 'uploader name',
        'userId': '59e02b5d120d8b14a06816b6',
        'avatar': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLDxSdH8lLX-y9TJzLDWZPvoLexXrE8Ft5EAAWaZNyQHVM-yh-3A',
        'subscribers': 1000,
      },
      'commentInfos': [
        {
          'username': 'zoe',
          'userId': '59e02b5d120d8b14a06816b6',
          'avatar': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLDxSdH8lLX-y9TJzLDWZPvoLexXrE8Ft5EAAWaZNyQHVM-yh-3A',
          'commentTime': 1508743106105,
          'likeNum': 100,
          'dislikeNum': 90,
          'clickedLike': true,
          'clickedDislike': false,
          'commentContent': 'hahaha i like it',
          'commentId': 1,
        },
        {
          'username': 'zoe-2',
          'userId': '59e5b7c114d5a536988a0bb1',
          'avatar': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLDxSdH8lLX-y9TJzLDWZPvoLexXrE8Ft5EAAWaZNyQHVM-yh-3A',
          'commentTime': 1508743106305,
          'likeNum': 100,
          'dislikeNum': 90,
          'clickedLike': true,
          'clickedDislike': false,
          'commentContent': 'hahaha i like it',
          'commentId': 2,
        },
      ],
    });
  });
}

module.exports = {
  getHomeInfos: getHomeInfos,
  thumbUp: thumbUp,
  thumbDown: thumbDown,
  cancelthumbUp: cancelthumbUp,
  cancelthumbDown: cancelthumbDown,
  judgeVotetype: judgeVotetype,
};

