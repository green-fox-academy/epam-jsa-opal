'use strict';

const videosDb = require('../collections/videos-db');
const tokensDb = require('../collections/tokens-db');
const usersDb = require('../collections/users-db');

function getHomeInfos(req, res) {
  if (req.params.videoId.length !== 24) {
    res.status(400).json({'error': 'bad request'});
    return;
  }
  videosDb.findVideoInfo(req.params.videoId, (videoInfos) => {
    if (videoInfos._id === undefined) {
      res.status(404).json({'error': 'not found'});
      return;
    }

    let token = req.get('Authorization');
    let userId;

    if (token === undefined) {
      res.status(400).json({'error': 'unauthorization'});
      return;
    }
    tokensDb.getToken(token, (userInfos) => {
      let videoLikeNums = 0;
      let videoDislikeNums = 0;

      userId = userInfos.userId;
      videoInfos.videoDetails.clickedLike = false;
      videoInfos.videoDetails.clickedDislike = false;

      videoInfos.videoDetails.LikeStatus.forEach((user) => {
        if (user.userId.toString() === userId.toString() && user.liked === true) {
          videoInfos.videoDetails.clickedLike = true;
        }
        if (user.userId.toString() === userId.toString() && user.disliked === true) {
          videoInfos.videoDetails.clickedDislike = true;
        }
        if (user.liked) {
          videoLikeNums++;
        }
        if (user.disliked) {
          videoDislikeNums++;
        }
      });
      videoInfos.videoDetails.videoLikeNums = videoLikeNums;
      videoInfos.videoDetails.videoDislikeNums = videoDislikeNums;
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
        if (comment.LikeStatus.length === 0) {
          comment.likestatus = false;
          comment.dislikestatus = false;
        }
        comment.likestatus = false;
        comment.dislikestatus = false;
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
        'videoId': videoInfos._id.toString(),
        'videoUrl': videoInfos.videoUrl,
        'videoDetails': videoInfos.videoDetails,
        'uploader': videoInfos.uploader,
        'commentInfos': videoInfos.commentInfos.reverse(),
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

function uploadVideo(req, res) {
  if (req.get('Authorization') === undefined) {
    res.status(400).json({'error': 'unauthorized'});
    return;
  }
  if (req.body.url === undefined || req.body.preview === undefined || req.body.title === undefined) {
    res.status(402).json({'error': 'miss field'});
    return;
  }
  videosDb.addVideo({videoUrl: req.body.url, preview: req.body.preview, videoTitle: req.body.title},
    req.get('Authorization'), (uploadVideoMessage) => {
      if (uploadVideoMessage === undefined) {
        res.status(500).json({'error': 'something went wrong'});
      }
      res.set('location', '/api/videos/' + uploadVideoMessage);
      res.setHeader('content-type', 'application/json');
      res.status(201).json({});
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
        'videoId': value._id.toString(),
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

function getLoginedUserInfos(req, res) {
  let token = req.get('Authorization');

  if (token === undefined) {
    res.status(400).json({'error': 'unAuthorization'});
    return;
  }
  tokensDb.getToken(token, (tokenInfos) => {
    if (tokenInfos._id === undefined) {
      res.status(404).json({'error': 'not found'});
      return;
    }
    usersDb.findUserInfoById(tokenInfos.userId, (userInfos) => {
      if (tokenInfos._id === undefined) {
        res.status(404).json({'error': 'not found'});
        return;
      }
      res.status(200).json({
        'username': userInfos.username,
        'avatar': userInfos.avatar,
      });
    });
  });
}

module.exports = {
  getHomeInfos: getHomeInfos,
  postComment: postComment,
  uploadVideo: uploadVideo,
  getVideoInfos: getVideoInfos,
  getLoginedUserInfos: getLoginedUserInfos,
};

