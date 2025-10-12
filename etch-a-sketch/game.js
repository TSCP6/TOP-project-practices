let n = 16; //方格长宽的网格数
const length = 480;
let cellSize = length / n;

const container = document.querySelector(".container");
const numInput = document.querySelector("#grid-num");

function generateGrid() {
  for (let i = 0; i < n * n; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell-grid");
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    container.appendChild(cell);
  }
  
  const cells = document.querySelectorAll(".cell-grid");

  cells.forEach((cell) =>
    cell.addEventListener("mouseover", (cell) => {
      cell.target.classList.add("hover-cell");
    })
  );

  cells.forEach((cell) =>
    cell.addEventListener("mouseleave", (cell) => {
      setTimeout(() => {
        cell.target.classList.remove("hover-cell");
      }, 300);
    })
  );
}

function clearGrid() {
  container.innerHTML = "";
}

generateGrid();

numInput.addEventListener("change", () => {
  clearGrid();
  n = numInput.value;
  cellSize = length / numInput.value;
  generateGrid();
});
