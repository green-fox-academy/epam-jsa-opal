const tokensDb = require('./tokens-db');
function logout(req, res) {
  let tokens = req.header.tokens;
  tokensDb.deleteToken(tokens);
  let statusNum = 200;
  res.status;
}
