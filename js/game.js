"use strict";
const BOARD_SIZE = 14;
const ALIEN_ROW_LENGTH = 8;
const ALIEN_ROW_COUNT =2;
const HERO = "🛸";
const ALIEN = "👽";
const LASER = "⤊";
const EXPLOSION = '💥'
// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard;
var gGame = {
  isOn: false,
  alienCount: ALIEN_ROW_LENGTH * ALIEN_ROW_COUNT,
  score:0,
};
// Called when game loads
function init() {
  gBoard = createBoard();
  createHero(gBoard);
  createAliens(gBoard);

  renderBoard(gBoard);
}
// Create and returns the board with aliens on top, ground at bottom
// use the functions: createCell, createHero, createAliens
function createBoard() {
  const board = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    board[i] = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      
      // var type = (i === board.length-1) ? 'Floor':'Sky'
      // board[i][j] = createCell(type,'');
      board[i][j] = createCell('','');
      
      
      // if(i === board.length-1)
    }
  }
console.log(board);
  return board;
}
// Render the board as a <table> to the page
function renderBoard(board) {
  const elContainer = document.querySelector(".board-container");
  var strHtml = "";
  for (let i = 0; i < board.length; i++) {
    strHtml += "<tr>";
    for (let j = 0; j < board[0].length; j++) {
      const cell = gBoard[i][j];
      strHtml += `<td class="cell" data-i="${i}" data-j="${j}">${cell.gameObject}</td>`;
    }
    strHtml += "</tr>";
  }
  elContainer.innerHTML = strHtml;
}
// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
function createCell(type='sky',gameObject = null) {
  return {
    type: type,
    gameObject: gameObject,
  };
}
function updateCell(pos, gameObject = null) {
  gBoard[pos.i][pos.j].gameObject = gameObject;
  var elCell = getElCell(pos);
  elCell.innerHTML = gameObject || "";
}


function updateScore(diff = 0){
  const elScore = document.querySelector('.score span')
  if(gGame.isOn) gGame.score += diff
  else gGame.score = 0
  elScore.innerText = gGame.score

  var endGameScore = ALIEN_ROW_LENGTH * ALIEN_ROW_COUNT * 10
  if(gGame.score === endGameScore)gameOver(true)  
}

function startOver() {
  // gGame.isOn = false
  updateScore()
  init()
}
function startGame(){
  gGame.isOn = true
  var elBtn = document.querySelector('.restart-btn')
  elBtn.innerText = 'Restart'
  playSound('background')

  moveAliens()
}


function gameOver(isWin){
  if(!isWin){
    playSound('gameOver')

  }
  
  
  
  stopBackgroundSoundSound()
  console.log('Game over');
  gGame.isOn = false
  clearInterval(gIntervalAliens)
}



