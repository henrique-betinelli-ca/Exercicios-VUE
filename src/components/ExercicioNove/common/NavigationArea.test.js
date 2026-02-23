import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import NavigationArea from '@/components/ExercicioNove/common/NavigationArea.vue';
import RouteButton from '@/components/ExercicioNove/common/RouteButton.vue';
import ModeSelector from '@/components/ExercicioNove/common/ModeSelector.vue';
import * as service from '@/services/ExercicioNove/Service.js';

vi.mock("@/services/ExercicioNove/Service.js");

describe('NavigationArea', () => {
    const mountComponent =  propsData =>
        shallowMount(NavigationArea, {
            propsData,
        });
    it('should render routeButton with correct props', () => {
        service.getRoutes.mockReturnValue({
            HOME_ROUTE: {
                LABEL: "Voltar ao Início", TO: "/ExercicioNove"
            }
        });
        const wrapper = mountComponent();
        const routeButton = wrapper.findComponent(RouteButton);

        expect(routeButton.props()).toEqual({ label: "Voltar ao Início", to: "/ExercicioNove" });
    });
    it('should render ModeSelector component', () => {
        const wrapper = mountComponent();
        const modeSelector = wrapper.findComponent(ModeSelector);

        expect(modeSelector.exists()).toEqual(true);
    });
});