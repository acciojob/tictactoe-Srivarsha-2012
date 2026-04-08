//your JS code here. If required.
let player1 = "";
let player2 = "";
let currentPlayer = "";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Winning combinations
const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

document.getElementById("submit").addEventListener("click", () => {
  player1 = document.getElementById("player-1").value;
  player2 = document.getElementById("player-2").value;

  if (player1 === "" || player2 === "") {
    alert("Please enter both player names");
    return;
  }

  document.getElementById("player-form").style.display = "none";
  document.getElementById("game").style.display = "block";

  currentPlayer = player1;
  document.querySelector(".message").textContent = `${player1}, you're up`;
});

// Cell click
document.querySelectorAll(".cell").forEach((cell, index) => {
  cell.addEventListener("click", () => handleClick(cell, index));
});

function handleClick(cell, index) {
  if (board[index] !== "" || !gameActive) return;

  if (currentPlayer === player1) {
    cell.textContent = "X";
    board[index] = "X";
  } else {
    cell.textContent = "O";
    board[index] = "O";
  }

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    document.querySelector(".message").textContent =
      `${currentPlayer}, you're up`;
  }
}

function checkWinner() {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      gameActive = false;
      document.querySelector(".message").textContent =
        `${currentPlayer} congratulations you won!`;
      return;
    }
  }

  // Draw condition
  if (!board.includes("")) {
    gameActive = false;
    document.querySelector(".message").textContent = "It's a draw!";
  }
}