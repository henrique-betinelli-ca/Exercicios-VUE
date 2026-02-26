import { describe, it, expect, } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import GameScreem from '@/components/ExercicioDez/GameScreem.vue';

describe('GameScreem', () => {
    const mountComponent =  propsData =>
        shallowMount(GameScreem, {
            propsData,
        });
    it('should render the game board and display the current player', () => {
        const wrapper = mountComponent({
            board: Array(9).fill(''),
            currentPlayer: 'X'
        });
        const buttons = wrapper.findAll('v-btn');
        const currentPlayer = wrapper.find('h2');

        expect(buttons.length).toEqual(9);
        expect(currentPlayer.text()).toEqual('Vez de: X');
    });
    it('should emit played with the index when clicking', async () => {
        const wrapper = mountComponent({
            board: Array(9).fill(''),
            currentPlayer: 'X'
        });
        const buttons = wrapper.findAll('v-btn');
        await buttons[3].trigger('click');

        expect(wrapper.emitted('played').length).toEqual(1);
        expect(wrapper.emitted('played')[0]).toEqual([3]);
    });
});