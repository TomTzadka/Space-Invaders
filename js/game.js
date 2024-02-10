"use strict";
const BOARD_SIZE = 14;
const ALIEN_ROW_LENGTH = 8;
const ALIEN_ROW_COUNT =2;
const HERO = "🛸";
const ALIEN = "👽";
const LASER = "⤊";
const EXPLOSION = '💥'
const CANDY = '🍭'
const ROCK = '🪨'
var gCandyInterval;

var gBoard;
var gGame = {
  isOn: false,
  alienCount: ALIEN_ROW_LENGTH * ALIEN_ROW_COUNT,
  score:0,
  isSuperMode:false
};
function init() {
  gBoard = createBoard();
  createHero(gBoard);
  createAliens(gBoard);
  renderBoard(gBoard);
  createBunkers(5)
}
function createBoard() {
  const board = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    board[i] = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      var type = (i === BOARD_SIZE-1) ? 'ground':'sky'
        board[i][j] = createCell('',type);
    }
  }
console.log(board);
  return board;
}
function renderBoard(board) {
  const elContainer = document.querySelector(".board-container");
  var strHtml = "";
  for (let i = 0; i < board.length; i++) {
    strHtml += "<tr>";
    for (let j = 0; j < board[0].length; j++) {
      const cell = gBoard[i][j];
      var cellClass = (cell.type === 'ground') ? 'cell ground' : 'cell'
      strHtml += `<td class="${cellClass}" data-i="${i}" data-j="${j}">${cell.gameObject}</td>`;
    }
    strHtml += "</tr>";
  }
  elContainer.innerHTML = strHtml;
}
function createCell(gameObject = null,type ='sky') {
  return {
    type: type,
    gameObject: gameObject,
  };
}
function updateCell(pos, gameObject = null,type='sky') {
  gBoard[pos.i][pos.j].gameObject = gameObject;
  gBoard[pos.i][pos.j].type = type;
  var elCell = getElCell(pos);
  elCell.innerHTML = gameObject || "";
}

function updateScore(diff = 0){
  const elScore = document.querySelector('.score span')
  if(gGame.isOn) gGame.score += diff
  else gGame.score = 0
  elScore.innerText = gGame.score
}

function startGame(elBtn){
  if(elBtn.innerText === 'Restart'){
    initGameProperties()
    elBtn.innerText = 'Start'
    init()
    return
  }
  gGame.isOn = true
  elBtn.innerText = 'Restart'
  playSound('background')
  moveAliens()
  setTimeout(() => {
    AliensShoot()  
  }, 700);
  
}


function initGameProperties(){
  clearInterval(gIntervalAliens)
  clearInterval(gCandyInterval)
  clearInterval(gLaserInterval)
  gGame.isOn = false
  gGame.alienCount = 0
  gGame.isSuperMode = false
  gGame.score = 0
}

function gameOver(isWin){
  initGameProperties()
  var soundToPlay = (!isWin) ? 'gameOver' : 'victory'
  playSound(soundToPlay)
  stopBackgroundSoundSound()
  
}

function candyAppear(){
  var randomInt=getRandomInt(0,gBoard[0].length-1)
  var candyPos = {i:0,j:randomInt}
  updateCell(candyPos,CANDY)
  setTimeout(() => {
    updateCell(candyPos,'')
  }, 5000);
}

function superMode(){
  gGame.isSuperMode = true
  setTimeout(() => {
    gGame.isSuperMode = false
  }, 3000);
}


function createBunkers(size){
  for (let j = 1; j < size; j++) {
    updateCell({i:11,j:j},'','ground')
    const elCell = document.querySelector(`td.cell[data-i="11"][data-j="${j}"]`);
    elCell.classList.add('ground');
  }
}





