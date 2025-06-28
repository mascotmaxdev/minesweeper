const grid = [];
const grid2 = [];

let game = "unfinished";
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
        rowx.push((grid[i][j].counter = "B"));
      } else {
        rowx.push(grid[i][j].counter);
      }
    }
    grid2.push(rowx);
  }

  console.table(grid2);
}

// function createTilesNumbers() {
//   //-------------create separate table for bombs
//   //Input number of equal rows and column
//   for (let i = 0; i < 9; i++) {
//     const rowx = [];
//     for (let j = 0; j < 9; j++) {
//       rowx.push(grid[i][j].counter);
//       grid2[j] = grid[j].counter;
//     }
//     grid2.push(rowx);
//   }

//   console.table(grid2);
// }

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
// function bombsVicinity() {
//   // if (grid[0][0] === "wiw") {
//   //   console.log("Not Wiw!");
//   // }
//   for (let i = 1; i < 9; i++) {
//     for (let j = 1; j < 9; j++) {
//       let countBombs = 0;
//       if (!grid[i][j].isBomb) {
//         if (
//           grid[i - 1] &&
//           grid[i - 1][j - 1] &&
//           grid[i - 1][j - 1].isBomb === true
//         ) {
//           countBombs++;
//           // grid[i][j].counter++;
//           // console.log(grid[i][j].counter);
//           //    console.log(countBombs++);
//         }
//         if (grid[i - 1] && grid[i - 1][j] && grid[i - 1][j].isBomb === true) {
//           countBombs++;
//           //  console.log(countBombs++);
//         }
//         if (
//           grid[i - 1] &&
//           grid[i - 1][j + 1] &&
//           grid[i - 1][j + 1].isBomb === true
//         ) {
//           countBombs++;
//         }
//         if (grid[i] && grid[i][j - 1] && grid[i][j - 1].isBomb === true) {
//           countBombs++;
//         }
//         if (grid[i] && grid[i][j + 1] && grid[i][j + 1].isBomb === true) {
//           countBombs++;
//         }
//         if (
//           grid[i + 1] &&
//           grid[i + 1][j - 1] &&
//           grid[i + 1][j - 1].isBomb === true
//         ) {
//           countBombs++;
//         }
//         if (grid[i + 1] && grid[i + 1][j] && grid[i + 1][j].isBomb === true) {
//           grid[i][j].counter++;
//           countBombs++;
//         }

//         if (
//           grid[i + 1] &&
//           grid[i + 1][j + 1] &&
//           grid[i + 1][j + 1].isBomb === true
//         ) {
//           countBombs++;
//         }
//         if (countBombs > 0) {
//           grid[i][j].counter = countBombs;
//         }
//       }
//     }
//   }
//   console.table(grid);
// }

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
  } else if (cell.isBomb) {
    console.log("Game is over you moron!!");
  } else if (!cell.isBomb && game === "finished") {
    cell.revealed = true;
    console.log("Congratulations you win!");
  }
}
// function clickedCoordinates(x, y) {
//   if (!grid[x] || !grid[x][y]) return; // avoid errors on out-of-bounds

//   if (grid[x] && grid[x][y] && !grid[x][y].isBomb) {
//     grid[x][y].revealed = true;
//   } else if (grid[x] && grid[x][y].isBomb && game === "finished") {
//     grid[x][y].revealed = true;
//     console.log("Congratulations you win!");
//   } else if (grid[x] && grid[x][y].isBomb === true) {
//     console.log("Game is over you moron!!");
//   }
// }

// function clickedCoordinates(x, y) {
//   if (grid[x][y].isBomb === false) {
//     grid[x][y].revealed = true; //changes X to O means its opened
//   }
//   if (grid[x][y].isBomb === true && game === "finished") {
//     grid[x][y].revealed = true; //changes X to O means its opened
//     console.log("Congratulations you win!");
//   }
//   if (grid[x][y].isBomb === true) {
//     console.log(`Game is over you moron!!`);
//   }
// }

createTiles();
bombsVicinity();
gameState();
createTilesNumbers();
console.table(grid);
clickedCoordinates(0, 8);
clickedCoordinates(1, 5);
clickedCoordinates(3, 7);
clickedCoordinates(4, 8);
clickedCoordinates(2, 6);
clickedCoordinates(3, 7);
clickedCoordinates(0, 8);
clickedCoordinates(2, 5);
clickedCoordinates(3, 4);
clickedCoordinates(1, 8);
clickedCoordinates(2, 5);
clickedCoordinates(3, 7);
clickedCoordinates(7, 8);
clickedCoordinates(0, 5);
clickedCoordinates(3, 1);
clickedCoordinates(0, 1);
clickedCoordinates(2, 5);
clickedCoordinates(3, 7);
clickedCoordinates(0, 8);
clickedCoordinates(2, 5);
clickedCoordinates(8, 2);
clickedCoordinates(8, 1);
clickedCoordinates(2, 5);
clickedCoordinates(3, 1);

// console.log(grid[0][2]);
// console.log(grid[1][7]);
// console.log(grid[2][2]);
// console.log(grid[4][8]);
// console.log(grid[7][4]);
// console.log(grid[5][7]);
// console.log(grid[3][3]);
// console.log(grid[4][8]);
// console.log(grid[1][2].counter);
// console.table(grid);
