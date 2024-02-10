"use strict";
var gInterval;
let gBackgroundSound = null;
const SECOND = 1000;

function getElCell(pos) {
  return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function playSound(name) {
  const sound = new Audio(`sound/${name}.mp3`)
  sound.play()
  if(name ==='background')gBackgroundSound = sound;
  
}

function stopBackgroundSoundSound() {
  gBackgroundSound.pause()
}

function isVictory(){
  for (let i = 0; i < gBoard.length; i++) {
    for (let j = 0; j < gBoard.length; j++) {
      var cell = gBoard[i][j]
      if(cell.gameObject === ALIEN)return false
    }
  }
  return true
}