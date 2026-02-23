import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import ModeSelector from '@/components/ExercicioNove/common/ModeSelector.vue';
import RouteButton from '@/components/ExercicioNove/common/RouteButton.vue';
import * as service from '@/services/ExercicioNove/Service.js';

vi.mock("@/services/ExercicioNove/Service.js");

describe('ModeSelector', () => {
    const mountComponent =  propsData =>
        shallowMount(ModeSelector, {
            propsData,
        });
    it('should render the tree route buttons', () => {
        service.getRoutes.mockReturnValue({
            SEARCH_ROUTES: [
                { LABEL: "Buscar País", TO: "/ExercicioNove/BuscarPaises" },
                { LABEL: "Buscar Região", TO: "/ExercicioNove/BuscarRegiao" },
                { LABEL: "Comparar Países", TO: "/ExercicioNove/CompararPaises" }
            ]
        });
        const wrapper = mountComponent();
        const routeButtons = wrapper.findAllComponents(RouteButton);

        expect(routeButtons.length).toEqual(3);
    });
    it('should render routeButton with correct props', () => {
        service.getRoutes.mockReturnValue({
            SEARCH_ROUTES: [
                { LABEL: "Buscar País", TO: "/ExercicioNove/BuscarPaises" },
            ]
        });
        const wrapper = mountComponent();
        const routeButton = wrapper.findAllComponents(RouteButton);

        expect(routeButton[0].props()).toEqual({ label: "Buscar País", to: "/ExercicioNove/BuscarPaises" });
    });
});