//Player structure = {"Username" : , "Password" : , "Score" : , "Ranking" : , "Stat" : }
var basePlayer = {"Username" : "Username", "Password" : "Password", "Score" : 10, "Ranking" : 1, "rolling-Time" : 15, 
'high-Mul' : 3, 'low-Mul' : 2, 'hilo-Mul' : 5, 'base-Add' : 0, 'auto-Dice' : 0};
var clientPlayer = {"Username" : "Client", "Password" : "Password", "Score" : 100, "Ranking" : 0, "rolling-Time" : 5, 
'high-Mul' : 3, 'low-Mul' : 2, 'hilo-Mul' : 5, 'base-Add' : 0, 'auto-Dice' : 0};

//link to home-page
document.getElementById("homeButton").addEventListener("click", function() {
    window.location.href = "/";
});


///Rule page is not implemented///
//link to rule-page
document.getElementById("ruleButton").addEventListener("click", function(){
    window.location.href = "/rules";
});

//////////////
//Added Part//
//////////////
let lastUpdate = 0;
var timer = 15 * 1000;
var startScramble = false;
var finalAnswer = [5,5,5]
var randomArray = [0, 0, 0]
var bet_value = 0;
var i = 0;

var res = document.getElementById("result");
var win = document.getElementById("winning-status");
var bet = document.getElementById("bet-value");
var gameState = document.getElementById("game-State");
var hundredUpgradeStep = 10;


function getRandomInt() {
    var ans = Math.floor(Math.random() * 6) + 1;
    return ans;
}

function resetBetButtonColor(){
    for (let i = 0; i < 3; i++){
        document.getElementById(btn_list[i]).style = '#000000';
    }
    choose = -1;
}

document.getElementById("hi-Btn").addEventListener("click", function(){
    resetBetButtonColor();
    bet_value = document.getElementById("bet-value").value;
    document.getElementById("hi-Btn").style.backgroundColor = '#04AA6D';
    choose = 0;
});

document.getElementById("lo-Btn").addEventListener("click", function(){
    resetBetButtonColor();
    bet_value = document.getElementById("bet-value").value;
    document.getElementById("lo-Btn").style.backgroundColor = '#04AA6D';
    choose = 2;
});

document.getElementById("hilo-Btn").addEventListener("click", function(){
    resetBetButtonColor();
    bet_value = document.getElementById("bet-value").value;
    document.getElementById("hilo-Btn").style.backgroundColor = '#04AA6D';
    choose = 1;
});

document.getElementById("roll-Btn").addEventListener("click", function(){
        startScramble = true;
        document.getElementById("roll-Btn").setAttribute("disabled", true);
});

function base_price(statType){
    if (statType === 'auto-Dice'){
        return 1000;
    }
    else return 10;
}

var gameStat = ['rolling-Time', 'high-Mul', 'low-Mul', 'hilo-Mul', 'base-Add', 'auto-Dice'];

function upgrade(statType){
    if (document.getElementById(statType).value < document.getElementById(statType).max && document.getElementById(statType + '-Btn').innerHTML <= clientPlayer.Score){
        //Transaction and update to server
        clientPlayer.Score -= document.getElementById(statType + '-Btn').innerHTML;
        updateScore();
        document.getElementById(statType).value = parseInt(document.getElementById(statType).value + 1, 10);
        if (statType === 'auto-Dice' || statType === 'base-Add'){
            clientPlayer[statType] = clientPlayer[statType] + 1;
        }
        else if (statType === 'rolling-Time'){
            clientPlayer[statType] = (clientPlayer[statType] * hundredUpgradeStep - 1) / hundredUpgradeStep;   
            timer = clientPlayer[statType] * 1000;
        }
        else {
            clientPlayer[statType] = (clientPlayer[statType] * hundredUpgradeStep + 1) / hundredUpgradeStep;
        }
        if (document.getElementById(statType).value < document.getElementById(statType).max){
            document.getElementById(statType + '-Btn').innerHTML = document.getElementById(statType).value * 10 + base_price(statType);
        }
        else {
            document.getElementById(statType + '-Btn').innerHTML = 'max';
        }
        document.getElementById(statType + "-Text").innerHTML = clientPlayer[statType];
    }
}

function displayTime(t){
    return Math.trunc((t - lastUpdate + 999)/ 1000);
}

const config = {
    type : Phaser.AUTO,
    width : 800,
    height : 300,
    backgroundColor: '#4488aa',
    scene : {
        preload : preload,
        create : create,
        update : update
        
    }
};
function updateRank(){
    document.getElementById("username").innerHTML = clientPlayer.Username + " Rank : " + clientPlayer.Ranking;
}
function updateScore(){
    document.getElementById("score").innerHTML = clientPlayer.Score;
    console.log(clientPlayer.Score);
}

