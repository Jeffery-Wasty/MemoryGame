/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
window.onload = () => {
  readScore();
};

// readScore
//
// Reads score from local storage, save into an element.
const readScore = () => {
  let scoreNodeSummary = document.getElementById(SCORE);
  let score = window.localStorage.getItem(SCORE);

  scoreNodeSummary.value = score;
};

// saveName
//
// Reads name from element, saves into local storage.
const saveName = () => {
  let nameNode = document.getElementById(NAME);

  window.localStorage.setItem(NAME, nameNode.value);
};

// redirect
//
// Redirect back to index.
const redirect = () => {
  window.location.href = INDEX;
};
