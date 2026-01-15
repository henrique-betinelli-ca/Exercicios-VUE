import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import FinalSteps from './FinalSteps.vue';

describe('FinalSteps', () => {
    const mountComponent = propsData =>
        shallowMount(FinalSteps, {
            propsData,
            global: {
                stubs: {
                    'v-btn': true
                }
            }
        });
    it('should emit play-again-requested when clicking the button', async () => {
        const wrapper = mountComponent();
        const firstButton = wrapper.findAllComponents({name: 'VBtn'}).at(0);
        await firstButton.trigger('click');

        expect(wrapper.emitted('play-again-requested')).toBeTruthy();
    });
    it('should emit back-home-requested when clicking the button', async () => {
        const wrapper = mountComponent();
        const secondButton = wrapper.findAllComponents({name: 'VBtn'}).at(1);
        await secondButton.trigger('click');

        expect(wrapper.emitted('back-home-requested')).toBeTruthy();
    });
});