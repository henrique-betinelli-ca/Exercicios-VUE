import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import LoadingStage from '@/components/ExercicioNove/common/LoadingStage.vue';

describe('LoadingStage', () => {
    const mountComponent =  propsData =>
        shallowMount(LoadingStage, {
            propsData,
        });
    it('should render loading stage', () => {
        const wrapper = mountComponent();
        const loadingMessage = wrapper.find('p');
        const loadingSpinner = wrapper.find('v-progress-circular');

        expect(loadingMessage.text()).toEqual('Carregando...');
        expect(loadingSpinner.exists()).toEqual(true);
    });
});