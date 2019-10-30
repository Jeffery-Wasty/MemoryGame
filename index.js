const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.set('view engine', 'pug');

mongoose.connect(
  'mongodb+srv://jeffw:uP3DZBaGTkTVg8N@cluster0-eqnvp.mongodb.net/test?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

let routes = require('./routes/game');

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, 'public')))
  .use(routes)
  .listen(3000);
