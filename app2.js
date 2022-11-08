let endGame = false;
let playerScore = 0;
let compScore = 0;
let gameArray = ['', '', '', '', '', '', '', '', ''];
gameArray.length = 9;
const gameBoard = document.getElementById('gameboard-grid-container');
let gameCol1 = document.createElement('div');
let gameCol2 = document.createElement('div');
let gameCol3 = document.createElement('div');
let space = document.createElement('div');

function replay (){
    gameArray = ['', '', '', '', '', '', '', '', ''];
    spaces.textContent = '';
}

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

//generates gameboard at beginning of the game, after the player chooses their pawn
const genGameboard = () => {
    gameCol1.classList.add('space-container');
    gameBoard.append(gameCol1);
    gameCol2.classList.add('space-container');
    gameBoard.append(gameCol2);
    gameCol3.classList.add('space-container');
    gameBoard.append(gameCol3);

    for(let i = 0; i < 3; i++){
        space.classList.add('space');
        gameCol1.append(space);
        space.setAttribute('space-number', i);
    }
    for(let i = 3; i < 6; i++){
        space.classList.add('space');
        gameCol2.append(space);
        space.setAttribute('space-number', i);
    }
    for(let i = 6; i < 9; i++){
        space.classList.add('space');
        gameCol3.append(space);
        space.setAttribute('space-number', i);
    }
};

let gameMoves = () => {
    space.addEventListener('click', function(event){
        let moveLocation = event.target.getAttribute('space-number');
        if(gameArray[moveLocation] === 'X' || gameArray[moveLocation] === 'O'){
            alert('spot taken, pick again');
            return;
        } else {
            gameArray[moveLocation] = playerOne;
            let playerSymbolDisplay = event.target;
            playerSymbolDisplay.textContent = playerOne;
        };

        let randomIndex = Math.floor(Math.random() * 9);
        while(gameArray[randomIndex] === 'X' || gameArray[randomIndex] === 'O'){
            if(gameArray.includes('')){
                randomIndex = Math.floor(Math.random() * 9);
            } else {
                return;
            }
        };
        gameArray[randomIndex] = compPlayer;
        let compSymbolDisplay = document.querySelector(`[space-number="${randomIndex}"]`);
        compSymbolDisplay.textContent = compPlayer;

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
                endgame = true;
                playerScore += 1;
                const refresh = document.createElement('button');
                pageContainer.append(refresh);
                refresh.textContent = 'Replay'
                refresh.addEventListener('click', function(event){
                    replay();
                })
                return playerScore;
            } else if(winScenarios[i].every(isCompPawn)){
                alert(`Game Over! ${compPlayer} wins!`);
                endGame = true;
                compScore += 1;
                const refresh = document.createElement('button');
                pageContainer.append(refresh);
                refresh.textContent = 'Replay';
                refresh.addEventListener('click', function(event){
                    replay();
                return compScore;    
                });
            }
        };
    })
};

const gameGen = (() => {
    userPawns();
    genGameboard();
    gameMoves();
})();

const start = document.getElementById('start-btn');
start.addEventListener('click', function(event){
    genGame();
});