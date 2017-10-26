'use strict';

const videosDb = require('../collections/videos-db');
const tokensDb = require('../collections/tokens-db');

function getHomeInfos(req, res) {
  videosDb.findVideoInfo(req.params.videoId, (videoInfos) => {
    if (videoInfos._id === undefined) {
      res.status(404).json({'error': 'not found'});
      return;
    }

    let token = req.get('Authorization');
    let userId;

    tokensDb.getToken(token, (userInfos) => {
      let videoLikeNums = 0;
      let videoDislikeNums = 0;

      if (token === undefined) {
        res.status(400).json({'error': 'unauthenrization'});
        return;
      }
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

      res.status(200).json({
        // videoId should be same with _id, here just for testing
        // in your PC please change here
        'videoId': videoInfos._id,
        'videoUrl': 'http://nettuts.s3.amazonaws.com/763_sammyJSIntro/trailer_test.mp4',
        'videoDetails': videoInfos.videoDetails,

        'uploader': {
          'name': 'uploader name',
          'userId': '59e02b5d120d8b14a06816b6',
          'avatar': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLDxSdH8lLX-y9TJzLDWZPvoLexXrE8Ft5EAAWaZNyQHVM-yh-3A',
          'subscribers': 1000,
        },
        'commentInfos': videoInfos.commentInfos,
      });
    });

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

