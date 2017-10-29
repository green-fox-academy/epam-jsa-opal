'use strict';

const tokensDb = require('../collections/tokens-db');
const usersDb = require('../collections/users-db');
const videosDb = require('../collections/videos-db');

function getUserProfiles(req, res) {
  if (req.get('Authorization') === undefined) {
    res.status(400).json({'error': 'unAuthorization'});
    return;
  }
  tokensDb.getToken(req.get('Authorization'), (tokenInfos) => {
    if (tokenInfos._id === undefined) {
      res.status(404).json({'error': 'not found'});
      return;
    }
    usersDb.findUserInfoByUsername(req.params.username, (userInfos) => {
      if (userInfos._id === undefined) {
        res.status(404).json({'error': 'not found'});
        return;
      }
      videosDb.getUploadVideosByUsername(req.params.username, (uploadInfos) => {
        res.status(200).json({
          'username': userInfos.username,
          'email': userInfos.email,
          'phoneNumber': userInfos['phone number'],
          'fullName': userInfos['full name'],
          'avatar': userInfos.avatar,
          'uploads': uploadInfos,
        });
      });
    });
  });
}

function modifyUserProfiles(req, res) {
  if (req.get('Authorization') === undefined) {
    res.status(400).json({'error': 'unAuthorization'});
    return;
  }
  tokensDb.getToken(req.get('Authorization'), (tokenInfos) => {
    if (tokenInfos._id === undefined) {
      res.status(404).json({'error': 'not found'});
      return;
    }
    usersDb.updateUserInfos(req.params.username, req.body, (updateResult) => {
      if (updateResult === 'failed') {
        res.status(400).json({'error': 'update failed'});
        return;
      }
      res.set('location', '/api/profile/' + updateResult.username);
      res.setHeader('content-type', 'application/json');
      res.status(201).json({});
    });
  });
}

module.exports = {
  getUserProfiles: getUserProfiles,
  modifyUserProfiles: modifyUserProfiles,
};
