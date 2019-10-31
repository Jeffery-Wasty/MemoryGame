const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/game');

mongoose.connect(
  'mongodb+srv://jeffw:uP3DZBaGTkTVg8N@cluster0-eqnvp.mongodb.net/test?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

app
  .set('view engine', 'pug')
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, 'public')))
  .use(routes)
  .listen(process.env.PORT || 3005, '0.0.0.0');
