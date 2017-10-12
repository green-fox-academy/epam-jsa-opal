const tokensDb = require('./tokens-db');
let obj = {};
function logout(req, res) {
  let token = req.headers.token;
  tokensDb.deleteToken(token, (deleteInfo) => {
    if (deleteInfo === undefined) {
      obj = {
        'error': 'can not connect to DB',
      };
      res.status(500).json(obj);
      return;
    } else {
      let statusNum = 204;
      let header = req.headers;
      if (header === undefined) {
        obj = {
          'error': 'header missing',
        };
        statusNum = 401;
      } else if (token === undefined) {
        obj = {
          'error': 'token not found',
        };
        statusNum = 403;
      } else if (statusNum !== 204) {
        res.status(statusNum).json(obj);
      } else {
        res.status(statusNum).json(obj);
      }
    }
  });
}

module.exports={
  logout: logout,
};
