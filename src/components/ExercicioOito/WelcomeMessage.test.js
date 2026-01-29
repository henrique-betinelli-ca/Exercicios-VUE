import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import WelcomeMessage from './WelcomeMessage.vue';

describe('WelcomeMessage', () => {
    const mountComponent =  propsData =>
        shallowMount(WelcomeMessage, {
            propsData,
        });
    it('should render all messages', () => {
        const wrapper = mountComponent();
        const name = wrapper.find('h1');
        const welcomeMessage = wrapper.find('h3');
        const description = wrapper.find('p');

        expect(name.text()).toEqual('Mind Smash');
        expect(welcomeMessage.text()).toEqual('Welcome to the Random Questions Quiz!');
        expect(description.text()).toEqual('Choose your preferences, test your knowledge, and aim for the highest score possible. Each round is unique, with questions generated directly from the Open Trivia DB. Configure your game and enjoy the challenge!');
    });
});