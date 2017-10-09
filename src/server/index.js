'use strict';
const express = require('express');

const app = express();

app.use(express.static('dist'));
app.get('/heartbeat', (req, res) => {
  res.json({status: 'ok'});
});

/* eslint no-console: "off" */
let portNum = process.env.PORT || 3000;
app.listen(portNum, () => {
  console.log(`listening on port:${portNum}`);
});
