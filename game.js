'use strict';

// Game variables
// --------------------------
let imageFaceDown;
let tiles = [];
const numColumns = 5;
const numRows = 4;

// Tile Object
// --------------------------
let Tile = function(x, y) {
  this.x = x;
  this.y = y;
  this.width = 70;
}

Tile.prototype.drawFaceDown = function() {
  fill(93, 81, 124);
  strokeWeight(0);
  rect(this.x, this.y, this.width, this.width, 10);
  image(imageFaceDown, this.x + 25, this.y + 25, 20, 20);
}

// Game functions
// --------------------------
function createTiles() {
  for (let i = 0; i < numColumns; i++) {
    for (let j = 0; j < numRows; j++) {
      tiles.push(new Tile(i * 78 + 40, j * 78 + 40));
    }
  }
}

function drawTiles() {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].drawFaceDown();
  }
}

// p5.js functions
// --------------------------
function setup() {
  createCanvas(720, 400);
  imageFaceDown = loadImage("../assets/imageFaceDown.png");
  createTiles();
}

function draw() {
  drawTiles();
}
