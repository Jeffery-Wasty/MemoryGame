var firstTile;
var tilesToPick = [];

window.onload = () => {
  document.getElementById('game-board').classList.remove('hidden');
  draw(5, 5);
};

const start = () => {
  blankTiles();
  setTimeout(unflipAll, 1000);
  setTimeout(patternPick, 2000);
  setTimeout(unflipAll, 3000);
  setTimeout(turnBoard, 4000);
};

const flipTile = tile => {
  new Audio('../media/sounds/flip.mp3').play();
  if (!tile.classList.contains('flip')) {
    tile.classList.add('flip');
  } else {
    tile.classList.remove('flip');
  }
};

const increaseScore = () => {
  const scoreNode = document.getElementById('score');
  let score = parseInt(scoreNode.textContent);
  score += 1;
  scoreNode.textContent = score;
};

const isCorrect = tile => {
  if (tilesToPick.includes(parseInt(tile.id))) {
    tilesToPick.splice(tilesToPick.indexOf(parseInt(tile.id)), 1);
    increaseScore();
  } else {
    new Audio('../media/sounds/wrong.mp3').play();
    tile.classList.add('incorrect');
  }
};

const blankTiles = () => {
  let tileList = document.getElementsByClassName('game-tile');
  for (let i = 0; i < tileList.length; ++i) {
    tileList[i].classList = 'game-tile start';
  }
};

const completeRound = () => {
  if (tilesToPick.length == 0) {
    setTimeout(start, 500);
  }
};

const unflipAll = () => {
  let tileList = document.getElementsByClassName('game-tile');
  for (let i = 0; i < tileList.length; ++i) {
    if (tileList[i].classList.contains('flip')) {
      new Audio('../media/sounds/flip.mp3').play();
    }
    tileList[i].classList = 'game-tile';
    setTimeout(500);
  }
};

const turnBoard = () => {
  let gameBoard = document.getElementById('game-board');
  if (gameBoard.classList.contains('flip')) {
    gameBoard.classList.remove('flip');
  } else {
    gameBoard.classList.add('flip');
  }
};

const patternPick = () => {
  tilesToPick = [];
  let tileList = document.getElementsByClassName('game-tile');
  for (let i = 0; i < 3; ++i) {
    let index = Math.floor(Math.random() * tileList.length);
    while (tilesToPick.includes(index)) {
      index = Math.floor(Math.random() * tileList.length);
    }
    tilesToPick.push(index);
    flipTile(tileList[index]);
  }
};

const draw = (x, y) => {
  let gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  gameBoard.style.width = `${108 * x}px`;
  gameBoard.style.height = `${108 * y}px`;
  for (let i = 0; i < x * y; ++i) {
    let tile = document.createElement('div');
    tile.id = i;
    tile.classList.add('game-tile');
    tile.classList.add('start');
    tile.onclick = function() {
      isCorrect(this);
      flipTile(this);
      completeRound();
    };
    gameBoard.appendChild(tile);
  }
};
