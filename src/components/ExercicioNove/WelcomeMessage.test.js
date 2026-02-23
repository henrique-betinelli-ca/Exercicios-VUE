import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import WelcomeMessage from '@/components/ExercicioNove/WelcomeMessage.vue';
import * as service from '@/services/ExercicioNove/Service';

vi.mock('@/services/ExercicioNove/Service');

describe('WelcomeMessage', () => {
    const mountComponent =  propsData =>
        shallowMount(WelcomeMessage, {
            propsData,
        });
    it('should render all messages', () => {
        const welcomeMessage = {
            TITLE: 'Bem-vindo ao Countries Explorer',
            FIRST_MESSAGE: 'Explore países, regiões e descubra curiosidades do mundo.',
            SECOND_MESSAGE: 'Escolha uma opção abaixo e comece a explorar!'
        };
        service.getWelcomeMessage.mockReturnValue(welcomeMessage)
        const wrapper = mountComponent();
        const title = wrapper.find('h1');
        const [firstMessage, secondMessage] = wrapper.findAll('p')

        expect(title.text()).toEqual(welcomeMessage.TITLE);
        expect(firstMessage.text()).toEqual(welcomeMessage.FIRST_MESSAGE);
        expect(secondMessage.text()).toEqual(welcomeMessage.SECOND_MESSAGE);
    });
});