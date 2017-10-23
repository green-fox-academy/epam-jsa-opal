'use strict';

const videosDb = require('../collections/videos-db');

function getHomeInfos(req, res) {
  videosDb.findVideoInfo(req.params.videoId, (videoInfos) => {
    if (videoInfos._id === undefined) {
      res.status(404).json({'error': 'not found'});
      return;
    }
    res.status(200).json({
      'videoUrl': videoInfos.videoUrl,
      'videoDetails': videoInfos.videoDetails,
      'uploader': videoInfos.uploader,
      'videoComments': videoInfos.comments,
    });
  });
}

module.exports = {getHomeInfos: getHomeInfos};

