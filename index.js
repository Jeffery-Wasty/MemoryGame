const express = require('express');
const path = require('path');
let bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/comp3717_assignment1', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

let routes = require('./routes/game');

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, 'public')))
  .use(routes)
  .listen(3000);
