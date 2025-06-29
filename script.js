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

  // console.log(grid);
}

function createTilesNumbers() {
  const grid2 = [];

  for (let i = 0; i < 9; i++) {
    const rowx = [];
    for (let j = 0; j < 9; j++) {
      // Copy counter value
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

  if (!cell.isBomb) {
    cell.revealed = true;
    //  console.log(`revealed`);
  } else if (cell.isBomb) {
    console.log("Game is over you moron!!");
    cell.revealed = true;
    game = "finished";
    console.log(game);
    return;
  } else if (!cell.isBomb && game === "finished") {
    cell.revealed = true;
    console.log("Congratulations you win!");
  }
}

const container = document.querySelector(".container");

function renderBoard() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let button = document.createElement("button");
      button.id = `${i},${j}`;
      button.textContent = `${grid[i][j].counter}`;
      button.classList.add(`revealed-${grid[i][j].revealed}`);
      // if (grid[i][j].revealed === true) {
      //   button.classList.add("revealed-true");
      // }
      // button.classList.add(`isbomb-${grid[i][j].isBomb}`);
      // button.classList.add(`revealed-${grid[i][j].revealed}`);
      // button.style.color = "transparent";
      // button.dataset.col = `${i}`;
      // button.dataset.row = `${j}`;
      // button.dataset.counter = `${grid[i][j].counter}`;

      // if (grid[i][j].counter === 0) {
      //   button.style.color = "transparent";
      // }
      // if (grid[i][j].counter === 1) {
      //   button.style.color = "blue";
      // }
      // if (grid[i][j].counter === 2) {
      //   button.style.color = "green";
      // }
      // if (grid[i][j].counter === 3) {
      //   button.style.color = "red";
      // }
      // if (grid[i][j].counter === 4) {
      //   button.style.color = "purple";
      // }
      container.append(button);
      console.log(`Konoha`);
    }
  }
}

container.addEventListener("click", (button) => {
  const target = button.target;
  const [rowStr, colStr] = target.id.split(",");
  //console.log(grid[rowStr][colStr].revealed);
  clickedCoordinates(rowStr, colStr);
  target.classList.remove("revealed-false");
  target.classList.add("revealed-true");
  const allButtons = document.querySelectorAll("button");
  console.log(grid[rowStr][colStr].revealed);
  if (game === "finished") {
    allButtons.forEach((btn) => {
      btn.classList.remove("revealed-false");
      btn.classList.add("revealed-true");
    });
  }
});

createTiles();
bombsVicinity();
gameState();
createTilesNumbers();
renderBoard();
console.table(grid);
