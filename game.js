'use strict';

// Game variables
// --------------------------
let tiles = [];

const numRows = 4;
const numColumns = 4;

let imageFaceDown;
let imagesFaceUp;

let imagesDeck = [];
let flippedTiles = [];
let delayStartFC = null;

// Tile Object
// --------------------------
let Tile = function(x, y, face) {
  this.x = x;
  this.y = y;
  this.face = face;
  this.width = 70;
}

Tile.prototype.drawFaceDown = function() {
  fill(93, 81, 124);
  stroke(255, 255, 255);
  strokeWeight(4);
  rect(this.x, this.y, this.width, this.width, 10);
  image(imageFaceDown, this.x + 25, this.y + 25, 20, 20);
  this.isFaceUp = false;
}

Tile.prototype.drawFaceUp = function() {
  fill(223, 222, 239);
  stroke(255, 255, 255);
  strokeWeight(4);
  rect(this.x, this.y, this.width, this.width, 10);
  image(this.face, this.x, this.y, this.width, this.width);
  this.isFaceUp = true;
}

Tile.prototype.isUnderMouse = function(x, y) {
  return x >= this.x && x <= this.x + this.width  &&
    y >= this.y && y <= this.y + this.width;
}

// Game functions
// --------------------------
function createTiles() {
  // Assign an image from the imagesDeck array to each tile
  for (let i = 0; i < numColumns; i++) {
    for (let j = 0; j < numRows; j++) {
      tiles.push(new Tile(i * 78 + 40, j * 78 + 40, imagesDeck.pop()));
    }
  }
}

function drawInitialFaceDown() {
  for (let i = 0; i < tiles.length; i++) {
    // Only draw the tile in each frame if it is not face up
    if (!tiles[i].isFaceUp) {
      tiles[i].drawFaceDown();
    }
  }
}

function drawFaceDownIfNotMatched() {
  if (delayStartFC && (frameCount - delayStartFC) > 60) {
    for (let i = 0; i < tiles.length; i++) {
      if (!tiles[i].isMatch) {
        tiles[i].drawFaceDown();
      }
    }
    flippedTiles = [];
    delayStartFC = null;
    noLoop();
  }
}

function loadImagesFaceUp() {
  imagesFaceUp = [
    loadImage("assets/ted.png"),
    loadImage("assets/adele.png"),
    loadImage("assets/kim.png"),
    loadImage("assets/willy.png"),
    loadImage("assets/ted.png"),
    loadImage("assets/adele.png"),
    loadImage("assets/kim.png"),
    loadImage("assets/willy.png"),
  ];
}

function createimagesDeck(images) {
  // Push 2 copies onto imagesDeck array
  for (let i = 0; i < imagesFaceUp.length; i++) {
    imagesDeck.push(images[i]);
    imagesDeck.push(images[i]);
  }

  // Randomize imagesDeck array
  imagesDeck.sort(function() {
    return 0.5 - random();
  })
}

// p5.js functions
// --------------------------
function setup() {
  createCanvas(720, 400);

  imageFaceDown = loadImage("../assets/imageFaceDown.png");
  loadImagesFaceUp();

  createimagesDeck(imagesFaceUp);
  createTiles();
}

function draw() {
  drawInitialFaceDown();
  drawFaceDownIfNotMatched();
}

function mouseClicked() {
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].isUnderMouse(mouseX, mouseY)) {
      if (flippedTiles.length < 2 && !tiles[i].isFaceUp) {
        tiles[i].drawFaceUp();
        flippedTiles.push(tiles[i]);
        if (flippedTiles.length === 2) {
          if (flippedTiles[0].face === flippedTiles[1].face) {
            flippedTiles[0].isMatch = true;
            flippedTiles[1].isMatch = true;
          }
          delayStartFC = frameCount;
          loop();
        }
      }
    }
  }
}
