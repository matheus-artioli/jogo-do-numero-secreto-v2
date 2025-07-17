const uniqueNumbers = [];
const maxGuess = 50;
let secretNumber = generateUniqueNumber();
let attempts = 0;

const setText = (selector, text, speak = false) => {
  const element = document.querySelector(selector);
  element.innerHTML = text;
  if (speak) {
    responsiveVoice.speak(text, "Brazilian Portuguese Female", { rate: 1.2 });
  }
};

const initializeMessage = () => {
  setText("h1", "Jogo da Adivinhação");
  setText("p", `Tente adivinhar o número secreto entre 1 e ${maxGuess}`);
};

const verifyGuess = () => {
  const inputField = document.querySelector("input");
  const guess = parseInt(inputField.value);

  if (isNaN(guess) || guess < 1 || guess > maxGuess) {
    setText("h1", "Número inválido!");
    setText("p", `Digite um número entre 1 e ${maxGuess}.`, true);
    clearInput();
    return;
  }

  attempts++;

  if (guess === secretNumber) {
    clearInput();
    setText("h1", "Você acertou!");
    setText(
      "p",
      `Você descobriu o número secreto com ${attempts} ${
        attempts === 1 ? "tentativa" : "tentativas"
      }.`,
      true
    );
    document.getElementById("reiniciar").disabled = false;
  } else {
    setText("h1", "Você errou!");
    setText(
      "p",
      `O número secreto é ${
        guess > secretNumber ? "menor" : "maior"
      } que ${guess}.`,
      true
    );
    clearInput();
  }
};

const generateUniqueNumber = (() => {
  const numbers = [];
  return () => {
    if (numbers.length === maxGuess) {
      numbers.length = 0;
      console.log("Todos os números já foram gerados.");
    }
    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * maxGuess) + 1;
    } while (numbers.includes(newNumber));
    numbers.push(newNumber);
    return newNumber;
  };
})();

const enableEnterKey = () => {
  document.querySelector("input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      verifyGuess();
    }
  });
};

const clearInput = () => {
  const input = document.querySelector("input");
  input.value = "";
};

const restartGame = () => {
  secretNumber = generateUniqueNumber();
  clearInput();
  attempts = 0;
  initializeMessage();
  document.getElementById("reiniciar").disabled = true;
};

initializeMessage();
enableEnterKey();
