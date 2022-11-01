const gameBoard = (() => {
    let gameArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return { gameArray };
})();

const player = (name, pawn) => {
    const getName = () => name;
    const getPawn = () => pawn;
    return { getName, getPawn };
};

const gameFlow = (() => {
    const player = (name, pawn) => {
        const getName = () => name;
        const getPawn = () => pawn;
        return { getName, getPawn };
    };
};
