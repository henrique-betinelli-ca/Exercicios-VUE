import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import GameView from '@/views/ExercicioDez/GameView.vue';
import GameScreem from '@/components/ExercicioDez/GameScreem.vue';
import GameOverDialog from '@/components/ExercicioDez/GameOverDialog.vue';
import * as service from '@/services/ExercicioDez/Service.js';

vi.mock('@/services/ExercicioDez/Service.js');

describe('GameView', () => {
    const mountComponent =  propsData =>
        shallowMount(GameView, {
            propsData,
        });
    it('should render GameScreem and GameOverDialog', () => {
        service.getPlayers.mockReturnValue({ X: "X" });
        const wrapper = mountComponent();
        const gameScreem = wrapper.findComponent(GameScreem);
        const gameOverDialog = wrapper.findComponent(GameOverDialog);

        expect(gameScreem.exists()).toEqual(true);
        expect(gameOverDialog.exists()).toEqual(true);
    });
    it('should not change the board when clicking on an already filled position', () => {
        const fakeBoard = ['', 'X', '', 'O', '', '', 'X', '', ''];
        service.createBoard.mockReturnValue(fakeBoard);
        service.getPlayers.mockReturnValue({ X: "X" });
        const wrapper = mountComponent();
        const gameScreem = wrapper.findComponent(GameScreem);

        expect(gameScreem.props('board')).toEqual(fakeBoard);
        gameScreem.vm.$emit('played', 1);

        expect(gameScreem.props('board')).toEqual(fakeBoard);
    });
    it('should pass board correctly to GameScreen when receiving a new move from played', () => {
        service.createBoard.mockReturnValue(Array(9).fill(''));
        service.getPlayers.mockReturnValue({ X: "X" });
        const wrapper = mountComponent();
        const gameScreem = wrapper.findComponent(GameScreem);

        expect(gameScreem.props('board')).toEqual(['', '', '', '', '', '', '', '', '']);
        gameScreem.vm.$emit('played', 2);

        expect(gameScreem.props('board')).toEqual(['', '', 'X', '', '', '', '', '', '']);
    });
    it('should pass currentPlayer correctly to GameScreen when receiving a new move from played', async () => {
        service.createBoard.mockReturnValue(Array(9).fill(''));
        service.checkWinner.mockReturnValue(null);
        service.getPlayers.mockReturnValue({ X: "X" });
        service.getNextPlayer.mockReturnValue('O');
        const wrapper = mountComponent();
        const gameScreem = wrapper.findComponent(GameScreem);

        expect(gameScreem.props('currentPlayer')).toEqual('X');
        gameScreem.vm.$emit('played', 2);
        await wrapper.vm.$nextTick();

        expect(gameScreem.props('currentPlayer')).toEqual('O');
    });
    it('should pass winner to GameOverDialog when the winner is X', async () => {
        service.createBoard.mockReturnValue(Array(9).fill(''));
        service.getPlayers.mockReturnValue({ X: "X" });
        service.checkWinner.mockReturnValue('Vencedor: X');
        const wrapper = mountComponent();
        const gameScreem = wrapper.findComponent(GameScreem);
        const gameOverDialog = wrapper.findComponent(GameOverDialog);
        gameScreem.vm.$emit('played', 2);
        await wrapper.vm.$nextTick();

        expect(gameOverDialog.props('winner')).toEqual('Vencedor: X');
    });
    it('should pass winner to GameOverDialog when it is a draw', async () => {
        service.createBoard.mockReturnValue(Array(9).fill(''));
        service.getPlayers.mockReturnValue({ X: "X" });
        service.checkWinner.mockReturnValue('Deu Velha!');
        const wrapper = mountComponent();
        const gameScreem = wrapper.findComponent(GameScreem);
        const gameOverDialog = wrapper.findComponent(GameOverDialog);
        gameScreem.vm.$emit('played', 2);
        await wrapper.vm.$nextTick();

        expect(gameOverDialog.props('winner')).toEqual('Deu Velha!');
    });
    it('should reset the game when restart-requested is emitted by GameOverDialog', async () => {
        service.createBoard.mockReturnValueOnce(['', 'X', '', 'O', '', '', 'X', '', '']).mockReturnValueOnce(Array(9).fill(''));
        service.checkWinner.mockReturnValue(null);
        service.getPlayers.mockReturnValue({ X: "X" });
        service.getNextPlayer.mockReturnValue('O');
        const wrapper = mountComponent();
        const gameScreem = wrapper.findComponent(GameScreem);
        const gameOverDialog = wrapper.findComponent(GameOverDialog);

        gameOverDialog.vm.$emit('restart-requested');
        await wrapper.vm.$nextTick();

        expect(gameScreem.props('currentPlayer')).toEqual('X');
        expect(gameOverDialog.props('winner')).toEqual(null);
        expect(gameScreem.props('board')).toEqual(Array(9).fill(''));
    });
});