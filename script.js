const WIN = "You win!"
const LOSE = "You lose!"
const DRAW = "Draw!"

// Map '0' to "rock", '1' to "paper", '2' to "scissors"
const arr = ["Rock", "Paper", "Scissors"];


// Total rounds
let count = 0;

// Initialize both score
let humanScore = computerScore = 0;

// Display components
const resultDiv = document.querySelector('#result');
const roundResultDiv = document.querySelector('#roundResult');
const scoreBoard = document.querySelector('#scoreBoard');
const humanScoreSpan = document.querySelector('#humanScore');
const computerScoreSpan = document.querySelector('#comScore')

function playRound(evt){
    const computerChoice = getComputerChoice();
    const humanChoice = getHumanChoice(evt.target.textContent);

    const result = decideWinner(humanChoice, computerChoice);

    roundResultDiv.textContent = getRoundResultMessage(result, humanChoice, computerChoice);
    
    if (result === WIN){
        humanScore++;
    } else if (result === LOSE){
        computerScore++;
    }

    displayRunningScore(humanScore, computerScore);

    if ((++count) === 5){
        const gameResultDiv = finishGame();
        resultDiv.appendChild(gameResultDiv);
    }
}

document.querySelectorAll('.humanChoice').forEach(element => element.addEventListener('click', playRound));


function getComputerChoice(){
    return Math.floor(Math.random() * 3);
}

function getHumanChoice(choice){
    // Return corresponding index from 'arr'
    for (let i = 0, len = arr.length; i < len; i++){
        if (choice === arr[i]){
            return i;
        }
    }
    return null;
}

function decideWinner(humanChoice, computerChoice){
    // Process 'computerChoice': map '2' to "rock", '1' to "paper", '0' to "scissors"
    processedComputerChoice = -computerChoice + 2;

    switch ((humanChoice + processedComputerChoice) % 3){
        case 0:
            return WIN;
        case 1:
            return LOSE;
        case 2:
            return DRAW;
    }
}

function getRoundResultMessage(result, humanChoice, computerChoice){
    const human = arr[humanChoice];
    const com = arr[computerChoice];
    
    switch (result){
        case WIN:
            return `${result} ${human} beats ${com}`; 
        case LOSE:
            return `${result} ${com} beats ${human}`; 
        case DRAW:
            return `${result} ${com} ties with ${human}`; 
    }
}

function displayRunningScore(humanScore, computerScore){
    humanScoreSpan.textContent = humanScore;
    computerScoreSpan.textContent = computerScore;
}

function finishGame(){
    let gameResultMessage;
    
    if (humanScore > computerScore){
        gameResultMessage = WIN;
    } else if (humanScore < computerScore){
        gameResultMessage = LOSE;
    } else {
        gameResultMessage = DRAW;
    }
    
    document.querySelectorAll('.humanChoice').forEach(element => element.removeEventListener('click', playRound));

    const container = document.createElement('div');
    container.textContent = gameResultMessage;
    return container;
}