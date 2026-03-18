let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgCon = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let boardContainer = document.querySelector(".board-container");

let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

let count = 0;
let winner = null;

const resetGame = () => {
  turnO = true;
  winner = null;
  count = 0;
  enableBoxes();
  msgCon.classList.add("hide");
  boardContainer.classList.remove("split");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "red";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "green";
      turnO = true;
    }
    box.disabled = true;
    count++;

    checkWinner();

    if (count === 9 && !winner) {
      msg.innerText = "No Winner...The Game is Draw!!";
      msgCon.classList.remove("hide");
      boardContainer.classList.add("split");
    }
  });
});

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showWinner = (player) => {
  winner = player;
  msg.innerText = `Congratulations, Winner is ${player}`;
  msgCon.classList.remove("hide");
  disableBoxes();
  boardContainer.classList.add("split");
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;
    if (pos1 && pos2 && pos3 && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      return;
    }
  }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
