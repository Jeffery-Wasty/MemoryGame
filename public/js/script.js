/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const tilesToPick = [];
const tilesLeft = [];
const progression = [];

window.onload = () => {
  document.getElementById(GAME_BOARD).classList.remove(HIDDEN);
};

// start
// Input: width, height, tiles; the width, height, and number of starting tiles to find
//
// Starts the game by running several functions:
// Push the passed layout to a progression array
// Reset the 'X tiles left' help text
// Create game tiles in default hidden state
// Unflip out of hidden state
// Choose the tiles to find
// Unflip the tiles to find (to hide)
// Allow user to interact with board
// Update the header with number of tiles to find
// Update the header with current trial number
// Rotate the board 90 degrees
const start = (width, height, tiles) => {
  progression.push([width, height, tiles]);
  resetHelpText(tiles);
  draw(width, height);
  setTimeout(unflipAll, 1000);
  new Audio(REFRESH_SOUND).play();
  setTimeout(() => {
    pickTiles(tiles);
  }, 2000);
  setTimeout(unflipAll, 3000);
  document.getElementById(GAME_BOARD).style.pointerEvents = AUTO;
  changeTileCount(tiles);
  increaseTrialCount();
  setTimeout(turnBoard, 4000);
};

// promptModal
// Input: mod; a module
//
// Shows/hides the prompt modal.
const promptModal = mod => {
  let modal = document.getElementById(mod);

  modal.style.display =
    !modal.style.display || modal.style.display == NONE ? BLOCK : NONE;
};

// startModal
// Input: mod; a module
//
// Shows/hides the start modal.
const startModal = mod => {
  let modal = document.getElementById(mod);

  modal.style.display =
    !modal.style.display || modal.style.display == BLOCK ? NONE : BLOCK;
};

// resetHelpText
// Input: tiles; the number of tiles to find
//
// Resets the help text that appears on a wrong choice.
const resetHelpText = tiles => {
  tilesLeft[0] = tiles;
  document.getElementById(UNCOVER_COUNT).textContent =
    ' ' + tiles.toString() + ' ';
  document.getElementById(UNCOVER_TEXT).style.display = NONE;
};

// draw
// Input: width, height; width and height of board
//
// Draws the board, adding tiles, and assigning functions to tiles.
const draw = (width, height) => {
  let gameBoard = document.getElementById(GAME_BOARD);

  hideTile();
  gameBoard.innerHTML = '';
  gameBoard.style.width = `${81 * width + 20}px`;
  gameBoard.style.height = `${81 * height + 20}px`;

  for (let i = 0; i < width * height; ++i) {
    let tile = document.createElement(DIV);

    tile.id = i;
    tile.classList.add(GAME_TILE, FLIP_NINETY);
    tile.onclick = function() {
      isCorrect(this);
      flipTile(this);
      completeRound();
    };
    gameBoard.appendChild(tile);
  }
};

// hideTile
//
// Used to hide the tiles by turning them 90 degrees on the
// x-axis. Makes redrawing look cleaner.
const hideTile = () => {
  let tileList = document.getElementsByClassName(GAME_TILE);

  for (let i = 0; i < tileList.length; ++i) {
    if (tileList[i].classList.contains(FLIP_NINETY)) {
      tileList[i].classList.remove(FLIP_NINETY);
    } else {
      tileList[i].classList.add(FLIP_NINETY);
    }
  }
};

// isCorrect
// Input: tile; tile to check
//
// Checks if the pick was a correct one. Styling is applied
// if the pick was incorrect, or the last correct pick.
const isCorrect = tile => {
  if (tilesToPick.includes(parseInt(tile.id))) {
    tilesToPick.splice(tilesToPick.indexOf(parseInt(tile.id)), 1);
    changeScore(1);
    if (tilesToPick.length == 0) {
      new Audio(CORRECT_SOUND).play();
      tile.classList.add(CORRECT);
    }
    return;
  } else {
    new Audio(ERROR_SOUND).play();
    tile.classList.add(INCORRECT);
    document.getElementById(UNCOVER_TEXT).style.display = BLOCK;
  }
  tilesLeft[0] -= 1;
  decreaseHintCount();
  changeScore(-1);
};

// changeScore
// Input: change; the score change
//
// Change the user score by the amount passed in.
const changeScore = change => {
  let scoreNode = document.getElementById(SCORE_COUNT);
  let score = parseInt(scoreNode.textContent);

  score += change;
  scoreNode.textContent = score;
  if (score <= 0) {
    document.getElementById(UNCOVER_TEXT).textContent = 'Sorry! Game over.';
    setTimeout(passScore, 500);
  }
};

