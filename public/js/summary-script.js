/* eslint-disable no-undef */
window.onload = () => {
  readScore();
};

const readScore = () => {
  const scoreNodeSummary = document.getElementById('score-result-node');
  let score = window.localStorage.getItem('score');
  scoreNodeSummary.value = score;
};

const saveName = () => {
  const nameNode = document.getElementById('name-field');
  let name = parseInt(nameNode.textContent);
  window.localStorage.setItem('name', name);
};

const redirect = () => {
  window.location.href = INDEX;
};
