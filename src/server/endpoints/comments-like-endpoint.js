'use strict';

const commentDb = require('../collections/commentLike-db');

function commentLikeOrDislike(req, res) {
  let videoId = req.params.videoId;
  let commentsId = req.params.commentsId;
  let votetype = req.params.votetype;
  commentDb.updateComments(videoId, commentsId, votetype, res, req);
}
module.exports = {commentLikeOrDislike: commentLikeOrDislike};