// passScore
//
// Passes the score onto the summary page
const passScore = () => {
  let scoreNode = document.getElementById(SCORE_COUNT);
  let score = parseInt(scoreNode.textContent);

  window.localStorage.setItem(SCORE, score);
  window.location.href = SUMMARY;
};

// decreaseHintCount
//
// Decreases the 'tiles remaining' in the hint.
const decreaseHintCount = () => {
  let hintCount = document.getElementById(UNCOVER_COUNT);
  let count = parseInt(hintCount.textContent);

  count -= 1;
  hintCount.textContent = ' ' + count.toString() + ' ';
};

// flipTile
// Input: tile; tile to flup
//
// Flips a tile, playing a sound
const flipTile = tile => {
  new Audio(FLIP_SOUND).play();
  if (!tile.classList.contains(FLIP)) {
    tile.classList.add(FLIP);
  } else {
    tile.classList.remove(FLIP);
  }
};

// completeRound
//
// Starts a new round. Clicking the board is disabled during this process.
const completeRound = () => {
  if (tilesToPick.length == 0) {
    let tileList = document.getElementsByClassName(GAME_TILE);
    let newDims = 0;

    document.getElementById(GAME_BOARD).style.pointerEvents = NONE;
    for (let i = 0; i < tileList.length; ++i) {
      if (tileList[i].classList.contains(INCORRECT)) {
        newDims = progressGame(-1);
        break;
      }
    }
    if (newDims == 0) {
      newDims = progressGame(1);
    }

    setTimeout(() => {
      start(newDims[0], newDims[1], newDims[2]);
    }, 2000);
  }
};

// progressGame
// Input: result; round result
// Output: newDims; new dimensions of game
//
// Takes in a result from the round: 1 if the user selected all
// tiles, -1 if they did not. Looks at the last dimensions stored
// in 'progression'.
//
// If the matrix is minimum size and result is -1, remove a tile to find
// Else randomly select between add/remove a tile OR expand/contract the
// board. Whether height or width is expanded/contracted is also random.
const progressGame = result => {
  let last = progression[progression.length - 1];
  let newDims = [];

  if (last[0] == 5 && last[1] == 5 && result == -1) {
    newDims = last;
    newDims[2] = last[2] + result;
    return newDims;
  }

  let pick = Math.floor(Math.random() * 2);

  if (pick == 0) {
    newDims = last;
    newDims[2] = last[2] + result;
    return newDims;
  } else {
    pick = Math.floor(Math.random() * 2);
    newDims = last;
    newDims[0] = last[0] + result * pick;
    newDims[1] = last[1] + result * Math.abs(pick - 1);
    return newDims;
  }
};

// unflipAll
//
// Unflips all tiles, removing all extra classes
// (correct, incorrect, flip, flip-ninety)
const unflipAll = () => {
  let tileList = document.getElementsByClassName(GAME_TILE);

  for (let i = 0; i < tileList.length; ++i) {
    if (tileList[i].classList.contains(FLIP)) {
      new Audio(FLIP_SOUND).play();
    }
    tileList[i].classList = GAME_TILE;
    setTimeout(1000);
  }
};

// pickTiles
// Input: numberToPick; number of tiles to pick
//
// Picks a number of tiles randomly to be the tiles
// the user must find.
const pickTiles = numberToPick => {
  let tileList = document.getElementsByClassName(GAME_TILE);

  tilesToPick.length = 0;
  for (let i = 0; i < numberToPick; ++i) {
    let index = Math.floor(Math.random() * tileList.length);

    while (tilesToPick.includes(index)) {
      index = Math.floor(Math.random() * tileList.length);
    }
    tilesToPick.push(index);
    flipTile(tileList[index]);
  }
};

// changeTileCount
// Input: newCount; the new tile count
//
// Change the tile to find count in the header
const changeTileCount = newCount => {
  let tileCount = document.getElementById(TILE_COUNT);
  tileCount.textContent = newCount;
};

// increaseTrialCount
//
// Increases the trial in the header by 1.
const increaseTrialCount = () => {
  let trialNode = document.getElementById(TRIAL_COUNT);
  let trial = parseInt(trialNode.textContent);

  trialNode.textContent = ++trial;
};

// turnBoard
//
// Turns the board 90 degrees: either clockwise or counterclockwise
const turnBoard = () => {
  let gameBoard = document.getElementById(GAME_BOARD);

  if (!gameBoard.classList.contains(NINETY)) {
    gameBoard.classList.add(NINETY);
  } else {
    gameBoard.classList.remove(NINETY);
  }
};
