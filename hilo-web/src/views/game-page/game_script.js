let currentNumber;
let score = 0;

//link to home-page
document.getElementById("homeButton").addEventListener("click", function() {
    window.location.href = "/";
});

// function startGame() {
//     currentNumber = generateRandomNumber();
//     document.getElementById("currentNumber").textContent = currentNumber;
// }

// function firstNumber() {
//     return Math.floor(Math.random() * 6) + 1; // Random number between 1 and 100
// }

// function secondNumber() {
//     return Math.floor(Math.random() * 6) + 1; // Random number between 1 and 100
// }

// function guess(higherOrLower) {
//     const userGuess = parseInt(document.getElementById("userGuess").value);
//     if (isNaN(userGuess)) {
//         alert("Please enter a valid number.");
//         return;
//     }
//     const nextNumber = generateRandomNumber();
//     let result;
//     if ((higherOrLower === "higher" && nextNumber > currentNumber) || (higherOrLower === "lower" && nextNumber < currentNumber)) {
//         result = "Correct!";
//         score++;
//     } else {
//         result = "Incorrect! Game over.";
//         score = 0;
//     }
//     document.getElementById("result").textContent = result;
//     document.getElementById("score").textContent = score;
//     currentNumber = nextNumber;
//     document.getElementById("currentNumber").textContent = currentNumber;
// }

// function restartGame() {
//     score = 0;
//     document.getElementById("score").textContent = score;
//     startGame();
// }

//////////////
//Added Part//
//////////////
let lastUpdate = 0;
var timer = 1 * 1000;
var startScramble = false;
var finalAnswer = [5,5,5]
var randomArray = [0, 0, 0]
var bet_value = 0;

var res = document.getElementById("result");
var win = document.getElementById("winning-status");
var bet = document.getElementById("bet-value");
var gameState = document.getElementById("game-State");

function getRandomInt() {
    return Math.floor(Math.random() * 5) + 1;
}

document.getElementById("hi-Btn").addEventListener("click", function(){
    bet_value = document.getElementById("bet-value").value;
    if (bet_value > 0){
        choose = 0;
        document.getElementById("hi-Btn").style.backgroundColor = '#04AA6D';
        for (let i = 0; i < 3; i++){
            document.getElementById(btn_list[i]).setAttribute("disabled", true);
        }
        bet.setAttribute("disabled", true)
    }
});

document.getElementById("lo-Btn").addEventListener("click", function(){
    bet_value = document.getElementById("bet-value").value;
    if (bet_value > 0){
        document.getElementById("lo-Btn").style.backgroundColor = '#04AA6D';
        choose = 2;
        for (let i = 0; i < 3; i++){
            document.getElementById(btn_list[i]).setAttribute("disabled", true);
        }
        bet.setAttribute("disabled", true)
    }
});

document.getElementById("hilo-Btn").addEventListener("click", function(){
    bet_value = document.getElementById("bet-value").value;
    if (bet_value > 0){
        document.getElementById("hilo-Btn").style.backgroundColor = '#04AA6D';
        choose = 1;
        for (let i = 0; i < 3; i++){
            document.getElementById(btn_list[i]).setAttribute("disabled", true);
        }
        bet.setAttribute("disabled",true)
    }
});

////////////////////////
//Send money to server//
////////////////////////

//Server will command// startroll and stoproll
document.getElementById("roll-Btn").addEventListener("click", function(){
    res.innerHTML = '';
    win.innerHTML = '';
    startScramble = true;
    document.getElementById("timer-Text").innerHTML = timer;
});

function displayTime(t){
    return Math.trunc((t - lastUpdate + 800)/ 1000);
}

const config = {
    type : Phaser.AUTO,
    width : 800,
    height : 600,
    backgroundColor: '#4488aa',
    scene : {
        preload : preload,
        create : create,
        update : update
        
    }
};

function preload(){
    this.load.image('DiceZero', 'FaceOfDice/zero.png');
    this.load.image('DiceOne', 'FaceOfDice/one.png');
    this.load.image('DiceTwo', 'FaceOfDice/two.png');
    this.load.image('DiceThree', 'FaceOfDice/three.png');
    this.load.image('DiceFour', 'FaceOfDice/four.png');
    this.load.image('DiceFive', 'FaceOfDice/five.png');
    this.load.image('DiceSix', 'FaceOfDice/six.png');
}

var dicePosition = [[190, 300], [400, 300], [610,300]];
var diceMap = {0 : 'DiceZero', 1 : 'DiceOne', 2 : 'DiceTwo', 3 : 'DiceThree', 4 : 'DiceFour', 5 : 'DiceFive', 6 : 'DiceSix'};
var choose = 0;
var scale = 0.2
var btn_list = ["hi-Btn", "lo-Btn", "hilo-Btn"];

function create(){
    gameState.innerHTML = "IDLE";
    document.getElementById("timer-Text").innerHTML = displayTime(0);
    this.dice1 = this.add.image(dicePosition[0][0], dicePosition[0][1], 'DiceZero').setScale(scale);
    this.dice2 = this.add.image(dicePosition[1][0], dicePosition[1][1], 'DiceZero').setScale(scale);
    this.dice3 = this.add.image(dicePosition[2][0], dicePosition[2][1], 'DiceZero').setScale(scale);
    //this.dice1.setTexture('DiceOne');
}


function update(time, delta){

    if (startScramble){
        lastUpdate += delta;
        document.getElementById("timer-Text").innerHTML = displayTime(timer);
    
        if (lastUpdate < timer){    //start roll (1)
            gameState.innerHTML = "Rolling"
            for (let i = 0 ;i < 3; i++){
                randomArray[i] = getRandomInt()
            }
            this.dice1.setTexture(diceMap[randomArray[0]]);
            this.dice2.setTexture(diceMap[randomArray[1]]);
            this.dice3.setTexture(diceMap[randomArray[2]]);
        }

        else if (lastUpdate >= timer) {     //stop roll (2) after receive the final answer from server
            gameState.innerHTML = "Idle"
            bet.removeAttribute("disabled");
            bet.value = '';
            let ans = 0;
            for (let i = 0 ;i < 3; i++){
                finalAnswer[i] = getRandomInt();
                ans += finalAnswer[i];
            }
            this.dice1.setTexture(diceMap[finalAnswer[0]]);
            this.dice2.setTexture(diceMap[finalAnswer[1]]);
            this.dice3.setTexture(diceMap[finalAnswer[2]]);
            var choice = 0;
            if (ans > 11){
                res.innerHTML = 'High'
                choice = 0;
            }
            else if (ans == 11){
                res.innerHTML = 'Hi-Lo'
                choice = 1;
            }
            else {
                res.innerHTML = 'Low'
                choice = 2;
            }
            startScramble = false
            lastUpdate = 0;

            ///////////////////////////////////
            //Server update balance to client//
            ///////////////////////////////////

            if (choice == choose){
                win.innerHTML = 'You win ' + bet_value;
            }
            else {
                win.innerHTML = 'You lose ' + bet_value; 
            }
            for (let i = 0; i < 3; i++){
                document.getElementById(btn_list[i]).removeAttribute("disabled");
                document.getElementById(btn_list[i]).style = "#000000"
            }            
        }
    }
}

let game = new Phaser.Game(config);

// Start the game when the page loads
// startGame();
