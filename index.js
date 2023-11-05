const boxes = document.querySelectorAll(".box");
const userInfo = document.querySelector(".user-info");
const newGamebutton = document.querySelector(".button");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to initialize the game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  // UI: Clear the boxes and reset pointer events
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    box.classList = `box box${index + 1}`;
  });

  newGamebutton.classList.remove("active");
  userInfo.innerText = `Current player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  // UI: Update player info
  userInfo.innerText = `Current player - ${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";

  winningPositions.forEach((position) => {
    // Check if all three boxes are non-empty and have the same value
    if (
      gameGrid[position[0]] !== "" &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      // Determine the winner (X or O)
      answer = gameGrid[position[0]];

      // Disable pointer events for all boxes
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      // Mark the winning boxes
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  // If we have a winner
  if (answer !== "") {
    userInfo.innerText = `Winner Player - ${answer}`;
    newGamebutton.classList.add("active");
    return;
  }

  // When there is no winner, check for a tie
  let fillCount = gameGrid.filter((box) => box !== "").length;

  // If all boxes are filled and there is no winner, it's a tie
  if (fillCount === 9) {
    userInfo.innerText = "Game Tied!";
    newGamebutton.classList.add("active");
  }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";

    // Swap the turn
    swapTurn();

    // Check if there's a winner or a tie
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

// Add an event listener to the "New Game" button
newGamebutton.addEventListener("click", () => {
  initGame();
});
