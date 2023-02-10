const currentWord = "hangman";
const maxGuesses = 7;

// context variables
let lettersMatched = "";
let lettersGuessed = "";
let numLettersMatched = 0;


while (numLettersMatched < currentWord.length && lettersGuessed.length < maxGuesses) {

    // Get input from user
    let letter = prompt("Please enter a letter:");

    // Check if the letter is in the word
    if (currentWord.includes(letter) && !lettersMatched.includes(letter)) {
        lettersMatched += letter;

        // Calculate the new number of letters matched
        for (let currentLetter of currentWord) {
            if (currentLetter === letter) {
                numLettersMatched += 1;
            }
        }

    } else {
        lettersGuessed += letter;
    }


    // Display the current state of the word
    let displayWord = "";
    for (const char of currentWord) {
        if (lettersMatched.includes(char)) {
            displayWord += char;
        } else {
            displayWord += "_";
        }
    }

    console.log(displayWord);
}