function loadPlayerData(){
    //Username & Rank
    updateRank();


    //Score
    updateScore();

    //Stat
    for (let i = 0; i < gameStat.length; i++){
        var statType = gameStat[i];
        document.getElementById(statType + '-Text').innerHTML = clientPlayer[statType];
        
        if (statType === 'auto-Dice' || statType === 'base-Add'){
            document.getElementById(statType).value = clientPlayer[statType];
        }
        else if (statType === 'rolling-Time'){
            document.getElementById(statType).value = Math.trunc(basePlayer[statType] - clientPlayer[statType]) * hundredUpgradeStep;
            timer = clientPlayer[statType] * 1000;
        }
        else {
            document.getElementById(statType).value = Math.trunc(clientPlayer[statType] - basePlayer[statType]) * hundredUpgradeStep;
        }
        if (document.getElementById(statType).value < document.getElementById(statType).max){
            document.getElementById(statType + '-Btn').innerHTML = document.getElementById(statType).value * 10 + base_price(statType);
        }
        else {
            document.getElementById(statType + '-Btn').innerHTML = 'max';
        }
    }
}

function preload(){
    loadPlayerData();
    this.load.image('DiceZero', 'FaceOfDice/zero.png');
    this.load.image('DiceOne', 'FaceOfDice/one.png');
    this.load.image('DiceTwo', 'FaceOfDice/two.png');
    this.load.image('DiceThree', 'FaceOfDice/three.png');
    this.load.image('DiceFour', 'FaceOfDice/four.png');
    this.load.image('DiceFive', 'FaceOfDice/five.png');
    this.load.image('DiceSix', 'FaceOfDice/six.png');
}

var dicePosition = [[190, 150], [400, 150], [610,150]];
var diceMap = {0 : 'DiceZero', 1 : 'DiceOne', 2 : 'DiceTwo', 3 : 'DiceThree', 4 : 'DiceFour', 5 : 'DiceFive', 6 : 'DiceSix'};
var choose = -1;
var scale = 0.2
var btn_list = ["hi-Btn", "lo-Btn", "hilo-Btn"];



function create(){
    gameState.innerHTML = "WAITING";
    document.getElementById("timer-Text").innerHTML = displayTime(0);
    this.dice1 = this.add.image(dicePosition[0][0], dicePosition[0][1], 'DiceZero').setScale(scale);
    this.dice2 = this.add.image(dicePosition[1][0], dicePosition[1][1], 'DiceZero').setScale(scale);
    this.dice3 = this.add.image(dicePosition[2][0], dicePosition[2][1], 'DiceZero').setScale(scale);
    //this.dice1.setTexture('DiceOne');
}

//If bet is larger than score
function update(time, delta){
    //updateRank();
    
    if (clientPlayer["auto-Dice"]){
        startScramble = 1;
        document.getElementById("roll-Btn").setAttribute("disabled", true);
    }

    if (startScramble){
        lastUpdate += delta;
        document.getElementById("timer-Text").innerHTML = displayTime(timer);

        
        if (lastUpdate > timer - 1000 && lastUpdate < timer){  
            if (i == 0){
                if (bet_value < 0 || bet_value > clientPlayer.Score || choose == -1){
                    console.log(bet_value);
                    console.log(clientPlayer.Score);
                    bet_value = 0;
                    bet.value = 0;
                    resetBetButtonColor();
                    choose = -1;
                }
                clientPlayer.Score -= bet_value;
                updateScore();
                i++;
            }  
            gameState.innerHTML = "Rolling"
            for (let i = 0; i < 3; i++){
                document.getElementById(btn_list[i]).setAttribute("disabled", true);
            }
            bet.setAttribute("disabled",true)

            //Locked the betting part
            
            
            


            for (let i = 0 ;i < 3; i++){
                randomArray[i] = getRandomInt()
            }
            this.dice1.setTexture(diceMap[randomArray[0]]);
            this.dice2.setTexture(diceMap[randomArray[1]]);
            this.dice3.setTexture(diceMap[randomArray[2]]);
        }

        else if (lastUpdate >= timer) {     //stop roll (2) after receive the final answer from server
            
            var bonus = 1;
            gameState.innerHTML = "WAITING"
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
                bonus = clientPlayer["high-Mul"];
            }
            else if (ans == 11){
                res.innerHTML = 'Hi-Lo'
                choice = 1;
                bonus = clientPlayer["hilo-Mul"];
            }
            else {
                res.innerHTML = 'Low'
                choice = 2;
                bonus = clientPlayer["low-Mul"];
            }
            startScramble = false
            lastUpdate = 0;

            ///////////////////////////////////
            //Server update balance to client//
            ///////////////////////////////////

            if (choice == choose){
                win.innerHTML = 'You win ' + parseInt(bet_value * bonus);
            }
            else if (choose == -1){
                win.innerHTML = 'You did not bet';
                bonus = 0;
            }
            else {
                win.innerHTML = 'You lose ' + bet_value;
                bonus = 0;
            }
            resetBetButtonColor();
            for (let i = 0; i < 3; i++){
                document.getElementById(btn_list[i]).removeAttribute("disabled");
                
            }
            clientPlayer.Score += parseInt(bet_value * bonus + clientPlayer["base-Add"] + ans);
            updateScore();
            bet_value = 0;
            i = 0;
            document.getElementById("roll-Btn").removeAttribute("disabled");
        }
        
        
    }
    
}

let game = new Phaser.Game(config);

