let CryptoJS = require('crypto-js');

let password = CryptoJS.AES.encrypt('HAOCHENLI', 'Secret Passphrase');
let decrypted = CryptoJS.AES.decrypt(password, 'Secret Passphrase');
let password2 = CryptoJS.AES.encrypt('HAOCHENLI', 'Secret Passphrase');
let decrypted2 = CryptoJS.AES.decrypt(password2, 'Secret Passphrase');

console.log(password.toString());
console.log(password2.toString());

console.log(decrypted.toString());
console.log(decrypted2.toString());
