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

const getAllScores = () => {
  model.find({}, (err, scores) => {
    if (err) {
      console.log(err);
    } else {
      console.log(scores);
    }
  });
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
  getall: getAllScores,
  add: addScore
};
