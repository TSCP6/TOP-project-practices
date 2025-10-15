const number_btns = document.querySelectorAll(".num-btn");
const op_btns = document.querySelectorAll(".op-btn");
const equal_btn = document.querySelector(".equal-btn");
const clear_btn = document.querySelector(".clear-btn");
const dec_btn = document.querySelector(".decimal-btn");
const del_btn = document.querySelector('.delete-btn');
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
  curInput = "0";
  hasEqual = false;
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
  op = null,
  curInput = "0",
  hasEqual = false;

function assign() {
  number_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const num = btn.innerHTML;
      if (hasEqual) {
        clear();
      }
      if(curInput === "0"){
        curInput = num;
      }else {
        curInput += num;
      }
      display_nowmenu.innerHTML = curInput;
    });
  });
  op_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const curOp = btn.innerHTML;
      const num2 = parseFloat(curInput);
      if (hasEqual) {
        hasEqual = false;
      } else{
        if(op !== null){
          num1 = operate(num1 , op , num2);
        }else {
          num1 = num2;
        }
      }
      op = curOp;
      const displayNum1 = Math.round(num1 * 100000000) / 100000000;
      display_premenu.innerHTML = displayNum1 + op;
      display_nowmenu.innerHTML = displayNum1;
      curInput = "0"; 
    });
  });
  equal_btn.addEventListener("click", () => {
    if(op === null || hasEqual) return;
    const num2 = parseFloat(curInput);
    display_premenu.innerHTML += " " + num2 + " =";
    let res = operate(num1, op, num2);

    if (res === null) {
      display_nowmenu.innerHTML = "ERROR 0";
    } else {
      num1 = res; 
      display_nowmenu.innerHTML = Math.round(res * 100000000) / 100000000;
    }
    
    op = null;
    curInput = "0";
    hasEqual = true;
  });
  dec_btn.addEventListener("click", () => {
    if (hasEqual) {
      clear();
    }
    if (!curInput.includes(".")) {
      curInput += ".";
      display_nowmenu.innerHTML = curInput;
    }
  });
  del_btn.addEventListener('click',() => {
    if(hasEqual) return;
    curInput = curInput.slice(0,-1);
    if(curInput === "") curInput = "0";
    display_nowmenu.innerHTML = curInput;
  })
}

clear_btn.addEventListener("click", clear);

assign();