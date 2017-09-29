'use strict';
const express = require('express');

const app = express();

app.use(express.static('dist'));
app.get('/heartbeat', (req, res) => {
  res.json({status: 'ok'});
});

/* eslint no-console: "off" */
app.listen(3000, () => {
  console.log('listening on port:3000');
});
