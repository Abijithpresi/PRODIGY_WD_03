const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const statusMessage = document.getElementById("statusMessage");
const restartButton = document.getElementById("restartButton");

const X_CLASS = "X";
const O_CLASS = "O";
let currentTurn = X_CLASS; // Track the current player
let gameActive = true; // To prevent clicks after a win or draw

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Start the game
initGame();

restartButton.addEventListener("click", initGame);

function initGame() {
  currentTurn = X_CLASS;
  gameActive = true;
  statusMessage.textContent = "Player X's Turn";
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS, O_CLASS);
    cell.textContent = "";
    cell.addEventListener("click", handleCellClick, { once: true });
  });
}

// Handle cell clicks
function handleCellClick(e) {
  if (!gameActive) return;

  const cell = e.target;
  placeMark(cell, currentTurn);

  if (checkWin(currentTurn)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
  }
}

// Place a mark on the clicked cell
function placeMark(cell, player) {
  cell.classList.add(player);
  cell.textContent = player;
}

// Swap the turn between X and O
function swapTurn() {
  currentTurn = currentTurn === X_CLASS ? O_CLASS : X_CLASS;
  statusMessage.textContent = `Player ${currentTurn}'s Turn`;
}

// Check if the current player has won
function checkWin(player) {
  return WINNING_COMBINATIONS.some(combination =>
    combination.every(index => cells[index].classList.contains(player))
  );
}

// Check if all cells are filled without a winner
function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
  );
}

// End the game with either a win or a draw
function endGame(draw) {
  gameActive = false;
  statusMessage.textContent = draw ? "It's a Draw!" : `Player ${currentTurn} Wins!`;
}
