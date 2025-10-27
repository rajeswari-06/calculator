const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let lastInput = "";
let resultDisplayed = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => handleInput(button.textContent));
});

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (/[0-9+\-*/.=]/.test(key)) handleInput(key);
  if (key === "Enter") handleInput("=");
  if (key.toLowerCase() === "c") handleInput("C");
});

function handleInput(input) {
  if (input === "C") {
    currentInput = "";
    display.textContent = "0";
    return;
  }

  if (input === "=") {
    try {
      if (!currentInput.trim()) return;
      // Evaluate safely using Function constructor (not eval)
      const result = Function(`"use strict"; return (${currentInput})`)();
      display.textContent = result;
      currentInput = result.toString();
      resultDisplayed = true;
    } catch {
      display.textContent = "Error";
      currentInput = "";
    }
    return;
  }

  if (resultDisplayed && /[0-9.]/.test(input)) {
    currentInput = input;
    resultDisplayed = false;
  } else {
    currentInput += input;
  }

  display.textContent = currentInput;
}
