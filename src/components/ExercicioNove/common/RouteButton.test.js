import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import RouteButton from '@/components/ExercicioNove/common/RouteButton.vue';

describe('RouteButton', () => {
    const mountComponent =  propsData =>
        shallowMount(RouteButton, {
            propsData,
        });
    it('should render route button', () => {
        const wrapper = mountComponent({ LABEL: "Voltar ao Início", TO: "/ExercicioNove" });
        const button = wrapper.find('v-btn');

        expect(button.attributes('label')).toEqual('Voltar ao Início');
        expect(button.attributes('to')).toEqual('/ExercicioNove');
    });
});