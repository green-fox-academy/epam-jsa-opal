'use strict';
let express = require('express');
let app = express();
app.use(express.static('dist'));
app.get('/', (req, res) => {
  res.send('dist/index.html');
});
app.listen(3000, () => {
  console.log('listening on port:3000');
});
