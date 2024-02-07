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
    case "Space":
      shoot();
      break;
    default:
      break;
  }
}

function moveHero(dir) {
  const pos = gHero.pos;

  if (dir === -1 && pos.j === 0) return;
  if (dir === 1 && pos.j === gBoard.length - 1) return;

  updateCell(pos);
  pos.j += dir;
  updateCell(pos, HERO);
}
// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() {
  if (gHero.isShoot) return;
  gHero.isShoot = true;
  const heroPos = gHero.pos;
  var currLaserPose = { i: heroPos.i, j: heroPos.j };
  gLaserInterval = setInterval(() => {
    blinkLaser(currLaserPose);
  }, 200);
}
function blinkLaser(pos) {
  const nextPos = { i: pos.i - 1, j: pos.j };
  const nextCell = gBoard[nextPos.i][nextPos.j].gameObject;
  if (pos.i === 0 || nextCell === ALIEN) {
    clearInterval(gLaserInterval);
    gHero.isShoot = false;
    updateCell(nextPos, "");
    updateCell(pos, "");
    if (nextCell === ALIEN) {
      updateScore(10);
      handleAlienHit(nextPos);
    }
    return;
  } else {
    if (pos.i !== gHero.pos.i) updateCell(pos);
    --pos.i;
    updateCell(pos, LASER);
  }
}

