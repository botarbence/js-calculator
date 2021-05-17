class Calculator {
  constructor(prevNumTxtEl, curNumTxtEl) {
    this.prevNumTxtEl = prevNumTxtEl;
    this.curNumTxtEl = curNumTxtEl;
    this.clear();
  }

  clear() {
    this.curNum = "";
    this.prevNum = "";
    this.operation = undefined;
  }

  delete() {
    this.curNum = this.curNum.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.curNum.includes(".")) return;
    this.curNum = this.curNum.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.curNum === "") return;
    if (this.prevNum !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevNum = this.curNum;
    this.curNum = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.prevNum);
    const current = parseFloat(this.curNum);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.curNum = computation;
    this.operation = undefined;
    this.prevNum = "";
  }

  getDisplayNum(number) {
    const stringNum = number.toString();
    const integerDigits = parseFloat(stringNum.split(".")[0]);
    const decimalDigits = stringNum.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.curNumTxtEl.textContent = this.getDisplayNum(this.curNum);
    if (this.operation != null) {
      this.prevNumTxtEl.textContent = `${this.getDisplayNum(this.prevNum)} ${
        this.operation
      }`;
    } else {
      this.prevNumTxtEl.textContent = "";
    }
  }
}

const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalsBtn = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-all-clear]");
const prevNumTxtEl = document.querySelector("[data-previous-operand]");
const curNumTxtEl = document.querySelector("[data-current-operand]");

const calculator = new Calculator(prevNumTxtEl, curNumTxtEl);

numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.textContent);
    calculator.updateDisplay();
  });
});

operationBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.textContent);
    calculator.updateDisplay();
  });
});

equalsBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
