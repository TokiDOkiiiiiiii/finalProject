var scale = 0.2;
let lastUpdate = 0;
var timer = 1 * 1000;
var startScramble = false;
var finalAnswer = [1,2,3]
var randomArray = [7, 7, 7]
//var textPosition = [[200, 100], [300, 100]]
var dicePosition = [[200, 300], [400, 300], [600,300]]
var diceMap = {0 : 'DiceZero', 1 : 'DiceOne', 2 : 'DiceTwo', 3 : 'DiceThree', 4 : 'DiceFour', 5 : 'DiceFive', 6 : 'DiceSix'}
var choose = 0
var bet_value = 0;
var btn_list = ["hi-Btn", "lo-Btn", "hilo-Btn"];

var res = document.getElementById("result");
var win = document.getElementById("winning-status");
var bet = document.getElementById("bet-value");

function getRandomInt() {
    return Math.floor(Math.random() * 5) + 1;
}

document.getElementById("hi-Btn").addEventListener("click", function(){
    bet_value = document.getElementById("bet-value").value;
    choose = 0;
    document.getElementById("hi-Btn").style.color = '#04AA6D';
    for (let i = 0; i < 3; i++){
        document.getElementById(btn_list[i]).setAttribute("disabled", true);
    }
    bet.setAttribute("disabled", true)
});

document.getElementById("lo-Btn").addEventListener("click", function(){
    bet_value = document.getElementById("bet-value").value;
    document.getElementById("lo-Btn").style.color = '#04AA6D';
    choose = 2;
    for (let i = 0; i < 3; i++){
        document.getElementById(btn_list[i]).setAttribute("disabled", true);
    }
    bet.setAttribute("disabled", true)
});

document.getElementById("hilo-Btn").addEventListener("click", function(){
    bet_value = document.getElementById("bet-value").value;
    document.getElementById("hilo-Btn").style.color = '#04AA6D';
    choose = 1;
    for (let i = 0; i < 3; i++){
        document.getElementById(btn_list[i]).setAttribute("disabled", true);
    }
    bet.setAttribute("disabled",true)
});

document.getElementById("roll-Btn").addEventListener("click", function(){
    res.innerHTML = '';
    win.innerHTML = '';
    startScramble = true;
    document.getElementById("timer-Text").innerHTML = timer;
});




// Preparing config so we can pass to create the screen(stage)
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
    // Preload assets
    this.load.image('DiceZero', 'FaceOfDice/zero.png');
    this.load.image('DiceOne', 'FaceOfDice/one.png');
    this.load.image('DiceTwo', 'FaceOfDice/two.png');
    this.load.image('DiceThree', 'FaceOfDice/three.png');
    this.load.image('DiceFour', 'FaceOfDice/four.png');
    this.load.image('DiceFive', 'FaceOfDice/five.png');
    this.load.image('DiceSix', 'FaceOfDice/six.png');


}

function create(){
    this.dice1 = this.add.image(dicePosition[0][0], dicePosition[0][1], 'DiceZero').setScale(scale);
    this.dice2 = this.add.image(dicePosition[1][0], dicePosition[1][1], 'DiceZero').setScale(scale);
    this.dice3 = this.add.image(dicePosition[2][0], dicePosition[2][1], 'DiceZero').setScale(scale);
    //this.dice1.setTexture('DiceOne');
}


function update(time, delta){

    if (startScramble){
        lastUpdate += delta;
        document.getElementById("timer-Text").innerHTML = Math.trunc((timer - lastUpdate + 800)/ 1000);
    
        if (lastUpdate < timer){
            for (let i = 0 ;i < 3; i++){
                randomArray[i] = getRandomInt()
                //this.add.image(dicePosition[i][0], dicePosition[i][1], diceMap[randomArray[i]]).setScale(scale);
            }
            this.dice1.setTexture(diceMap[randomArray[0]]);
            this.dice2.setTexture(diceMap[randomArray[1]]);
            this.dice3.setTexture(diceMap[randomArray[2]]);
        }

        else if (lastUpdate >= timer) {
            bet.removeAttribute("disabled");
            var ans = 0;
            for (let i = 0 ;i < 3; i++){
                randomArray[i] = getRandomInt();
                //this.add.image(dicePosition[i][0], dicePosition[i][1], diceMap[finalAnswer[i]]).setScale(scale);
                ans += finalAnswer[i];
            }
            this.dice1.setTexture(diceMap[randomArray[0]]);
            this.dice2.setTexture(diceMap[randomArray[1]]);
            this.dice3.setTexture(diceMap[randomArray[2]]);
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

            if (choice == choose){
                win.innerHTML = 'Congrat you win ' + bet_value;
            }
            else {
                win.innerHTML = 'Sorry you lose ' + bet_value; 
            }
            for (let i = 0; i < 3; i++){
                document.getElementById(btn_list[i]).removeAttribute("disabled");
                document.getElementById(btn_list[i]).style = "#000000"
            }
            
        }
    }
}

let game = new Phaser.Game(config);