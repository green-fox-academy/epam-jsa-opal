'use strict';
let express = require('express');
let app = express();
app.use(express.static('src'));
app.use(express.static('dist'));
app.get('/', (req, res) => {
  res.send('src/index.html');
});
app.listen(3000, () => {
  console.log('listening to port:3000');
});
