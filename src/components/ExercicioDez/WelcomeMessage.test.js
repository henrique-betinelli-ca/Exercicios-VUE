import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import WelcomeMessage from '@/components/ExercicioDez/WelcomeMessage.vue';
import * as service from '@/services/ExercicioDez/Service';

vi.mock('@/services/ExercicioDez/Service');

describe('WelcomeMessage', () => {
    const mountComponent =  propsData =>
        shallowMount(WelcomeMessage, {
            propsData,
        });
    it('should render all messages', () => {
        const welcomeMessage = {
            TITLE: "Jogo da Velha",
            TEXT: "Neste jogo da velha 3x3, dois jogadores se alternam marcando X e O no tabuleiro. O jogador X sempre começa, e cada jogada deve ser feita em uma casa vazia."
        };
        service.getWelcomeMessage.mockReturnValue(welcomeMessage)
        const wrapper = mountComponent();
        const title = wrapper.find('h1');
        const text = wrapper.find('p');

        expect(title.text()).toEqual(welcomeMessage.TITLE);
        expect(text.text()).toEqual(welcomeMessage.TEXT);
    });
});