import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import WelcomeActions from '@/components/ExercicioDez/WelcomeActions.vue';
import * as service from '@/services/ExercicioDez/Service';

vi.mock('@/services/ExercicioDez/Service');

describe('WelcomeActions', () => {
    const mountComponent =  propsData =>
        shallowMount(WelcomeActions, {
            propsData,
        });
    it('should render the view rules button', async () => {
        service.getButtonLabels.mockReturnValue('Ver regras');
        const wrapper = mountComponent();
        const seeRulesButton = wrapper.findAll('v-btn').at(0);
        await seeRulesButton.trigger('click');

        expect(seeRulesButton.text()).toEqual('Ver regras');
        expect(wrapper.emitted('show-rules').length).toEqual(1);
    });
    it('should render the start game button', () => {
        service.getButtonLabels.mockReturnValue('Iniciar Jogo');
        const wrapper = mountComponent();
        const startGameButton = wrapper.findAll('v-btn').at(1);

        expect(startGameButton.text()).toEqual('Iniciar Jogo');
        expect(startGameButton.attributes('to')).toEqual('/ExercicioDez/Jogo');
    });
});