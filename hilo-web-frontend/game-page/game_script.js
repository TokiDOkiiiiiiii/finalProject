let currentNumber;
let score = 0;

function startGame() {
    currentNumber = generateRandomNumber();
    document.getElementById("currentNumber").textContent = currentNumber;
}

function firstNumber() {
    return Math.floor(Math.random() * 6) + 1; // Random number between 1 and 100
}

function secondNumber() {
    return Math.floor(Math.random() * 6) + 1; // Random number between 1 and 100
}

function guess(higherOrLower) {
    const userGuess = parseInt(document.getElementById("userGuess").value);
    if (isNaN(userGuess)) {
        alert("Please enter a valid number.");
        return;
    }
    const nextNumber = generateRandomNumber();
    let result;
    if ((higherOrLower === "higher" && nextNumber > currentNumber) || (higherOrLower === "lower" && nextNumber < currentNumber)) {
        result = "Correct!";
        score++;
    } else {
        result = "Incorrect! Game over.";
        score = 0;
    }
    document.getElementById("result").textContent = result;
    document.getElementById("score").textContent = score;
    currentNumber = nextNumber;
    document.getElementById("currentNumber").textContent = currentNumber;
}

function restartGame() {
    score = 0;
    document.getElementById("score").textContent = score;
    startGame();
}

// Start the game when the page loads
startGame();
