'use strict';

const tokensDb = require('../collections/tokens-db');

function logout(req, res) {
  let obj = {};
  let token = req.headers.token;

  if (token === undefined) {
    obj = {'error': 'token not found'};
    res.status(403).json(obj);
    return;
  }
  tokensDb.deleteToken(token, (deleteInfo) => {
    if (deleteInfo === undefined) {
      obj = {'error': 'can not connect to DB'};
      res.status(500).json(obj);
    } else {
      let statusNum = 204;
      let header = req.headers;

      if (header === undefined) {
        obj = {'error': 'header missing'};
        statusNum = 401;
      } else {
        res.status(statusNum).json(obj);
      }
    }
  });
}
module.exports = {logout: logout};
