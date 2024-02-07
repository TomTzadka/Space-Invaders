"use strict";
const BOARD_SIZE = 14;
const ALIEN_ROW_LENGTH = 8;
const ALIEN_ROW_COUNT = 3;
const HERO = "🛸";
const ALIEN = "👽";
const LASER = "⤊";
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
  moveAliens()
}
// Create and returns the board with aliens on top, ground at bottom
// use the functions: createCell, createHero, createAliens
function createBoard() {
  const board = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    board[i] = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      board[i][j] = createCell("");
    }
  }

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
function createCell(gameObject = null) {
  return {
    type: "SKY",
    gameObject: gameObject,
  };
}
// position such as: {i: 2, j: 7}
function updateCell(pos, gameObject = null) {
  gBoard[pos.i][pos.j].gameObject = gameObject;
  var elCell = getElCell(pos);
  elCell.innerHTML = gameObject || "";
}


function updateScore(diff){
    gGame.score += diff
    const elScore = document.querySelector('.score span')
    elScore.innerText = gGame.score
}
