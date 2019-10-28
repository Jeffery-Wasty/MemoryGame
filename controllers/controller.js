const path = require('path');
let Score = require('../models/gameData');

const game = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
};

const summary = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views', 'summary.html'));
};

const leaderboard = (req, res, next) => {
  Score.getall();
  res.sendFile(path.join(__dirname, '../views', 'leaderboard.html'));
};

const postAddScore = (req, res, next) => {
  Score.add(req);
  res.redirect(301, '/');
};

module.exports = {
  game: game,
  summary: summary,
  leaderboard: leaderboard,
  postAddScore: postAddScore
};
