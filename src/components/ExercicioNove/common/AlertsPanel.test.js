import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import AlertsPanel from '@/components/ExercicioNove/common/AlertsPanel.vue';
import * as service from '@/services/ExercicioNove/Service.js';

vi.mock("@/services/ExercicioNove/Service.js");

describe('AlertsPanel', () => {
    const mountComponent =  propsData =>
        shallowMount(AlertsPanel, {
            propsData,
        });
    it('should render alert when alertType is provided', async () => {
        service.getAlertMessageByType.mockReturnValue({
            TITLE: "Falha ao buscar países.",
            MESSAGE: "Por favor, tente novamente mais tarde.",
            TYPE: "error"
        });
        const wrapper = mountComponent();
        await wrapper.setProps({ alertType: 'COUNTRIES_NAMES_NOT_FOUND' });
        const alert = wrapper.find('v-alert');

        expect(alert.attributes('title')).toEqual('Falha ao buscar países.');
        expect(alert.attributes('text')).toEqual('Por favor, tente novamente mais tarde.');
        expect(alert.attributes('type')).toEqual('error');
    });
    it('should hide alert when alertType becomes null', async () => {
        service.getAlertMessageByType.mockReturnValue({
            TITLE: "País não encontrado.",
            MESSAGE: "Não foi possível encontrar um país com o nome informado. Por favor, tente novamente.",
            TYPE: "error"
        });
        const wrapper = mountComponent();
        await wrapper.setProps({ alertType: 'COUNTRY_NOT_FOUND' });
        const alert = wrapper.find('v-alert');

        expect(alert.attributes('style')).not.toContain('display: none');
        await wrapper.setProps({ alertType: null });
        expect(alert.attributes('style')).toContain('display: none');
    });
    it('should hide alert after 10 seconds', async () => {
        vi.useFakeTimers();
        service.getAlertMessageByType.mockReturnValue({
            TITLE: "País não encontrado.",
            MESSAGE: "Não foi possível encontrar um país com o nome informado. Por favor, tente novamente.",
            TYPE: "error"
        });
        const wrapper = mountComponent();
        await wrapper.setProps({ alertType: 'COUNTRY_NOT_FOUND' });
        const alert = wrapper.find('v-alert');

        expect(alert.attributes('style')).not.toContain('display: none');
        vi.advanceTimersByTime(10000);
        await wrapper.vm.$nextTick();

        expect(alert.attributes('style')).toContain('display: none');
        vi.useRealTimers();
    });
    it('should emit alert-closed when close event is triggered', async () => {
        const wrapper = mountComponent();
        await wrapper.setProps({ alertType: 'COUNTRY_NOT_FOUND' });
        const alert = wrapper.find('v-alert');
        await alert.trigger('click:close');

        expect(wrapper.emitted('alert-closed').length).toEqual(1);
    });
});