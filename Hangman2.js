class Settings {
    /*
     *       Game settings for a party
     */
    constructor(lives, words) {
        // Configure words and live to be used in the game
        this.lives = lives;
        this.words = words;
        this.configureMessage();
    }

    // Configure the messages to be displayed to the user
    configureMessage() {
        this.messages = {
            win: 'Congratulations you won!',
            lose: 'You lost. Try again!',
            guessed: ' letter already tried, try again',
            validLetter: 'Please enter a letter from A-Z'
        };
    }
}
class Board {
    /*
    *       Board that displays the information to the user
    */

    setup() {

        // Get all used elements on the HTML page
        this.output = document.getElementById("output");
        this.man = document.getElementById("man");
        this.guessInput = document.getElementById("letter");

        // Reset values
        this.output.innerHTML = '';
        document.getElementById("letter").value = '';

        // Make sure that the guess button is enabled
        this.guessButton = document.getElementById("guess");
        this.guessInput.style.display = 'inline';
        this.guessButton.style.display = 'inline';

        // set up display of letters in current word
        this.letters = document.getElementById("letters");
        this.letters.innerHTML = '<li class="current-word">Current word:</li>';
        return this;
    }

    remainingLives(lives) {

        // Display the remaining lives to the user
        this.man.innerHTML = 'You have ' + lives + ' left';
        return this;
    }

    writeLetters(currentWord) {

        // Display the letters of the current word as UPPER CASE with style for the user
        for (let letter of currentWord) {
            let letterElement = '<li class="letter letter' + letter.toUpperCase() + '">' + letter.toUpperCase() + '</li>';
            this.letters.insertAdjacentHTML('beforeend', letterElement);
        }

        return this;
    }

    setGameOver(win, settings) {

        // Display the game over message to the user
        if (win) {
            this.output.innerHTML = settings.messages.win;
            this.output.classList.add('win');
        } else {
            this.output.innerHTML = settings.messages.lose;
            this.output.classList.add('error');
        }

        // Hide the guess button and input
        this.guessInput.style.display = this.guessButton.style.display = 'none';
        this.guessInput.value = '';

        return this;
    }


    clearOutput() {
        // Clear the output message
        this.output.innerHTML = '';
        this.output.classList.remove('error', 'warning');

        return this;
    }

    outputError(validLetter) {
        // Display the error message to the user
        this.output.classList.add('error');
        this.output.innerHTML = validLetter;

        return this;
    }

    outputWarning(guess, guessed) {
        // Display the warning message to the user
        this.output.innerHTML = '"' + guess.toUpperCase() + '"' + guessed;
        this.output.classList.add("warning");

        return this;
    }

    showMatchedLetter(guess) {
        // Display the available letters to the user
        let lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

        for (let letter of lettersToShow) {
            letter.classList.add("correct");
        }

        return this;
    }
}

class Game {
    /*
    *      Game logic for a single guess
    */

    constructor(settings) {
        this.settings = settings;
    }

    initDefaultGameSettings() {
        // Set the default game settings
        this.lettersGuessed = "";
        this.lettersMatched = "";
        this.numLettersMatched = 0;
        this.currentWord = this.settings.words[Math.floor(Math.random() * this.settings.words.length)];

        return this;
    }

    setup() {
        // Set up the game at the start just once at the start
        this.initDefaultGameSettings();
        this.board = new Board().setup();
        this.board.remainingLives(this.settings.lives);
        this.board.writeLetters(this.currentWord);

        return this;
    }

    reset(settings) {
        // Reset the game for a new party
        this.initDefaultGameSettings();
        this.settings = settings;
        this.board = new Board().setup();
        this.board.remainingLives(this.settings.lives);
        this.board.writeLetters(this.currentWord);

        return this;
    }

    // Check if the user has won the game or has found a letter
    onGuessSubmitted(event) {

        if (event.preventDefault) event.preventDefault();

        // Clear the previous output message
        this.board.clearOutput();

        // Get the new letter from the user in lower case
        let guess = this.board.guessInput.value.toLowerCase();

        // Check if the letter is valid
        if (guess === null || !guess.match(/^[a-z]+$/)) {
            this.board.outputError(this.settings.messages.validLetter);
            return this;
        }

        // Check if the letter has already been guessed
        if (this.lettersGuessed.includes(guess) || this.lettersMatched.includes(guess)) {
            this.board.outputWarning(guess, this.settings.messages.guessed);
        }

        // Check if the letter is in the current word
        else if (this.currentWord.includes(guess)) {

            // If yes display the letter on the board
            this.board.showMatchedLetter(guess);

            /* check to see if letter appears multiple times */
            for (let letter of this.currentWord) {
                if (letter === guess) {
                    this.numLettersMatched += 1;
                }
            }

            // Update the letters matched and check if the user has won
            this.lettersMatched += guess;
            if (this.numLettersMatched === this.currentWord.length) {
                this.gameOver(true);
            }
        }
        // The letter is not in the current word
        else {

            // Remove a life and check if the user has lost
            this.lettersGuessed += guess;
            this.settings.lives--;
            this.board.remainingLives(this.settings.lives);

            if (this.settings.lives === 0) this.gameOver(false);
        }
        return this;
    }


    gameOver(win) {
        // Display the game over message to the user
        this.board.setGameOver(win, this.settings);
        return this;
    }
}

function main() {

    // Default game settings
    let lives = 7;
    let words = ["tiger", "bird", "cat", "horse", "panther", "lion"];
    let settings = new Settings(lives, words);

    // Set up the game
    let game = new Game(settings);
    game.setup();

    // Set up the event listener for the guess button
    document.getElementById("restart").onclick = () => game.reset(new Settings(lives, words));
    document.getElementById("hangman").onsubmit = (e) => game.onGuessSubmitted(e);
}

main();