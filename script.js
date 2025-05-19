function playGame(count){
    // Strings representing 3 results
    const WIN = "You win!"
    const LOSE = "You lose!"
    const DRAW = "Draw!"
    
    // Map '0' to "rock", '1' to "paper", '2' to "scissors"
    const arr = ["rock", "paper", "scissors"];

    // Get random int bewteen 0 and 2
    function getComputerChoice(){
        return Math.floor(Math.random() * 3);
    }

    function getHumanChoice(){
        // Prompt user's choice
        const choice = prompt("Rock Paper Scissors Game! Select your choice.", "'rock' or 'paper' or 'scissors'");

        // Return corresponding index from 'arr'
        for (let i = 0, len = arr.length; i < len; i++){
            if (choice === arr[i]){
                return i;
            }
        }
        return null;
    }

    function playRound(humanChoice, compurterChoice){
        // Get string of both sides' choice
        const human = arr[humanChoice].at(0).toUpperCase() + arr[humanChoice].slice(1);
        const com = arr[compurterChoice].at(0).toUpperCase() + arr[compurterChoice].slice(1);

        const result = decideWinner(humanChoice, compurterChoice);

        // Message to show result of round
        let resultMessage;

        switch (result){
            case WIN:
                resultMessage = `${result} ${human} beats ${com}`; break;
            case LOSE:
                resultMessage = `${result} ${com} beats ${human}`; break;
            case DRAW:
                resultMessage = `${result} ${com} ties with ${human}`; break;
        }

        console.log(resultMessage);

        return result;
    }

    function decideWinner(humanChoice, compurterChoice){
        // Process 'computerChoice': map '2' to "rock", '1' to "paper", '0' to "scissors"
        compurterChoice = -compurterChoice + 2;

        switch ((humanChoice + compurterChoice) % 3){
            case 0:
                return WIN;
            case 1:
                return LOSE;
            case 2:
                return DRAW;
        }
    }

    // Initialize both score
    let humanScore = computerScore = 0;

    for (let i = 0; i < count; i++){
        const humanSelection = getHumanChoice();
        const compurterSelection = getComputerChoice();

        const roundResult = playRound(humanSelection, compurterSelection);

        // Manipulate score according to result of round
        if (roundResult === WIN){
            humanScore++;
        } else if (roundResult === LOSE){
            computerScore++;
        }
    }

    // Total score and game's result
    let gameResult = 
        `Your score: ${humanScore}\nComputer's score: ${computerScore}`;

    if (humanScore > computerScore){
        gameResult = `${gameResult}\n${WIN}`;
    } else if (humanScore < computerScore){
        gameResult = `${gameResult}\n${LOSE}`;
    } else {
        gameResult = `${gameResult}\n${DRAW}`;
    }

    console.log(gameResult);
}

// Play 5 rounds
playGame(5);








