function create2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

// Initialize grid with random structures
function initRandomGrid(cols, rows) {
  let grid = create2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = Math.floor(Math.random() * 2);
    }
  }
  return grid;
}

function drawGrid(grid, cols, rows, ctx, cellSize) {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      drawCell(grid, i, j, ctx, cellSize);
    }
  }
}

function drawCell(grid, col, row, ctx, cellSize) {
  const aliveColor = "#eceff1";
  const deadColor = "#7986cb";
  let color;
  if (!grid) {
    color = deadColor;
  } else {
    color = grid[col][row] === 0 ? deadColor : aliveColor;
  }
  ctx.fillStyle = color;
  ctx.fillRect(row * cellSize, col * cellSize, cellSize, cellSize);
}

function getNextGen(grid, cols, rows) {
  let nextGrid = create2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let neighbors = countNeighbors(grid, i, j, cols, rows);
      if ((grid[i][j] === 1 && neighbors === 2) || neighbors === 3) {
        nextGrid[i][j] = 1;
      } else {
        nextGrid[i][j] = 0;
      }
    }
  }
  return nextGrid;
}

function countNeighbors(grid, col, row, cols, rows) {
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

function updateGrid(grid, cols, rows, ctx, cellSize) {
  let nextGrid = getNextGen(grid, cols, rows);
  drawGrid(nextGrid, cols, rows, ctx, cellSize);
  return nextGrid;
}

function init() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const cellSize = 10;
  const cols = Math.floor(canvas.width / cellSize);
  const rows = Math.floor(canvas.height / cellSize);
  let grid = null;
  let interval;
  const startBtn = document.getElementById("start");
  startBtn.addEventListener("click", start);
  const pauseBtn = document.getElementById("pause");
  pauseBtn.addEventListener("click", pause);
  const resetBtn = document.getElementById("reset");
  resetBtn.addEventListener("click", reset);

  function start() {
    if (!grid) {
      grid = initRandomGrid(cols, rows);
      drawGrid(grid, cols, rows, ctx, cellSize);
    }
    interval = window.setInterval(() => {
      grid = updateGrid(grid, cols, rows, ctx, cellSize);
    }, 1000);
    startBtn.removeEventListener("click", start);
  }
  function pause() {
    clearInterval(interval);
    startBtn.addEventListener("click", start);
  }
  function reset() {
    pause();
    grid = initRandomGrid(cols, rows);
    drawGrid(grid, cols, rows, ctx, cellSize);
  }
}

init();
