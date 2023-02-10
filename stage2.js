function playHangman() {
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

    // Check if the player won or lost
    if (numLettersMatched === currentWord.length) {
        console.log("Congratulations! You won the game.");
    } else {
        console.log("Sorry, you lost the game.");
    }

    // Ask the player if they want to play again
    let playAgain = prompt("Do you want to play again? (yes/no)");
    if (playAgain === "yes") {
        playHangman();
    } else {
        console.log("Thank you for playing!");
    }
}

playHangman();