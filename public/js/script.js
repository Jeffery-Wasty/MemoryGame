var firstTile;
var tilesToPick = [];

window.onload = () => {
  draw(5, 5);
};

var stuff = () => {
  unflipAll();
  patternPick();
  setTimeout(unflipAll, 1000);
  setTimeout(turnBoard, 2000);
};

var flipTile = tile => {
  var audio = new Audio('../sounds/flip.mp3');
  audio.play();
  if (!tile.classList.contains('flip')) {
    tile.classList.add('flip');
  } else {
    tile.classList.remove('flip');
  }
};

var unflipAll = () => {
  let tileList = document.getElementsByClassName('game-tile');
  var audio = new Audio('../sounds/flip.mp3');
  for (let i = 0; i < tileList.length; ++i) {
    if (tileList[i].classList.contains('flip')) {
      tileList[i].classList.remove('flip');
      audio.play();
    }
  }
};

var turnBoard = () => {
  let gameBoard = document.getElementById('game-board');
  gameBoard.classList.add('flip');
};

var patternPick = () => {
  tilesToPick = [];
  let tileList = document.getElementsByClassName('game-tile');
  for (let i = 0; i < 3; ++i) {
    var index = Math.floor(Math.random() * tileList.length);
    while (tilesToPick.includes(index)) {
      index = Math.floor(Math.random() * tileList.length);
    }
    tilesToPick.push(index);
    flipTile(tileList[index]);
  }
};

var draw = (x, y) => {
  let gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  gameBoard.style.width = `${54 * x}px`;
  gameBoard.style.height = `${54 * y}px`;
  for (let i = 0; i < x * y; ++i) {
    let tile = document.createElement('div');
    tile.classList = 'game-tile';
    tile.onclick = function() {
      flipTile(this);
    };
    gameBoard.appendChild(tile);
  }
};
