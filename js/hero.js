"use strict";
const LASER_SPEED = 80;
var gLaserInterval;
var gHero = { pos: { i: 12, j: 5 }, isShoot: false };

function createHero(board) {
  board[gHero.pos.i][gHero.pos.j] = createCell("", HERO);
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
    case "KeyN":
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
  if (gHero.isShoot) return;

  gHero.isShoot = true;
  var currLaserPose = { i: gHero.pos.i, j: gHero.pos.j };

  gLaserInterval = setInterval(() => {
    blinkLaser(currLaserPose);
  }, 200);
}

function blinkLaser(pos) {
  const nextPos = { i: pos.i - 1, j: pos.j };

  if (!pos.i || gBoard[nextPos.i][nextPos.j].gameObject === ALIEN) {
    clearInterval(gLaserInterval);
    gHero.isShoot = false;
    updateCell(pos);
    if (!pos.i) return;
    handleAlienHit(nextPos);
  } else {
    if (pos.i !== gHero.pos.i) updateCell(pos);
    --pos.i;
    updateCell(pos, LASER);
  }
}
