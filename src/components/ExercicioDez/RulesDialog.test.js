import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import RulesDialog from '@/components/ExercicioDez/RulesDialog.vue';
import * as service from '@/services/ExercicioDez/Service';

vi.mock('@/services/ExercicioDez/Service');

describe('RulesDialog', () => {
    const mountComponent =  propsData =>
        shallowMount(RulesDialog, {
            propsData,
        });
    it('should render the close button', async () => {
        service.getRulesDialog.mockReturnValue({
            TITLE: 'Regras do Jogo da Velha',
            RULES_TEXT: [
                'O Jogo da Velha é jogado por dois jogadores.',
            ]
        });
        service.getButtonLabels.mockReturnValue('Fechar');
        const wrapper = mountComponent();
        const closeButton = wrapper.find('v-btn');
        await closeButton.trigger('click');

        expect(closeButton.text()).toEqual('Fechar');
        expect(wrapper.emitted('rules-closed').length).toEqual(1);
    });
    it('should render the rules', () => {
        const rulesDialog = {
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
        };
        service.getRulesDialog.mockReturnValue(rulesDialog);
        service.getButtonLabels.mockReturnValue('Fechar');
        const wrapper = mountComponent();
        const rulesTitle = wrapper.find('h2');
        const rulesText = wrapper.findAll('li');

        expect(rulesTitle.text()).toEqual(rulesDialog.TITLE);
        expect(rulesText.length).toEqual(7);
        rulesDialog.RULES_TEXT.forEach((ruleMessage, index) => {
            expect(rulesText[index].text()).toEqual(ruleMessage);
        });
    });
});