window.onload = () => {
  readScore();
};

const readScore = () => {
  const scoreNodeSummary = document.getElementById('score-result-node');
  let score = window.localStorage.getItem('score');
  scoreNodeSummary.textContent = score;
};
