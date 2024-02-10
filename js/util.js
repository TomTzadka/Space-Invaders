"use strict";
var gInterval;
const SECOND = 1000;

function getElCell(pos) {
  return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`);
}

// function getCallCoords(id) {
//     var coords = {};
//     var parts = id.split('-')
//     coords.i = +parts[0]
//     coords.j = +parts[1]
//     return coords
// }

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function startTimer() {
  var elTimer = document.querySelector(".timer");
  var timestamp = Date.now();

  gInterval = setInterval(() => {
    var time = `${((Date.now() - timestamp) / 1000).toFixed(2)}`;
    elTimer.innerText = time;
  }, 100);
}


let gBackgroundSound = null;
function playSound(name) {
  const sound = new Audio(`sound/${name}.mp3`)
  sound.play()
  if(name ==='background')gBackgroundSound = sound;
  
}

function stopBackgroundSoundSound() {
  gBackgroundSound.pause()
}