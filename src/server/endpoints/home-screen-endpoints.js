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
      'commentInfos': videoInfos.commentInfos,
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

module.exports = {
  getHomeInfos: getHomeInfos,
  postComment: postComment,
};

