const score = require('../models/gameData');

// index
// Input: _req,res: request and response
//
// Render index page.
const index = (_req, res) => {
  res.render('index', {});
};

// summary
// Input: _req,res: request and response
//
// Render summary page.
const summary = (_req, res) => {
  res.render('summary', {});
};

// leaderboard
// Input: _req,res: request and response
//
// Get top scores.
const leaderboard = (_req, res) => {
  score.gettop(res);
};

// postAddScore
// Input: _req,res: request and response
//
// Read name,score from form, add to db, redirect to leaderboard
const postAddScore = (req, res) => {
  score.add(req);
  res.redirect(301, '/leaderboard');
};

module.exports = {
  index: index,
  summary: summary,
  leaderboard: leaderboard,
  postAddScore: postAddScore
};
