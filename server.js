'use strict';
var express = require('express');
var app = express();
app.use(express.static('src'));
app.get('/', (req, res) => {
  res.send('src/index.html');
})
app.listen(3000, () => {
  console.log('listening to port:3000');
});