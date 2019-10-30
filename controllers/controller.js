let Score = require('../models/gameData');

const game = (req, res, next) => {
  res.render('index', {});
};

const summary = (req, res, next) => {
  res.render('summary', {});
};

const leaderboard = (req, res, next) => {
  Score.gettop(res);
};

const postAddScore = (req, res, next) => {
  Score.add(req);
  res.redirect(301, '/leaderboard');
};

module.exports = {
  game: game,
  summary: summary,
  leaderboard: leaderboard,
  postAddScore: postAddScore
};
