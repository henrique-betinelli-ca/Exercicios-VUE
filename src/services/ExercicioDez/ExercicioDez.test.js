import { describe, it, expect } from 'vitest';
import * as service from './Service.js';

describe('service', () => {
    describe('getGameOverTitle', () => {
        it('should return the gameOverTitle constant', () => {
            expect(service.getGameOverTitle()).toEqual('Fim de Jogo!');
        });
    });
    describe('getRulesDialog', () => {
        it('should return the rulesDialog constant', () => {
            expect(service.getRulesDialog()).toEqual({
                TITLE: 'Regras do Jogo da Velha',
                RULES_TEXT: [
                    'O Jogo da Velha é jogado por dois jogadores.',
                    'O jogo é disputado em um tabuleiro 3x3.',
                    'Um jogador utiliza o símbolo X e o outro utiliza o símbolo O.',
                    'Os jogadores jogam alternadamente, preenchendo uma casa vazia por vez.',
                    'Não é permitido jogar em uma posição que já esteja ocupada.',
                    'Vence o jogador que conseguir alinhar três símbolos iguais na horizontal, vertical ou diagonal.',
                    'Se todas as posições forem preenchidas e ninguém alinhar três símbolos, o jogo termina em empate (Deu velha).'
                ]
            });
        });
    });
    describe('getButtonLabels', () => {
        it('should return the buttonLabels constant', () => {
            expect(service.getButtonLabels('CLOSE')).toEqual('Fechar');
            expect(service.getButtonLabels('PLAY_AGAIN')).toEqual('Jogar Novamente');
            expect(service.getButtonLabels('BACK_TO_HOME')).toEqual('Voltar ao Início');
            expect(service.getButtonLabels('SEE_RULES')).toEqual('Ver regras');
            expect(service.getButtonLabels('START_GAME')).toEqual('Iniciar Jogo');
        });
    });
    describe('getWelcomeMessage', () => {
        it('should return the welcomeMessage constant', () => {
            expect(service.getWelcomeMessage()).toEqual({
                TITLE: 'Jogo da Velha',
                TEXT: 'Neste jogo da velha 3x3, dois jogadores se alternam marcando X e O no tabuleiro. O jogador X sempre começa, e cada jogada deve ser feita em uma casa vazia.'
            });
        });
    });
    describe('getPlayers', () => {
        it('should return the players constant', () => {
            expect(service.getPlayers()).toEqual({
                X: "X",
                O: "O"
            });
        });
    });
    describe('getGameMessages', () => {
        it('should return the gameMessages constant', () => {
            expect(service.getGameMessages()).toEqual({
                WINNER_PREFIX: "Vencedor:",
                DRAW: "Deu Velha!"
            });
        });
    });
    describe('createBoard', () => {
        it('should return an array with nine empty spaces', () => {
            expect(service.createBoard()).toEqual(
                ['', '', '', '', '', '', '', '', '']
            );
        });
    });
    describe('getNextPlayer', () => {
        it('should return X when the currentPlayer is O', () => {
            expect(service.getNextPlayer('O')).toEqual('X');
        });
        it('should return O when the currentPlayer is X', () => {
            expect(service.getNextPlayer('X')).toEqual('O');
        });
    });
    describe('checkWinner', () => {
        it('should return X as the winner when positions 3, 4, and 5 are filled with X', () => {
            const gameBoard = ['O', '', 'O', 'X', 'X', 'X', 'O', 'O', 'X']
            expect(service.checkWinner(gameBoard)).toEqual('Vencedor: X');
        });
        it('should return O as the winner when positions 2, 4, and 6 are filled with O', () => {
            const gameBoard = ['', 'X', 'O', 'X', 'O', '', 'O', '', 'X']
            expect(service.checkWinner(gameBoard)).toEqual('Vencedor: O');
        });
        it('should return a draw when none of the positions are filled with the same player', () => {
            const gameBoard = ['X', 'O', 'X', 'O', 'O', 'X', 'X', 'X', 'O']
            expect(service.checkWinner(gameBoard)).toEqual('Deu Velha!');
        });
    });
});