'use strict';

// Game variables
// --------------------------
let tiles = [];

const numRows = 4;
const numColumns = 4;

let imageFaceDown;
let imagesFaceUp;

let imagesDeck = [];

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
  strokeWeight(0);
  rect(this.x, this.y, this.width, this.width, 10);
  image(imageFaceDown, this.x + 25, this.y + 25, 20, 20);
}

Tile.prototype.drawFaceUp = function() {
  fill(93, 81, 124);
  strokeWeight(0);
  rect(this.x, this.y, this.width, this.width, 10);
  image(this.face, this.x, this.y, this.width, this.width);
};

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

function drawTiles() {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].drawFaceUp();
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
  drawTiles();
}
