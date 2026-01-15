import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import HomeScreen from './HomeScreen.vue';

describe('HomeScreen', () => {
    const mountComponent = propsData =>
        shallowMount(HomeScreen, {
            propsData,
        });
    it('should emit quiz-control-past when get the filters', () => {
        const wrapper = mountComponent();
        wrapper.vm.ReceiveControlFilters([{amount: 5}]);

        expect(wrapper.emitted('quiz-control-past')).toBeTruthy();
        expect(wrapper.emitted('quiz-control-past')[0][0]).toEqual([{amount: 5}]);
    });
});