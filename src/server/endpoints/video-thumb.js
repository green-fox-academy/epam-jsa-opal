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

module.exports = {
  thumbUp: thumbUp,
  thumbDown: thumbDown,
  cancelthumbUp: cancelthumbUp,
  cancelthumbDown: cancelthumbDown,
  judgeVotetype: judgeVotetype,
};

