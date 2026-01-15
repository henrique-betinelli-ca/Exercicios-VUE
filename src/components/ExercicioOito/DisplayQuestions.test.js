import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import DisplayQuestions from './DisplayQuestions.vue';

describe('DisplayQuestions', () => {
    const mountComponent = propsData =>
        shallowMount(DisplayQuestions, {
            props: propsData,
        });
    it('should start with isViewResults false', () => {
        const wrapper = mountComponent();

        expect(wrapper.vm.isViewResults).toEqual(false);
    });
    it('should emit event and show results when clicking the button', async () => {
        const wrapper = mountComponent();
        wrapper.vm.viewResults();

        expect(wrapper.vm.isViewResults).toEqual(true);
        expect(wrapper.emitted('questions-for-display-requested')).toBeTruthy();
    });
});