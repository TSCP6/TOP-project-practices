let n = 16; //方格长宽的网格数
const length = 480;
let cellSize = length / n;
let enableFade = true;
let keepColor = false;

const container = document.querySelector(".container");
const numInput = document.querySelector("#grid-num");
const submitBtn = document.querySelector("#submit-size-btn");
const fadeCheckbox = document.querySelector("#fade-effect");
const keepColorCheckbox = document.querySelector("#keep-color");

function generateGrid() {
  fadeCheckbox.addEventListener("change", () => {
    enableFade = fadeCheckbox.checked;
  });

  keepColorCheckbox.addEventListener("change", () => {
    keepColor = keepColorCheckbox.checked;
  });

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
      if (enableFade) cell.target.style.backgroundColor = `rgba(0,0,0,1)`;
      cell.target.classList.add("hover-cell");
    })
  );

  cells.forEach((cell) => {
    cell.addEventListener("mouseleave", (cell) => {
      if (keepColor) return;
      if (enableFade) {
        let alpha = 1;
        const fade = setInterval(() => {
          alpha -= 1 / 20;
          if (alpha <= 0.5) {
            alpha = 0;
            clearInterval(fade);
          }
          cell.target.style.backgroundColor = `rgba(0,0,0,${alpha})`;
        }, 30);
        setTimeout(() => {
          cell.target.classList.remove("hover-cell");
        }, 400);
      } else {
        cell.target.style.backgroundColor = "";
        setTimeout(() => {
          cell.target.classList.remove("hover-cell");
        }, 300);
      }
    });
  });
}

function clearGrid() {
  container.innerHTML = "";
}

generateGrid();

submitBtn.addEventListener("click", () => {
  clearGrid();
  n = numInput.value;
  cellSize = length / numInput.value;
  generateGrid();
});
