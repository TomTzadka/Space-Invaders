"use strict";
const LASER_SPEED = 80;
var gLaserInterval;
var gHero = { pos: { i: 12, j: 5 }, isShoot: false };

function createHero(board) {
  board[gHero.pos.i][gHero.pos.j] = createCell(HERO);
}
function onKeyDown(ev) {
  const key = ev.code;
  switch (key) {
    case "ArrowRight":
      moveHero(1);
      break;
    case "ArrowLeft":
      moveHero(-1);
      break;
    case "KeyS":
      shoot();
      break;
    // case "KeyN":
    //   console.log("negh mode!");
    //   break;
      case "KeyX":
        superMode()
        console.log("super mode!");
      break;
    default:
      break;
  }
}

function moveHero(dir) {
  if (!gGame.isOn) return;

  const pos = gHero.pos;

  if (dir === -1 && pos.j === 0) return;
  if (dir === 1 && pos.j === gBoard.length - 1) return;

  updateCell(pos);
  pos.j += dir;
  updateCell(pos, HERO);
}

function shoot() {
  if (!gGame.isOn) return;

  if(gHero.isShoot)return

  gHero.isShoot = true;
  var currLaserPose = { i: gHero.pos.i, j: gHero.pos.j };

  gLaserInterval = setInterval(() => {
    blinkLaser(currLaserPose);
  }, 200);
}

function blinkLaser(pos) {
  const nextPos = { i: pos.i - 1, j: pos.j };
  const nextCell = gBoard[nextPos.i][nextPos.j].gameObject
  
  if (!nextPos.i || nextCell === ALIEN) {
    clearInterval(gLaserInterval);
    gHero.isShoot = false;
    updateCell(pos);
    if (!pos.i) return;
    else if(nextCell === CANDY||nextCell === ALIEN){
      var target = (nextCell === CANDY) ? CANDY: ALIEN
      handleHit(nextPos,target);
    }
    
  } else {
    if (pos.i !== gHero.pos.i) updateCell(pos);
    --pos.i;
    updateCell(pos, LASER);
  }
}

function handleCandyHit(pos){

  playSound("hit");
  updateScore(50);
  updateCell(pos, EXPLOSION);

  setTimeout(() => {
    updateCell(pos);
  }, 150);
}
