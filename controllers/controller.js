let Score = require('../models/gameData');

const game = (req, res) => {
  res.render('index', {});
};

const summary = (req, res) => {
  res.render('summary', {});
};

const leaderboard = (req, res) => {
  Score.gettop(res);
};

const postAddScore = (req, res) => {
  Score.add(req);
  res.redirect(301, '/leaderboard');
};

module.exports = {
  game: game,
  summary: summary,
  leaderboard: leaderboard,
  postAddScore: postAddScore
};
