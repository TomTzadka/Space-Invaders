"use strict";
const ALIEN_SPEED = 500;
var gIntervalAliens;
// The following two variables represent the part of the matrix (some rows)
// that we should shift (left, right, and bottom)
// We need to update those when:
// (1) shifting down and (2) last alien was cleared from row
var gAliensTopRowIdx;
var gAliensBottomRowIdx;
var gIsAlienFreeze = true;

function createAliens(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if ((i < ALIEN_ROW_COUNT) & (j < ALIEN_ROW_LENGTH))
        board[i][j] = createCell("", ALIEN);
    }
  }
}
function handleAlienHit(pos) {
  playSound('hit')
  updateScore(10);
  updateCell(pos, EXPLOSION);

  setTimeout(() => {
    updateCell(pos);
  }, 150);
  console.log("handleAlienHit(pos)", pos);
}
function shiftBoardRight(board, fromI, toI) {
  for (let i = fromI; i < toI; i++) {
    for (let j = board[i].length - 1; j >= 0; j--) {
      const cell = board[i][j];
      if (cell.gameObject === ALIEN) {
        if (j === board[i].length - 1) {
          shiftBoardDown(board, fromI, toI, true);
          return;
        }
        updateCell({ i: i, j: j + 1 }, ALIEN);
        updateCell({ i: i, j: j });
      }
    }
  }
}
function shiftBoardLeft(board, fromI, toI) {
  for (let i = fromI; i < toI; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const cell = board[i][j];
      if (cell.gameObject === ALIEN) {
        if (j === 0) {
          shiftBoardDown(board, fromI, toI, false);
          return;
        }
        updateCell({ i: i, j: j - 1 }, ALIEN);
        updateCell({ i: i, j: j });
      }
    }
  }
  //   clearInterval(gIntervalAliens);
}
function shiftBoardDown(board, fromI, toI, isRight) {
  console.log("toI", toI);
  if (toI === board.length - 2) return gameOver(false);
  // if (toI === 2) return gameOver(false);  //for tests

  for (let i = toI; i >= fromI; i--) {
    for (let j = 0; j < board[i].length; j++) {
      const cell = board[i][j];
      if (cell.gameObject === ALIEN) {
        updateCell({ i: i + 1, j: j }, ALIEN);
        updateCell({ i: i, j: j });
      }
    }
  }

  clearInterval(gIntervalAliens);

  if (isRight) {
    gIntervalAliens = setInterval(() => {
      shiftBoardLeft(board, fromI + 1, toI + 1);
    }, 300);
  } else {
    gIntervalAliens = setInterval(() => {
      shiftBoardRight(board, fromI + 1, toI + 1);
    }, 300);
  }
}
// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops

function moveAliens() {
  if (!gGame.isOn) return;

  gIntervalAliens = setInterval(() => {
    shiftBoardRight(gBoard, 0, ALIEN_ROW_COUNT);
  }, 300);

}
