document.addEventListener("DOMContentLoaded", () => {
    const maxGuesses = 10;
    let secretNumber = Math.floor(Math.random() * 100) + 1;
    let guessesLeft = maxGuesses;
    let timer; // Variable to hold the timer
    const timeLimit = 60; // Time limit in seconds
    let timeRemaining = timeLimit;

    const guessInput = document.getElementById("guess");
    const guessBtn = document.getElementById("guess-btn");
    const feedback = document.getElementById("feedback");
    const guessesLeftSpan = document.getElementById("guesses-left");
    const winSound = document.getElementById("win-sound");
    const loseSound = document.getElementById("lose-sound");
    const clickSound = document.getElementById("click-sound");

    const timerDisplay = document.createElement("p");
    timerDisplay.id = "timer";
    timerDisplay.textContent = `Time Remaining: ${timeRemaining} seconds`;
    document.getElementById("game-container").appendChild(timerDisplay);

    guessesLeftSpan.textContent = guessesLeft;

    guessBtn.addEventListener("click", () => {
        clickSound.play();
        const userGuess = Number(guessInput.value);

        if (!userGuess || userGuess < 1 || userGuess > 100) {
            feedback.textContent = "Please enter a number between 1 and 100.";
            return;
        }

        guessesLeft--;

        if (userGuess === secretNumber) {
            feedback.textContent = `Congratulations! You guessed the number ${secretNumber}! A new game will start.`;
            winSound.play();
            resetGame();
        } else if (guessesLeft === 0) {
            feedback.textContent = `Game over! The secret number was ${secretNumber}. A new game will start.`;
            loseSound.play();
            resetGame();
        } else if (userGuess < secretNumber) {
            feedback.textContent = "Too low! Try again.";
        } else {
            feedback.textContent = "Too high! Try again.";
        }

        guessesLeftSpan.textContent = guessesLeft;
        guessInput.value = "";
    });

    function resetGame() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        guessesLeft = maxGuesses;
        guessesLeftSpan.textContent = guessesLeft;
        guessInput.value = "";
        timeRemaining = timeLimit;
        timerDisplay.textContent = `Time Remaining: ${timeRemaining} seconds`;
        clearInterval(timer);
        startTimer();
    }

    function startTimer() {
        timer = setInterval(() => {
            timeRemaining--;
            timerDisplay.textContent = `Time Remaining: ${timeRemaining} seconds`;

            if (timeRemaining <= 0) {
                clearInterval(timer);
                feedback.textContent = `Time's up! The secret number was ${secretNumber}. A new game will start.`;
                loseSound.play();
                resetGame();
            }
        }, 1000);
    }

    // Start the timer when the page loads
    startTimer();
});
