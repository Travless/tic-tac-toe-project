//global variable that are used throughout the modules and factories
let endGame = false;
let playerOne = '';
let compPlayer = '';
let playerScore = 0;
let compScore = 0;
let gameArray = ['', '', '', '', '', '', '', '', ''];
gameArray.length = 9;
const pageContainer = document.getElementById('page-container');
const resetBtn = document.getElementById('reset-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const start = document.getElementById('start-btn');


//generates game via a module
const genGame = (() => {
    const gameBoard = document.getElementById('gameboard-grid-container');
    const pageContainer = document.getElementById('page-container');

    // Generates if player will be X or O for their player pawn (will improve logic)
    const userPawns = () => {
        let playerPawn = prompt('X or O?');
        playerOne = playerPawn.toUpperCase();
        
        if (playerOne === 'X') {
            compPlayer = 'O';
        } else if (playerOne === 'O') {
            compPlayer = 'X';
        }
        return { playerOne, compPlayer };
    };

    userPawns();

    //generates gameboard at beginning of the game, after the player chooses their pawn
    const genGameboard = (() => {
        let gameCol1 = document.createElement('div');
        gameCol1.classList.add('space-container');
        gameBoard.append(gameCol1);
        let gameCol2 = document.createElement('div');
        gameCol2.classList.add('space-container');
        gameBoard.append(gameCol2);
        let gameCol3 = document.createElement('div');
        gameCol3.classList.add('space-container');
        gameBoard.append(gameCol3);

        for(let i = 0; i < 3; i++){
            let space = document.createElement('div');
            space.classList.add('space');
            gameCol1.append(space);
            space.setAttribute('space-number', i);
        }
        for(let i = 3; i < 6; i++){
            let space = document.createElement('div');
            space.classList.add('space');
            gameCol2.append(space);
            space.setAttribute('space-number', i);
        }
        for(let i = 6; i < 9; i++){
            let space = document.createElement('div');
            space.classList.add('space');
            gameCol3.append(space);
            space.setAttribute('space-number', i);
        }

        return gameBoard;
    });

    genGameboard();


    //executes a single move for both the human player and the AI when the player clicks on one of the game spaces
    let gameMoves = (() => {
        gameBoard.addEventListener('click', function(event){

            //function designed to text all Win Scenarios after each move either the play or AI makes
            function winTest(){
                const winScenario1 = [0,1,2].map(x=>gameArray[x]);
                const winScenario2 = [3,4,5].map(x=>gameArray[x]);
                const winScenario3 = [6,7,8].map(x=>gameArray[x]);
                const winScenario4 = [0,3,6].map(x=>gameArray[x]);
                const winScenario5 = [1,4,7].map(x=>gameArray[x]);
                const winScenario6 = [2,5,8].map(x=>gameArray[x]);
                const winScenario7 = [0,4,8].map(x=>gameArray[x]);
                const winScenario8 = [2,4,6].map(x=>gameArray[x]);
    
                let winScenarios = [winScenario1, winScenario2, winScenario3, winScenario4, winScenario5, winScenario6, winScenario7, winScenario8];
    
                function isPlayerPawn (item){
                    return item === playerOne;
                }
    
                function isCompPawn (item){
                    return item === compPlayer;
                }

                for (let i = 0; i < winScenarios.length; i++){
                    if(winScenarios[i].every(isPlayerPawn)){
                        alert(`Game Over! ${playerOne} wins!`);
                        endGame = true;
                        playerScore += 1;
                        return playerScore, endGame;
                    } else if(winScenarios[i].every(isCompPawn)){
                        alert(`Game Over! ${compPlayer} wins!`);
                        endGame = true;
                        compScore += 1;
                        return compScore, endGame;
                    }
                };
            };


            let moveLocation = event.target.getAttribute('space-number');
            console.log(moveLocation);
            if(gameArray[moveLocation] === 'X' || gameArray[moveLocation] === 'O' || moveLocation === null || endGame === true){
                return;
            } else {
                gameArray[moveLocation] = playerOne;
                let playerSymbolDisplay = event.target;
                playerSymbolDisplay.textContent = playerOne;
            };

            winTest();

            let randomIndex = Math.floor(Math.random() * 9);
            while(gameArray[randomIndex] === 'X' || gameArray[randomIndex] === 'O'){
                if(gameArray.includes('')){
                    randomIndex = Math.floor(Math.random() * 9);
                } else {
                    return;
                }
            };
            
            if(endGame === false){
                gameArray[randomIndex] = compPlayer;
                let compSymbolDisplay = document.querySelector(`[space-number="${randomIndex}"]`);
                compSymbolDisplay.textContent = compPlayer;
            } else {
                return;
            }

            winTest();
        })
    })();
});

//event listener designated to Start button, which will initial game generation as well as remove the button's DOM element and toggle the Game Reset button's visability
start.addEventListener('click', function(event){
    genGame();
    start.remove();
    toggle(playAgainBtn);
    toggle(resetBtn);
});

//function used to toggle visibility of Reset button and Play Again button
function toggle(element){
    let hidden = element.getAttribute('hidden');

    if(hidden){
        element.removeAttribute('hidden');
    } else {
        element.setAttribute('hidden', 'hidden');
    }
}

//function used to start a new round of the game, while maintaining a the running tally score between the player and the AI
function playAgain (){
    for(let i = 0; i < gameArray.length; i++){
        gameArray.splice(i, 1, '');
        let compSymbolDisplay = document.querySelector(`[space-number="${i}"]`);
        compSymbolDisplay.textContent = '';
        endGame = false;
        console.log(`Player Score: ${playerScore} - Comp Score: ${compScore}`);
    }
}

//function used to completely reset the game and its running tally score between the player and AI
function resetGame(){
    window.location.reload();
}

//event listener that initiates the start of a new round
playAgainBtn.addEventListener('click', function(event){
    playAgain();
})

//event listener that initiates the full reset of the game
resetBtn.addEventListener('click', function(event){
    resetGame();
})
