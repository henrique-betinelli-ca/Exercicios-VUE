import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import GameOverDialog from '@/components/ExercicioDez/GameOverDialog.vue';
import * as service from '@/services/ExercicioDez/Service';

vi.mock('@/services/ExercicioDez/Service');

describe('GameOverDialog', () => {
    const mountComponent =  propsData =>
        shallowMount(GameOverDialog, {
            propsData,
        });
    it('should render the game over message', () => {
        service.getGameOverTitle.mockReturnValue('Fim de Jogo!');
        const wrapper = mountComponent({
            isGameOver: true,
            winner: 'Vencedor: X'
        });
        const titleMessage = wrapper.find('h2');
        const winnerMessage = wrapper.find('h3');

        expect(titleMessage.text()).toEqual('Fim de Jogo!');
        expect(winnerMessage.text()).toEqual('Vencedor: X');
    });
    it('should render the play again button', async () => {
        service.getButtonLabels.mockReturnValue('Jogar Novamente');
        const wrapper = mountComponent({
            isGameOver: true,
        });
        const playAgainButton = wrapper.findAll('v-btn').at(0);
        await playAgainButton.trigger('click');

        expect(playAgainButton.text()).toEqual('Jogar Novamente');
        expect(wrapper.emitted('restart-requested').length).toEqual(1);
    });
    it('should render the back to home button', () => {
        service.getButtonLabels.mockReturnValue('Voltar ao Início');
        const wrapper = mountComponent();
        const backToHomeButton = wrapper.findAll('v-btn').at(1);

        expect(backToHomeButton.text()).toEqual('Voltar ao Início');
        expect(backToHomeButton.attributes('to')).toEqual('/ExercicioDez');
    });
});