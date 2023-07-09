// Variables to store game state
let board;
let currentPlayer;
let gameOver;
let winningPlayer;

function setup() {
  createCanvas(600, 600);
  initializeGame();
}

function draw() {
  background(222, 140, 27);
  drawBoard();

  if (gameOver) {
    displayResult();
  }
}

function initializeGame() {
  board = [['', '', ''], ['', '', ''], ['', '', '']];
  currentPlayer = 'X';
  gameOver = false;
  winningPlayer = '';
}


function drawBoard() {
  const cellSize = width / 3;

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const x = col * cellSize;
      const y = row * cellSize;

      stroke(0);
      strokeWeight(8);
      noFill();

      rect(x, y, cellSize, cellSize);

      const symbol = board[row][col];
      const xPos = x + cellSize / 2;
      const yPos = y + cellSize / 2;
      const symbolSize = cellSize / 2;

      textSize(100);
      fill(0);
      textAlign(CENTER, CENTER);
      text(symbol, xPos, yPos);
    }
  }
}

function displayResult() {
  textSize(100);
  textAlign(CENTER, CENTER);
  strokeWeight(10);
  fill(255);
  if (winningPlayer === 'X' || winningPlayer === 'O') {
    text(`${winningPlayer} wins!`, width / 2, height / 2);
  } else {
    text("It's a draw!", width / 2, height / 2);
  }
}

function checkWin() {
  // Check rows
  for (let row = 0; row < 3; row++) {
    if (
      board[row][0] !== '' &&
      board[row][0] === board[row][1] &&
      board[row][1] === board[row][2]
    ) {
      return true;
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] !== '' &&
      board[0][col] === board[1][col] &&
      board[1][col] === board[2][col]
    ) {
      return true;
    }
  }

  // Check diagonals
  if (
    board[0][0] !== '' &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return true;
  }

  if (
    board[0][2] !== '' &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return true;
  }

  // Check for draw
  let isDraw = true;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === '') {
        isDraw = false;
        break;
      }
    }
    if (!isDraw) {
      break;
    }
  }

  if (isDraw) {
    gameOver = true;
    winningPlayer = '';
    return false;
  }

  return false;
}

function mouseClicked() {
  if (gameOver) {
    initializeGame();
    return;
  }

  const cellSize = width / 3;
  const row = floor(mouseY / cellSize);
  const col = floor(mouseX / cellSize);

  if (board[row][col] === '') {
    board[row][col] = currentPlayer;

    if (checkWin()) {
      gameOver = true;
      winningPlayer = currentPlayer;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}
