const express = require('express');
const path = require('path');
const app = express();

let routes = require('./routes/game');

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(3000, () => console.log('Server ready'));
