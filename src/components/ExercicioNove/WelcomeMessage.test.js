import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import WelcomeMessage from '@/components/ExercicioNove/WelcomeMessage.vue';

describe('WelcomeMessage', () => {
    const mountComponent =  propsData =>
        shallowMount(WelcomeMessage, {
            propsData,
        });
    it('should render all messages', () => {
        const wrapper = mountComponent();
        const title = wrapper.find('h1');
        const [firstMessage, secondMessage] = wrapper.findAll('p')

        expect(title.text()).toEqual('Bem-vindo ao Countries Explorer');
        expect(firstMessage.text()).toEqual('Explore países, regiões e descubra curiosidades do mundo.');
        expect(secondMessage.text()).toEqual('Escolha uma opção abaixo e comece a explorar!');
    });
});