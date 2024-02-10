"use strict";
var gAlienSpeed = 800;
var gIntervalAliens;
const gDeadAlienPos = [];
// The following two variables represent the part of the matrix (some rows)
// that we should shift (left, right, and bottom)
// We need to update those when:
// (1) shifting down and (2) last alien was cleared from row
var gAliensTopRowIdx = 0;
var gAliensBottomRowIdx = 1;
var gIsAlienFreeze = true;

function createAliens(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if ((i < ALIEN_ROW_COUNT) & (j < ALIEN_ROW_LENGTH))
        board[i][j] = createCell(ALIEN);
    }
  }
}
function handleAlienHit(pos) {
  gDeadAlienPos.push(pos);
  var t = gDeadAlienPos.length;
  console.log(t);

  playSound("hit");
  updateScore(10);
  updateCell(pos, EXPLOSION);

  setTimeout(() => {
    updateCell(pos);
  }, 150);
}

function handleHit(pos, target) {
  var upScore = 10;
  if (target === ALIEN) {
    gDeadAlienPos.push(pos);
  } else {
    upScore = 50;
    gIsAlienFreeze = true;
    setTimeout(() => {
      gIsAlienFreeze = false;
    }, 5000);
  }

  playSound("hit");
  updateScore(upScore);
  updateCell(pos, EXPLOSION);

  setTimeout(() => {
    updateCell(pos);
  }, 150);
}

function shiftBoardRight(board, fromI, toI) {
  if (gIsAlienFreeze) return;
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
  if (gIsAlienFreeze) return;
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
  gAliensBottomRowIdx++;

  if (gIsAlienFreeze) return;
  if (toI === board.length - 2) {
    gIsAlienFreeze = true;
    return gameOver(false);
  }
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

  // start candy's after first row
  if (!fromI) {    
    gCandyInterval = setInterval(() => {
      candyAppear();
    }, 2000);
  }
  // Delay so that there are no two stones in the air
  setTimeout(() => {
    AliensShoot()  
  }, 700);
  
  clearInterval(gIntervalAliens);

  if (isRight) {
    gIntervalAliens = setInterval(() => {
      shiftBoardLeft(board, fromI + 1, toI + 1);
    }, gAlienSpeed);
  } else {
    gIntervalAliens = setInterval(() => {
      shiftBoardRight(board, fromI + 1, toI + 1);
    }, gAlienSpeed);
  }
}
// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops

function moveAliens() {
  if (!gGame.isOn) return;
  gIsAlienFreeze = false;

  gIntervalAliens = setInterval(() => {
    shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx + 1);
  }, gAlienSpeed);
}

function changeSpeed(elBtn) {
  var level = elBtn.innerText;
  console.log(level);
  switch (level) {
    case "Medium":
      gAlienSpeed = 500;
      break;
    case "Hard":
      gAlienSpeed = 300;
      break;
    default:
      gAlienSpeed = 800;
      break;
  }
  const elLevel = document.querySelector(".level span");
  elLevel.innerText = level;
}


var gAliensRockInterval;

function AliensShoot() {
  var pos = getAlienPos(gBoard);

  gAliensRockInterval = setInterval(() => {
    blinkAlienRock(pos);
    pos.i++
  }, 300);
}


function blinkAlienRock(pos) {
  if(!pos){
    console.log(pos);
    return
  }

  // if at the age
  if(!pos||pos.i+1 === gBoard.length-1|| gBoard[pos.i+1][pos.j].type === 'ground'){
    console.log(gBoard[pos.i][pos.j]);
    clearInterval(gAliensRockInterval)
    updateCell(pos)
    return
  }
  
  var nextPos = {i:pos.i+1,j:pos.j}
  if(gBoard[pos.i][pos.j].gameObject=== HERO){
    console.log('game over');
    clearInterval(gAliensRockInterval)
    updateCell({i:pos.i+1,j:pos.j},ROCK)
    updateCell(pos)
    gameOver()
    return

  }else if(gBoard[pos.i][pos.j].gameObject === ALIEN) {
    console.log({i:pos.i,j:pos.j},'alien');
    updateCell(nextPos,ROCK)
  }else{
    // console.log({i:pos.i,j:pos.j});
    console.log(gBoard[pos.i+1][pos.j]);
    updateCell(nextPos,ROCK)
    updateCell(pos)
  }
  
}

function getAlienPos(board) {
  const aliensPoses = [];
  for (let j = 0; j < board[gAliensBottomRowIdx].length; j++) {
    const cell = board[gAliensBottomRowIdx][j];
    if (cell.gameObject === ALIEN) {
      aliensPoses.push({ i:gAliensBottomRowIdx,j:j});
    }
  }
  var randomIdx = getRandomInt(0, aliensPoses.length - 1);
  return aliensPoses[randomIdx];
}
