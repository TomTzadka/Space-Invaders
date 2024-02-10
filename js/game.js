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

// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard;
var gGame = {
  isOn: false,
  alienCount: ALIEN_ROW_LENGTH * ALIEN_ROW_COUNT,
  score:0,
  isSuperMode:false
};
// Called when game loads
function init() {
  gBoard = createBoard();
  createHero(gBoard);
  createAliens(gBoard);
  renderBoard(gBoard);
  createShield(5)
  // AliensShoot()
}
// Create and returns the board with aliens on top, ground at bottom
// use the functions: createCell, createHero, createAliens
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
// Render the board as a <table> to the page
function renderBoard(board) {
  const elContainer = document.querySelector(".board-container");
  var strHtml = "";
  for (let i = 0; i < board.length; i++) {
    strHtml += "<tr>";
    for (let j = 0; j < board[0].length; j++) {
      const cell = gBoard[i][j];
      // if (cell.type === 'ground')
      var cellClass = (cell.type === 'ground') ? 'cell ground' : 'cell'
      strHtml += `<td class="${cellClass}" data-i="${i}" data-j="${j}">${cell.gameObject}</td>`;
    }
    strHtml += "</tr>";
  }
  elContainer.innerHTML = strHtml;
}
// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
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

  // var endGameScore = ALIEN_ROW_LENGTH * ALIEN_ROW_COUNT * 10
  // if(gGame.score === endGameScore)gameOver(true)  
}


function startGame(elBtn){
  // var elBtn = document.querySelector('.restart-btn')
  if(elBtn.innerText === 'Restart'){
    initGameProperties()
    elBtn.innerText = 'Start'
    init()

    return
  }
  gGame.isOn = true
  elBtn.innerText = 'Restart'
  // playSound('background')
  


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
  

  if(!isWin){
    playSound('gameOver')
  }else{
    stopBackgroundSoundSound()
    console.log('Game over yoe win');
  }

  
}


function candyAppear(){
  var randomInt=getRandomInt(0,gBoard[0].length-1)
  var candyPos = {i:0,j:randomInt}
  updateCell(candyPos,CANDY)
}

function superMode(){
  gGame.isSuperMode = true
  console.log(gGame.isSuperMode);
  
  console.log(gGame.isSuperMode);
  setTimeout(() => {
    
    gGame.isSuperMode = false
    console.log(gGame.isSuperMode);
  }, 3000);
}


function createShield(size){
  for (let j = 1; j < size; j++) {
    // gBoard[i][j].gameObject = 'shield'
    updateCell({i:11,j:j},'','ground')

    const elCell = document.querySelector(`td.cell[data-i="11"][data-j="${j}"]`);
    elCell.classList.add('ground');
  }
}


