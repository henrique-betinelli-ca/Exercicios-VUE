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

        const timer = wrapper.find('h6');

        expect(timer.text()).toEqual('Timer: 27s');
    });
    it('should emit time-expired when the time run out', () => {
        const wrapper = mountComponent();
        vi.runAllTimers();

        expect(wrapper.emitted('time-expired').length).toEqual(1);
    });
    it('should add 10 seconds and emit time-bonus-used when add time bonus', async () => {
        const wrapper = mountComponent();

        const firstButton = wrapper.findAllComponents({name: 'VBtn'}).at(0);
        expect(firstButton.attributes('disabled')).toBeUndefined();
        await firstButton.trigger('click');

        const timer = wrapper.find('h6');

        expect(firstButton.attributes('disabled')).toBeDefined();
        expect(timer.text()).toEqual('Timer: 40s');
        expect(wrapper.emitted('time-bonus-used').length).toEqual(1);
    });
    it('should emit updated-time when paused', async () => {
        service.timeSpentCalculator.mockReturnValue(25)
        const wrapper = mountComponent();

        await wrapper.setProps({pausedTime: true});

        expect(service.timeSpentCalculator).toHaveBeenCalledTimes(1);
        expect(wrapper.emitted('updated-time').length).toEqual(1);
        expect(wrapper.emitted('updated-time')[0][0]).toEqual(25);
    });
    it('should emit requested-facilitator when the button is clicked', async () => {
        const wrapper = mountComponent();

        const secondButton = wrapper.findAllComponents({name: 'VBtn'}).at(1);
        expect(secondButton.attributes('disabled')).toBeUndefined();
        await secondButton.trigger('click');

        expect(secondButton.attributes('disabled')).toBeDefined();
        expect(wrapper.emitted('requested-facilitator').length).toEqual(1);
    });
});