import { GAME_OVER_TITLE, RULES_DIALOG, BUTTON_LABELS, WELCOME_MESSAGE, PLAYERS, GAME_MESSAGES } from "./Constants.js"

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
export function getPlayers() {
    return PLAYERS;
}
export function getGameMessages() {
    return GAME_MESSAGES;
}
export function createBoard() {
    return Array(9).fill('');
}
export function getNextPlayer(currentPlayer) {
    return currentPlayer === getPlayers().X ? getPlayers().O : getPlayers().X;
}
export function checkWinner(board) {
    const size = 3;
    for(let i = 0; i < 9; i += size) {
        if(board[i] && board[i] == board[i + 1] && board[i] == board[i + 2]) {
            return `${getGameMessages().WINNER_PREFIX} ${board[i]}`;
        }
    }
    for(let i = 0; i < size; i++) {
        if(board[i] && board[i] == board[i + 3] && board[i] == board[i + 6]) {
            return `${getGameMessages().WINNER_PREFIX} ${board[i]}`;
        }
    }
    if(board[4] && ((board[0] == board[4] && board[4] == board[8]) || (board[2] == board[4] && board[4] == board[6]))) {
        return `${getGameMessages().WINNER_PREFIX} ${board[4]}`;
    }
    if(!board.includes('')) return getGameMessages().DRAW;
    return null;
}