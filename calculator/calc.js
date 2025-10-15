const number_btns = document.querySelectorAll(".num-btn");
const op_btns = document.querySelectorAll(".op-btn");
const equal_btn = document.querySelector(".equal-btn");
const clear_btn = document.querySelector(".clear-btn");
const dec_btn = document.querySelector(".decimal-btn");
const display_premenu = document.querySelector(".pre-display");
const display_nowmenu = document.querySelector(".now-display")

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
    return null;
  }
  return num1 / num2;
}

function clear() {
  display_nowmenu.innerHTML = "0";
  display_premenu.innerHTML = "";
  num1 = num2 = 0;
  op = null;
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
  inputNum = false,
  hasEqual = false,
  isDec = false,
  hasDecPoint = false;

function assign() {
  let num;
  number_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      num = btn.innerHTML;
      if (hasEqual) {
        display_premenu.innerHTML = "";
        hasEqual = false;
      }
      inputNum = true;
      if (isDec) {
        num2 += parseFloat(num / 10);
      } else {
        num2 = parseFloat(num2 * 10) + parseFloat(num);
      }
      display_nowmenu.innerHTML = num2;
    });
  });
  op_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let curOp = btn.innerHTML;
      if (hasEqual) {
        hasEqual = false;
        inputNum = false;
      }
      if (isDec) isDec = false;
      if (inputNum) {
        if (op !== null) {
          let res = operate(num1, op, num2);
          num1 = res;
          display_nowmenu.innerHTML =
            Math.round(num1 * 1000000000000) / 1000000000000;
        } else {
          num1 = num2;
          display_nowmenu.innerHTML = num1;
        }
        num2 = 0;
      }
      op = curOp;
      display_premenu.innerHTML = num1 + op;
      inputNum = false;
    });
  });
  equal_btn.addEventListener("click", () => {
    if (!hasEqual) {
      if (op === null) {
        display_premenu.innerHTML += num2 + "=";
        num1 = num2;
        display_nowmenu.innerHTML = num1;
      } else {
        display_premenu.innerHTML += num2 + "=";
        let res = operate(num1, op, num2);
        if (res === null) {
          display_nowmenu.innerHTML = "ERROR 0";
        } else {
          num1 = res;
          display_nowmenu.innerHTML =
            Math.round(num1 * 1000000000000) / 1000000000000;
        }
      }
      op = null;
      num2 = 0;
      inputNum = false;
      hasEqual = true;
    }
  });
  dec_btn.addEventListener("click", () => {
    isDec = true;
    if (!hasDecPoint) {
      display_nowmenu.innerHTML += ".";
      hasDecPoint = true;
    }
    if (hasEqual) {
      num2 = 0;
      display_nowmenu = num2 + ".";
    }
  });
}

clear_btn.addEventListener("click", clear);

assign();
