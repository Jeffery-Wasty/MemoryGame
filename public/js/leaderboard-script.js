/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
window.onload = () => {
  readScore();
  readName();
};

// readScore
//
// Reads score from local storage, save into an element.
const readScore = () => {
  let scoreNodeSummary = document.getElementById(SCORE_NODE);
  let score = window.localStorage.getItem(SCORE);

  scoreNodeSummary.textContent = score;
};

// readName
//
// Reads name from local storage, saves into an element.
const readName = () => {
  let nameNodeSummary = document.getElementById(NAME_NODE);
  let name = window.localStorage.getItem(NAME);

  nameNodeSummary.textContent = name;
};

// redirect
//
// Redirect back to index.
const redirect = () => {
  window.location.href = INDEX;
};
