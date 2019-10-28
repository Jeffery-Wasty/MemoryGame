const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router
  .get('/', controller.game)
  .get('/summary', controller.summary)
  .get('/leaderboard', controller.leaderboard)
  .post('/score/add', controller.postAddScore);

module.exports = router;
