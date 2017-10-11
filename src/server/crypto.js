'use strict';
let CryptoJS = require('crypto-js');

function crypto(String) {
  let encrypted = CryptoJS.AES.encrypt(String, 'Secret Passphrase');
  return encrypted.toString();
}

module.exports = {
  encryptoData: crypto,
};
// let encrypted = CryptoJS.AES.encrypt(req.body.password, 'Secret Passphrase');
// let decrypted = CryptoJS.AES.decrypt(encrypted, 'Secret Passphrase');
// console.log(decrypted.toString(CryptoJS.enc.Utf8));
