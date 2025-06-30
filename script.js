const grid = [];
const grid2 = [];

let game = "playing";
class Cells {
  constructor(isBomb, counter, revealed) {
    this.isBomb = isBomb;
    this.counter = counter;
    this.revealed = revealed;
  }
}
//let count = 1;
function createTiles() {
  //Input number of equal rows and column
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      row.push(new Cells(false, 0, false));
    }
    grid.push(row);
  }

  let bombsPlaced = 0;
  while (bombsPlaced < 10) {
    let bombRow = Math.floor(Math.random() * 9);
    let bombCol = Math.floor(Math.random() * 9);
    if (grid[bombRow][bombCol].isBomb === false) {
      grid[bombRow][bombCol].isBomb = true;
      bombsPlaced++;
    }
  }
}

function createTilesNumbers() {
  const grid2 = [];

  for (let i = 0; i < 9; i++) {
    const rowx = [];
    for (let j = 0; j < 9; j++) {
      if (grid[i][j].isBomb) {
        rowx.push((grid[i][j].counter = "💣"));
      } else {
        rowx.push(grid[i][j].counter);
      }
    }
    grid2.push(rowx);
  }

  console.table(grid2);
}

function bombsVicinity() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let countBombs = 0;

      if (!grid[i][j].isBomb) {
        // ✅ Only check if it's NOT a bomb
        if (grid[i - 1]?.[j - 1]?.isBomb) countBombs++;
        if (grid[i - 1]?.[j]?.isBomb) countBombs++;
        if (grid[i - 1]?.[j + 1]?.isBomb) countBombs++;
        if (grid[i]?.[j - 1]?.isBomb) countBombs++;
        if (grid[i]?.[j + 1]?.isBomb) countBombs++;
        if (grid[i + 1]?.[j - 1]?.isBomb) countBombs++;
        if (grid[i + 1]?.[j]?.isBomb) countBombs++;
        if (grid[i + 1]?.[j + 1]?.isBomb) countBombs++;

        grid[i][j].counter = countBombs; // ✅ Update the counter
      }
    }
  }
  console.log(grid);
}

function gameState() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = grid[i][j];
      if (!cell.isBomb && !cell.revealed) {
        return "unfinished"; // there's still work to do
      }
    }
  }
  return "finished"; // all safe cells revealed
}

function clickedCoordinates(x, y) {
  if (!grid[x] || !grid[x][y]) return; // guard clause for out-of-bounds

  const cell = grid[x][y];

  if (cell.isBomb) {
    cell.revealed = true;
    game = "finished";
    console.log("Game is over you moron!!");
    return;
  }

  if (!cell.revealed) {
    cell.revealed = true;
  }

  if (gameState() === "finished") {
    game = "won";
    alert("Game won!");
    console.log("Congratulations you win!");
  }
}

// function clickedCoordinates(x, y) {
//   if (!grid[x] || !grid[x][y]) return; // guard clause for out-of-bounds

//   const cell = grid[x][y];
//   //gameState();
//   if (!cell.isBomb && gameState() !== "finished") {
//     cell.revealed = true;
//   } else if (!cell.isBomb && gameState() === "finished") {
//     cell.revealed = true;
//     game = "won";
//     alert("Game won!");
//     console.log("Congratulations you win!");
//   } else if (cell.isBomb) {
//     cell.revealed = true;
//     game = "finished";
//     console.log("Game is over you moron!!");
//     return;
//   }
// }

const container = document.querySelector(".container");

function renderBoard() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let button = document.createElement("button");
      button.id = `${i},${j}`;
      button.textContent = `${grid[i][j].counter}`;
      button.classList.add(`revealed-${grid[i][j].revealed}`);
      container.append(button);
    }
  }
}

// const rightClick = document.querySelector("button"); -- RIGHT CLICK

// container.addEventListener("contextmenu", (button) => {
//   event.preventDefault(); // prevent the default right-click menu\
//   const target = button.target;
//   const [rowStr, colStr] = target.id.split(",");
//   if (target.tagName !== "BUTTON") {
//     return;
//   }
//   if (!target.classList.contains("tagged")) {
//     target.classList.add("tagged");
//   } else if (target.tagName === "BUTTON") {
//     target.classList.remove("tagged");
//   }
//   //alert("Right-click detected!");
// });

container.addEventListener("click", (button) => {
  const target = button.target;
  const [rowStr, colStr] = target.id.split(",");

  clickedCoordinates(rowStr, colStr);
  target.classList.remove("revealed-false");
  target.classList.add("revealed-true");
  const allButtons = document.querySelectorAll("button");
  console.log(grid[rowStr][colStr].revealed);
  if (grid[rowStr][colStr].counter === 0) {
    target.style.color = "transparent";
  }
  if (grid[rowStr][colStr].counter === 1) {
    target.style.color = "blue";
  }
  if (grid[rowStr][colStr].counter === 2) {
    target.style.color = "green";
  }
  if (grid[rowStr][colStr].counter === 3) {
    target.style.color = "red";
  }
  if (grid[rowStr][colStr].counter === 4) {
    target.style.color = "purple";
  }
  if (game === "finished") {
    allButtons.forEach((btn) => {
      btn.classList.remove("revealed-false");
      btn.classList.add("revealed-true");
      btn.style.removeProperty("color");
      btn.disabled = true;
    });
    const loser = document.createElement("h3");
    loser.innerHTML = `💥GAME OVER!💥`;
    container.appendChild(loser);
  }
  if (gameState() === "finished" && game === "won") {
    allButtons.forEach((btn) => {
      btn.classList.remove("revealed-false");
      btn.classList.add("revealed-true");
      btn.style.removeProperty("color");
      btn.disabled = true;
    });
    const loser = document.createElement("h3");
    loser.innerHTML = `Congratulations you won!🏆🏆🏆`;
    container.appendChild(loser);
  }
});

createTiles();
bombsVicinity();
//gameState();
createTilesNumbers();
renderBoard();
console.table(grid);
