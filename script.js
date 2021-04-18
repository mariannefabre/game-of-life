const aliveColor = "green";
const deadColor = "white";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cellSize = 20;
const cols = Math.floor(canvas.width / cellSize);
const rows = Math.floor(canvas.height / cellSize);
let grid;

function create2DArray() {
  let arr = new Array(cols);
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

// Initialize grid with random structures
function fillArray() {
  grid = create2DArray();
  console.log(grid);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = Math.floor(Math.random() * 2);
      drawCell(i, j);
    }
  }
}

function countNeighbors(col, row) {
  let count = 0;
  if (col - 1 >= 0) {
    count += grid[col - 1][row];
  }
  if (col - 1 >= 0 && row - 1 >= 0) {
    count += grid[col - 1][row - 1];
  }
  if (col - 1 >= 0 && row + 1 < rows) {
    count += grid[col - 1][row + 1];
  }
  if (row - 1 >= 0) {
    count += grid[col][row - 1];
  }
  if (row + 1 < rows) {
    count += grid[col][row + 1];
  }
  if (col + 1 < cols) {
    count += grid[col + 1][row];
  }
  if (col + 1 < cols && row - 1 >= 0) {
    count += grid[col + 1][row - 1];
  }
  if (col + 1 < cols && row + 1 < rows) {
    count += grid[col + 1][row + 1];
  }
  return count;
}

function drawCell(i, j) {
  let color;
  color = grid[i][j] === 0 ? deadColor : aliveColor;
  ctx.fillStyle = color;
  ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
  ctx.strokeStyle = "grey";
  ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
}

function updateGrid() {
  grid = getNextGen();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      drawCell(i, j);
    }
  }
}

function getNextGen() {
  let newGrid = create2DArray();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let neighbors = countNeighbors(i, j);
      if ((grid[i][j] === 1 && neighbors === 2) || neighbors === 3) {
        newGrid[i][j] = 1;
      } else {
        newGrid[i][j] = 0;
      }
    }
  }
  return newGrid;
}

function init() {
  let interval;
  const startBtn = document.getElementById("start");
  startBtn.addEventListener("click", start);
  const pauseBtn = document.getElementById("pause");
  pauseBtn.addEventListener("click", pause);

  function start() {
    if (!grid) fillArray();
    interval = window.setInterval(updateGrid, 200);
    startBtn.removeEventListener("click", start);
  }

  function pause() {
    clearInterval(interval);
    startBtn.addEventListener("click", start);
  }
}

init();
