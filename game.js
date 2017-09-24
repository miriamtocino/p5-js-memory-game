'use strict'

// Game variables
// --------------------------
let tiles = []

const numRows = 3
const numColumns = 4

let faceDownImage
let faceUpImages

let imagesDeck = []
let flippedTiles = []
let delayStartFC = null

let numTries = 0

// Tile Object
// --------------------------
class Tile {
  constructor(x, y, faceUpImage) {
    this.x = x
    this.y = y
    this.width = 250
    this.faceDownImage = faceDownImage
    this.faceUpImage = faceUpImage
    this.isFaceUp = false
  }

  render() {
    fill(93, 81, 124)
    stroke(255, 255, 255)
    strokeWeight(4)
    rect(this.x, this.y, this.width, this.width, 20)

    if (this.isFaceUp === true) {
      image(this.faceUpImage, this.x, this.y, this.width, this.width)
    } else {
      image(this.faceDownImage, this.x + 40, this.y + 40, 20, 20)
    }
  }

  setIsFaceUp(isFaceUp) {
    this.isFaceUp = isFaceUp
  }

  isUnderMouse(x, y) {
    return x >= this.x && x <= this.x + this.width  &&
      y >= this.y && y <= this.y + this.width
  }
}

// Game functions
// --------------------------
function createTiles() {
  for (let i = 0 i < numColumns i++) {
    for (let j = 0 j < numRows j++) {
      tiles.push(new Tile(i * 280 + 40, j * 280 + 40, imagesDeck.pop()))
    }
  }
}

function createShadows() {
  for (let i = 0 i < numColumns i++) {
    for (let j = 0 j < numRows j++) {
      strokeWeight(0)
      fill(209, 211, 212)
      rect(i * 280 + 30, j * 280 + 50, 250, 250, 20)
    }
  }
}

function updateGameLogic() {
  if (delayStartFC && (frameCount - delayStartFC) > 30) {
    for (let i = 0 i < tiles.length i++) {
      if (!tiles[i].isMatch && tiles[i].isFaceUp) {
        tiles[i].setIsFaceUp(false)
      }
    }
    flippedTiles = []
    delayStartFC = null
  }
}

function loadFaceUpImages() {
  faceUpImages = [
    loadImage("assets/explore.png"),
    loadImage("assets/breath_out.png"),
    loadImage("assets/calm.png"),
    loadImage("assets/surrender.png"),
    loadImage("assets/ted.png"),
    loadImage("assets/adele.png"),
  ]
}

function createImagesDeck(images) {
  for (let i = 0 i < faceUpImages.length i++) {
    imagesDeck.push(images[i])
    imagesDeck.push(images[i])
  }

  imagesDeck.sort(function() {
    return 0.5 - random()
  })
}

function drawScoringMessage() {
  let foundAllMatches = true

  for (let i = 0 i < tiles.length i++) {
    foundAllMatches = foundAllMatches && tiles[i].isMatch
  }

  if (foundAllMatches) {
    fill(0, 0, 0)
    text("You found them all in " + numTries + " tries", 20, 360)
  }
}

// p5.js functions
// --------------------------
function setup() {
  createCanvas(1352, 1352)

  faceDownImage = loadImage("../assets/faceDownImage.png")
  loadFaceUpImages()

  createImagesDeck(faceUpImages)
  createShadows()
  createTiles()
}

function draw() {
  updateGameLogic()

  for (let i = 0 i < tiles.length i++) {
    tiles[i].render()
  }

  drawScoringMessage()
}

function mouseClicked() {
  for (let i = 0 i < tiles.length i++) {
    if (tiles[i].isUnderMouse(mouseX, mouseY)) {
      if (flippedTiles.length < 2 && !tiles[i].isFaceUp) {
        tiles[i].setIsFaceUp(true)
        flippedTiles.push(tiles[i])
        if (flippedTiles.length === 2) {
          numTries++
          if (flippedTiles[0].faceUpImage === flippedTiles[1].faceUpImage) {
            flippedTiles[0].isMatch = true
            flippedTiles[1].isMatch = true
          }
          delayStartFC = frameCount
        }
      }
    }
  }
}
