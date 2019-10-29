const flipSound = '../media/sounds/flip.mp3';
const tilesToPick = [];

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

const start = (x, y) => {
  draw(x, y);
  setTimeout(unflipAll, 1000);
  setTimeout(() => {
    patternPick(3);
  }, 2000);
  setTimeout(unflipAll, 3000);
  setTimeout(turnBoard, 4000);
};

const summary = () => {
  const scoreNode = document.getElementById(SCORE);
  let score = parseInt(scoreNode.textContent);
  window.localStorage.setItem(SCORE, score);
  window.location.href = SUMMARY;
};

const flipTile = tile => {
  new Audio(flipSound).play();
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

const isCorrect = tile => {
  if (tilesToPick.includes(parseInt(tile.id))) {
    tilesToPick.splice(tilesToPick.indexOf(parseInt(tile.id)), 1);
    changeScore(1);
  } else {
    new Audio(flipSound).play();
    tile.classList.add(INCORRECT);
    changeScore(-1);
  }
};

const blankTiles = () => {
  let tileList = document.getElementsByClassName(GAME_TILE);
  for (let i = 0; i < tileList.length; ++i) {
    tileList[i].classList = GAME_TILE_START;
  }
};

const completeRound = () => {
  if (tilesToPick.length == 0) {
    setTimeout(() => {
      start(6, 6);
    }, 500);
  }
};

const unflipAll = () => {
  let tileList = document.getElementsByClassName(GAME_TILE);
  for (let i = 0; i < tileList.length; ++i) {
    if (tileList[i].classList.contains(FLIP)) {
      new Audio(flipSound).play();
    }
    tileList[i].classList = GAME_TILE;
    setTimeout(500);
  }
};

const turnBoard = () => {
  let gameBoard = document.getElementById(GAME_BOARD);
  if (gameBoard.classList.contains(FLIP)) {
    gameBoard.classList.remove(FLIP);
  } else {
    gameBoard.classList.add(FLIP);
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

const draw = (x, y) => {
  let gameBoard = document.getElementById(GAME_BOARD);
  gameBoard.innerHTML = '';
  gameBoard.style.width = `${81 * x + 20}px`;
  gameBoard.style.height = `${81 * y + 20}px`;

  for (let i = 0; i < x * y; ++i) {
    let tile = document.createElement(DIV);
    tile.id = i;
    tile.classList.add(GAME_TILE);
    tile.classList.add(START);
    tile.onclick = function() {
      isCorrect(this);
      flipTile(this);
      completeRound();
    };
    gameBoard.appendChild(tile);
  }
};
