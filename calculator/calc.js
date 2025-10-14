const number_btns = document.querySelectorAll(".num-btn");
const op_btns = document.querySelectorAll(".op-btn");
const equal_btn = document.querySelector(".equal-btn");
const display_premenu = document.querySelector(".pre-display");
const display_nowmenu = document.querySelector(".now-display");

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    console.error("The divided number can not be 0");
    return;
  }
  return num1 / num2;
}

function operate(num1, op, num2) {
  switch (op) {
    case "+": {
      return add(num1, num2);
      break;
    }
    case "-": {
      return subtract(num1, num2);
      break;
    }
    case "×": {
      return multiply(num1, num2);
      break;
    }
    case "÷": {
      return divide(num1, num2);
      break;
    }
    default:
      break;
  }
}

let num1 = 0,
  num2 = 0,
  op = null,
  isStart = true,
  inputOp = false,
  inputNum = false;

function assign() {
  let num;
  number_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      num = btn.innerHTML;
      inputNum = true;
      num2 = parseInt(num2 * 10) + parseInt(num);
      display_nowmenu.innerHTML = num2;
    });
  });
  op_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let curOp = btn.innerHTML;
      if (inputNum) {
        if (op !== null) {
          num1 = operate(num1, op, num2);
        } else {
          num1 = num2;
        }
        display_nowmenu.innerHTML = num1;
        num2 = 0;
      }
      op = curOp;
      display_premenu.innerHTML = num1 + op;
      inputNum = false;
    });
  });
  equal_btn.addEventListener("click", () => {
    display_premenu.innerHTML += num2 + "=";
    num1 = operate(num1, op, num2);
    display_nowmenu.innerHTML = num1;
    op= null;
    num2 = 0;
    inputNum = false;
  });
}

assign();
