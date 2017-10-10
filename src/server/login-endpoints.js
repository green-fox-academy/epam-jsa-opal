function login(req, res, usersDb) {
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
  } else if (validateEmail(email) === false) {
    obj = {
      'error': 'email format error',
    };
    statusNum = 400;
  } else if (validatePossword(password) === false) {
    obj = {
      'error': 'password format error(with space or less than 6 charaters)',
    };
    statusNum = 400;
  } else if (email === undefined || password === undefined) {
    obj = {
      'error': 'missing field',
    };
    statusNum = 400;
  }
  if (statusNum !== 200) {
    res.status(statusNum).json(obj);
    return;
  }
  usersDb.findUserInfo(email, (userinfo) => {
    if (userinfo === undefined) {
      obj = {
        'error': 'something went wrong',
      };
      statusNum = 500;
    } else if (password === userinfo.password) {
      let days = 7;
      let expiresAt = new Date().getTime() + days * 24 * 60 * 60 * 1000;
      obj = {
        'expiresAt': expiresAt,
        'token': userinfo.token,
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
