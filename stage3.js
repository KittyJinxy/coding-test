const wordDisplay = document.querySelector(".word-display");
const letterInput = document.querySelector("#letter-input");
const submitButton = document.querySelector("#submit-button");
const resultMessage = document.querySelector("#result-message");
const restartButton = document.querySelector("#restart-button");

let currentWord = "hangman";
const maxGuesses = 7;
let lettersMatched = "";
let lettersGuessed = "";
let numLettersMatched = 0;

submitButton.addEventListener("click", function () {
    const letter = letterInput.value;

    if (currentWord.includes(letter) && !lettersMatched.includes(letter)) {
        lettersMatched += letter;
        for (let currentLetter of currentWord) {
            if (currentLetter === letter) {
                numLettersMatched += 1;
            }
        }
    } else {
        lettersGuessed += letter;
    }

    let displayWord = "";
    for (const char of currentWord) {
        if (lettersMatched.includes(char)) {
            displayWord += char;
        } else {
            displayWord += "_";
        }
    }
    wordDisplay.textContent = displayWord;
    letterInput.value = "";

    if (numLettersMatched === currentWord.length) {
        resultMessage.textContent = "You win!";
        submitButton.style.display = "none";
        letterInput.style.display = "none";
    } else if (lettersGuessed.length === maxGuesses) {
        resultMessage.textContent = `You lose! The word was "${currentWord}"`;
        submitButton.style.display = "none";
        letterInput.style.display = "none";
    } else {
        resultMessage.textContent = `You have ${maxGuesses - lettersGuessed.length} guess(es) left`;
    }
});

restartButton.addEventListener("click", function () {
    currentWord = "hangman";
    lettersMatched = "";
    lettersGuessed = "";
    numLettersMatched = 0;

    submitButton.style.display = "inline-block";
    letterInput.style.display = "inline-block";

    resultMessage.textContent = "";
    wordDisplay.textContent = "";
    letterInput.value = "";
});