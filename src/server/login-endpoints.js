const usersDb = require('./users-db');
const tokensDb = require('./tokens-db');
const encryptoData = require('../server/cryptData');

function login(req, res) {
  let email = req.body.username;
  let password = req.body.password;
  let statusNum = 200;
  let contentType = req.headers['content-type'].toLowerCase();
  let obj = {};
  if (contentType !== 'application/json') {
    obj = {
      'error': 'Content-Type wrong',
    };
    statusNum = 400;
  } else if (email === undefined || password === undefined) {
    obj = {
      'error': 'missing field',
    };
    statusNum = 400;
  } else if (validateEmail(email) === false) {
    obj = {
      'error': 'email format error',
    };
    statusNum = 400;
  } else if (validatePossword(password) === false) {
    obj = {
      'error': 'password format error',
    };
    statusNum = 400;
  }
  if (statusNum !== 200) {
    res.status(statusNum).json(obj);
    return;
  }
  usersDb.findUserInfo(email, (userinfo) => {
    let passwordInDb = encryptoData.decryptoData(userinfo.password);
    password = encryptoData.encryptoData(password);
    password = encryptoData.decryptoData(password);
    if (userinfo === undefined) {
      obj = {
        'error': 'something went wrong',
      };
      statusNum = 500;
      // wait encrypt function
    } else if (password === passwordInDb) {
      let userId = userinfo._id;
      let userAgent = req.headers['user-agent'];
      let tokenData = tokensDb.createToken(userId, userAgent);
      obj = {
        'expiresAt': tokenData.expiresAt,
        'token': tokenData.token,
      };
      statusNum = 200;
    } else {
      obj = {
        'error': 'password or username not match',
      };
      statusNum = 403;
    }
    res.status(statusNum).json(obj);
  });
}

function validateEmail(email) {
  let reg = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  return reg.test(email);
}
function validatePossword(password) {
  let reg = /\S{6,}/;
  return reg.test(password);
}

module.exports= {
  login: login,
};
