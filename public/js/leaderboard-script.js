window.onload = () => {
  readScore();
  readName();
};

const readScore = () => {
  const scoreNodeSummary = document.getElementById('score-node');
  let score = window.localStorage.getItem('score');
  scoreNodeSummary.textContent = score;
};

const readName = () => {
  const nameNodeSummary = document.getElementById('name-node');
  let name = window.localStorage.getItem('name');
  nameNodeSummary.textContent = name;
};

const redirect = () => {
  window.location.href = INDEX;
};
