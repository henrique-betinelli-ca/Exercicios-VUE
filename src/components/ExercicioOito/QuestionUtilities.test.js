import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import QuestionUtilities from './QuestionUtilities.vue';
import * as service from '@/services/ExercicioOito/Service.js';

vi.useFakeTimers();
vi.mock("@/services/ExercicioOito/Service.js");

describe('QuestionUtilities', () => {
    const mountComponent = propsData =>
        shallowMount(QuestionUtilities, {
            props: propsData,
            global: {
                stubs: {
                    VBtn: {
                        name: 'VBtn',
                        emits: ['click'],
                        template: `<button :disabled="disabled" @click="$emit('click')"><slot /></button>`
                    }
                }
            }
        });
    it('should decrease the time every second', async () => {
        const wrapper = mountComponent();
        vi.advanceTimersByTime(3000);
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.timeLeft).toEqual(27);
    });
    it('hould emit time-expired when the time run out', async () => {
        const wrapper = mountComponent();
        vi.runAllTimers();

        expect(wrapper.emitted('time-expired')).toBeTruthy();
    });
    it('should add 10 seconds and emit time-bonus-used', async () => {
        const wrapper = mountComponent();
        const firstButton = wrapper.findAllComponents({name: 'VBtn'}).at(0);
        await firstButton.trigger('click');

        expect(wrapper.vm.timeLeft).toEqual(40);
        expect(wrapper.vm.timeBonusUsed).toEqual(true);
        expect(wrapper.emitted('time-bonus-used')).toBeTruthy();
    });
    it('should emit updated-time when paused', async () => {
        service.timeSpentCalculator.mockReturnValue(25)
        const wrapper = mountComponent();
        await wrapper.setProps({pausedTime: true});

        expect(service.timeSpentCalculator).toHaveBeenCalled();
        expect(wrapper.emitted('updated-time')).toBeTruthy();
        expect(wrapper.emitted('updated-time')[0][0]).toEqual(25);
    });
    it('should emit requested-facilitator when the button is clicked', async () => {
        const wrapper = mountComponent();
        const secondButton = wrapper.findAllComponents({name: 'VBtn'}).at(1);
        await secondButton.trigger('click');

        expect(wrapper.vm.helpUsed).toEqual(true);
        expect(wrapper.emitted('requested-facilitator')).toBeTruthy();
    });
});