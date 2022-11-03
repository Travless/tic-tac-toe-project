let gameArray = ['', '', '', '', '', '', '', '', ''];
gameArray.length = 9;
let playerOne = '';
let compPlayer = '';

const genBoard = (() => {

    const gameFlow = () => {
        // Generates if player will be X or O for their player pawn (will improve logic)
        let playerPawn = prompt('X or O?');
        playerOne = playerPawn.toUpperCase();
        
        if (playerOne === 'X') {
            compPlayer = 'O';
        } else if (playerOne === 'O') {
            compPlayer = 'X';
        }
        return { playerOne, compPlayer };
    };

    gameFlow();

    const gameBoard = document.getElementById('gameboard-grid-container');
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
})();

console.log(gameArray);

let playerOneMove = () => {
    document.addEventListener('click', function(event){
        let moveLocation = event.target.getAttribute('space-number');
        // console.log(moveLocation);
        while (gameArray[moveLocation] = playerOne){
            alert('same spot, choose again');
        }
        gameArray[moveLocation] = playerOne;
        let randomIndex = Math.floor(Math.random() * 9);
        while (randomIndex === moveLocation){
            randomIndex = Math.floor(Math.random() * 9);
        }
        gameArray[randomIndex] = compPlayer;
        console.log(randomIndex);
        console.log(gameArray);
    });
};

// let compMove = () => {
//     document.addEventListener('click', function(event){
//         let randomIndex = Math.floor(Math.random() * 9);
//         gameArray[randomIndex] = compPlayer;
//         if (gameArray[randomIndex] === playerOne){
//             gameArray[randomIndex] = playerOne;
//         } else {
//             gameArray[randomIndex] = compPlayer;
//         }
//     })
// }

playerOneMove();
// compMove();


// const gameBoard = (() => {
//     let gameArray = ['', '', '', '', '', '', '', '', ''];
//     return { gameArray };
// })();

// const player = (pawn) => {
//     const getPawn = () => pawn;
//     return { getPawn };
// };

// const gameFlow = (() => {
//     // Generates if player will be X or O for their player pawn (will improve logic)
//     let playerPawn = prompt('X or O?');
//     const playerOne = player(playerPawn.toUpperCase());

//     if (playerPawn === 'X') {
//         let compPawn = 'O';
//         return compPawn;
//     } else if (playerPawn === 'O') {
//         let compPawn = 'X';
//         return compPawn;
//     }
// }();

// const genBoard = (() => {
//     let gameArray = ['', '', '', '', '', '', '', '', ''];
//     const gameBoard = document.getElementById('gameboard-grid-container');
//     for(let i = 0; i < 3; i++){
//         let gameSpaceCol = document.createElement('div');
//         gameSpaceCol.classList.add('space-col');
//         gameBoard.append(gameSpaceCol);
//         for (let j = 0; j < 3; j++){
//             let gameSpace = document.createElement('div');
//             gameSpace.classList.add('space');
//             gameSpaceCol.append(gameSpace)
//         }
//     }
//     return { gameArray };
// })();