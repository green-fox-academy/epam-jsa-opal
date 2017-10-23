'use strict';

const videosDb = require('../collections/videos-db');

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
      'videoUrl': 'www.video.com',
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
        'userId': 'uploader Id',
        'avatar': 'avatar',
        'subscribers': 1000,
      },
      'commentInfos': [
        {
          'username': 'zoe',
          'userId': '001',
          'avatar': 'avatar',
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
          'avatar': 'avatar',
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

module.exports = {getHomeInfos: getHomeInfos};

