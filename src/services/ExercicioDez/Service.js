import { GAME_OVER_TITLE, RULES_DIALOG, BUTTON_LABELS, WELCOME_MESSAGE } from "./Constants.js"

export function getGameOverTitle() {
    return GAME_OVER_TITLE;
}
export function getRulesDialog() {
    return RULES_DIALOG;
}
export function getButtonLabels(type) {
    return BUTTON_LABELS[type];
}
export function getWelcomeMessage() {
    return WELCOME_MESSAGE;
}
export function createBoard() {
    return Array(9).fill('');
}
export function getNextPlayer(currentPlayer) {
    return currentPlayer === "X" ? "O" : "X";
}
export function checkWinner(board) {
    const combination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for(let combo of combination) {
        const [a, b, c] = combo;
        if(board[a] && board[a] === board[b] && board[a] === board[c]) {
            return `Vencedor: ${board[a]}`;
        }
    }
    if(!board.includes('')) {
        return "Deu Velha!";
    }
    return null;
}