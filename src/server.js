'use strict';
var express =  require('express');
var app = express();
app.use(express.static('dist'));
app.get('/', (req, res) => {
  res.send('dist/index.html');
})
app.listen(3000, () => {
  console.log('listening to port:3000');
});