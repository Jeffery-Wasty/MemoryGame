const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});

const model = mongoose.model('Score', scoreSchema);

const getTop5 = res => {
  model.find(
    {},
    ['name', 'score'],
    {
      skip: 0,
      limit: 5,
      sort: {
        score: -1
      }
    },
    (err, scores) => {
      if (err) {
        console.log(err);
      } else {
        res.render('leaderboard', {
          board: [scores[0], scores[1], scores[2], scores[3], scores[4]]
        });
      }
    }
  );
};

const addScore = req => {
  let mod = new model();

  mod.name = req.body.name;
  mod.score = req.body.score;

  mod.save(err => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

module.exports = {
  model: model,
  gettop: getTop5,
  add: addScore
};
