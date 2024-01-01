let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

resetBtn.classList.remove("hide-reset");

let turnO = true; // if true then O, if false then X

// Winning patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  resetBtn.classList.remove("hide-reset");
  count = 0; // Resets count when starting a new game
};

const checkDraw = () => {
  if (count === 9 && !checkForWinner()) {
    noWinner(); // All boxes are filled, and no winner
  }
};

const checkForWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {

        showWinner(pos1Val); // End the game and show winner
        return true;
      }
    }
  }
  return false;
};

let count = 0; // counts to check for draws after all 9 boxes are filled
boxes.forEach((boxx) => {
  boxx.addEventListener("click", () => {
    console.log("box was clicked!");

    if (turnO) {
      boxx.innerText = "O";
      turnO = false;
    } else {
      boxx.innerText = "X";
      turnO = true;
    }
    boxx.disabled = true;

    checkForWinner();
    count++; // Increment count after each move

    if (count === 9) {
      // Check for a draw after all boxes are filled
      checkDraw();
    }
  });
});

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  resetBtn.classList.add("hide-reset");
};

const noWinner = () => {
  msg.innerText = "It's a draw! Start a New Game.";
  msgContainer.classList.remove("hide");
  disableBoxes();
  resetBtn.classList.add("hide-reset");
};



newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
