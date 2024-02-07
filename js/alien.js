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
      if ((i < ALIEN_ROW_COUNT) & (j < ALIEN_ROW_LENGTH)) board[i][j] = createCell(ALIEN);
    }
  }
}
function handleAlienHit(pos) {
    console.log(pos);
}
function shiftBoardRight(board, fromI, toI) {
    for (let i = fromI; i < toI; i++) {
        for (let j = 0; j < board.length; j++) {
            const isAlien = board[j][j].gameObject
            console.log(isAlien);
            if(isAlien){
                console.log(i,j);
                board[i][j] = updateCell({i:i,j:j})
                board[i][j] = updateCell({i:i,j:j+1}, ALIEN)
                console.log(gBoard);
            }
            
        }
        
    }
    
    
    

}
function shiftBoardLeft(board, fromI, toI) {}
function shiftBoardDown(board, fromI, toI) {}
// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops
function moveAliens() {
    var startIdx = 0
    var endIdx = ALIEN_ROW_COUNT
    // gIntervalAliens = setInterval(() => {
    //     shiftBoardRight(gBoard,startIdx,endIdx)
    //     clearInterval(gIntervalAliens)
    // //     console.log(startIdx);
    //     startIdx++
    // }, 1000);
        // shiftBoardRight(gBoard,startIdx,endIdx)
    
}
