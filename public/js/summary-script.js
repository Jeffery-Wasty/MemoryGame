/* eslint-disable no-undef */
window.onload = () => {
  readScore();
};

const readScore = () => {
  const scoreNodeSummary = document.getElementById(SCORE);
  let score = window.localStorage.getItem(SCORE);
  scoreNodeSummary.value = score;
};

const saveName = () => {
  const nameNode = document.getElementById(NAME);
  let name = nameNode.value;
  window.localStorage.setItem(NAME, name);
};

const redirect = () => {
  window.location.href = INDEX;
};
