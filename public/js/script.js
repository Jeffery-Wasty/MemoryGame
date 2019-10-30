/* eslint-disable no-undef */
const tilesToPick = [];
const tilesLeft = [];
const progression = [];

window.onload = () => {
  document.getElementById(GAME_BOARD).classList.remove(HIDDEN);
};

const promptModal = mod => {
  let modal = document.getElementById(mod);
  modal.style.display =
    !modal.style.display || modal.style.display == NONE ? BLOCK : NONE;
};

const startModal = mod => {
  let modal = document.getElementById(mod);
  modal.style.display =
    !modal.style.display || modal.style.display == BLOCK ? NONE : BLOCK;
};

const progressGame = result => {
  if (progression.length == 0) {
    return;
  }

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

const start = (x, y, z) => {
  progression.push([x, y, z]);
  tilesLeft[0] = z;
  document.getElementById(UNCOVER_COUNT).textContent = ' ' + z.toString() + ' ';
  draw(x, y);
  document.getElementById(GAME_BOARD).style.pointerEvents = AUTO;
  setTimeout(unflipAll, 1000);
  setTimeout(() => {
    patternPick(z);
  }, 2000);
  changeTileCount(z);
  setTimeout(unflipAll, 3000);
  increaseTrialCount();
  setTimeout(turnBoard, 4000);
};

const summary = () => {
  const scoreNode = document.getElementById(SCORE);
  let score = parseInt(scoreNode.textContent);
  window.localStorage.setItem(SCORE, score);
  window.location.href = SUMMARY;
};

const flipTile = tile => {
  new Audio(FLIP_SOUND).play();
  if (!tile.classList.contains(FLIP)) {
    tile.classList.add(FLIP);
  } else {
    tile.classList.remove(FLIP);
  }
};

const changeScore = change => {
  const scoreNode = document.getElementById(SCORE);

  let score = parseInt(scoreNode.textContent);

  score += change;
  scoreNode.textContent = score;
  if (score <= 0) {
    window.localStorage.setItem(SCORE, score);
    window.location.href = SUMMARY;
  }
};

const changeTileCount = newCount => {
  const tileCount = document.getElementById(TILE_COUNT);

  let count = parseInt(tileCount.textContent);
  count = newCount;
  tileCount.textContent = count;
};

const isCorrect = tile => {
  if (tilesToPick.includes(parseInt(tile.id))) {
    tilesToPick.splice(tilesToPick.indexOf(parseInt(tile.id)), 1);
    changeScore(1);
    if (tilesToPick.length == 0) {
      new Audio(FLIP_SOUND).play();
      tile.classList.add(CORRECT);
    }
  } else {
    new Audio(ERROR_SOUND).play();
    tile.classList.add(INCORRECT);
    changeScore(-1);
    document.getElementById(UNCOVER_TEXT).style.display = BLOCK;
  }
  tilesLeft[0] -= 1;
  changeHintCount(-1);
};

const changeHintCount = change => {
  const hintCount = document.getElementById(UNCOVER_COUNT);

  let count = parseInt(hintCount.textContent);
  count += change;
  hintCount.textContent = ' ' + count.toString() + ' ';
};

const blankTiles = () => {
  let tileList = document.getElementsByClassName(GAME_TILE);
  for (let i = 0; i < tileList.length; ++i) {
    tileList[i].classList = GAME_TILE_START;
  }
  setTimeout(1000);
};

const increaseTrialCount = () => {
  let trialNode = document.getElementById(TRIAL_COUNT);
  let trial = parseInt(trialNode.textContent);

  trial += 1;
  trialNode.textContent = trial;
};

const completeRound = () => {
  if (tilesLeft[0] == 0) {
    document.getElementById(GAME_BOARD).style.pointerEvents = NONE;
    let tileList = document.getElementsByClassName(GAME_TILE);
    let newDims = 0;
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

const turnBoard = () => {
  let gameBoard = document.getElementById(GAME_BOARD);
  if (!gameBoard.classList.contains(NINETY)) {
    gameBoard.classList.add(NINETY);
  } else {
    gameBoard.classList.remove(NINETY);
  }
};

const patternPick = numberToPick => {
  tilesToPick.length = 0;
  let tileList = document.getElementsByClassName(GAME_TILE);
  for (let i = 0; i < numberToPick; ++i) {
    let index = Math.floor(Math.random() * tileList.length);
    while (tilesToPick.includes(index)) {
      index = Math.floor(Math.random() * tileList.length);
    }
    tilesToPick.push(index);
    flipTile(tileList[index]);
  }
};

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

const draw = (x, y) => {
  let gameBoard = document.getElementById(GAME_BOARD);
  hideTile();
  gameBoard.innerHTML = '';
  gameBoard.style.width = `${81 * x + 20}px`;
  gameBoard.style.height = `${81 * y + 20}px`;

  for (let i = 0; i < x * y; ++i) {
    let tile = document.createElement(DIV);
    tile.id = i;
    tile.classList.add(GAME_TILE);
    tile.classList.add(FLIP_NINETY);
    tile.onclick = function() {
      isCorrect(this);
      flipTile(this);
      completeRound();
    };
    gameBoard.appendChild(tile);
  }
};
