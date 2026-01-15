import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import QuestionResult from './QuestionResult.vue';
import * as service from '@/services/ExercicioOito/Service.js';

vi.mock("@/services/ExercicioOito/Service.js");

describe('QuestionResult', () => {
    const mountComponent = propsData =>
        shallowMount(QuestionResult, {
            propsData,
        });
    it('should update the card when answersResult is received', async () => {
        service.buildResultCard.mockReturnValue({
            ICON: 'icon-test',
            TITLE: 'title-test',
            MESSAGE: 'message-test'
        });
        const wrapper = mountComponent({answersResult: null});
        await wrapper.setProps({answersResult: {
            isTimeUp: false,
            isCorrectAnswer: true
        }});

        expect(service.buildResultCard).toHaveBeenCalledWith(false, true);
        expect(wrapper.vm.displayResult).toEqual(true);
    });
    it('should emit displayed-result and set displayResult to false when closeResult is called', async () => {
        const wrapper = mountComponent();
        wrapper.vm.closeResult();

        expect(wrapper.emitted('displayed-result')).toBeTruthy();
        expect(wrapper.vm.displayResult).toEqual(false);
    });
    it('should fill cardResults with the parameters passed to loadCard', () => {
        const wrapper = mountComponent({answersResult: {
            score: 10,
            isTimeUp: false,
            isCorrectAnswer: true
        }});
        wrapper.vm.loadCard({
            ICON: 'icon-test',
            TITLE: 'title-test',
            MESSAGE: 'message-test'
        });

        expect(wrapper.vm.cardResults).toEqual({
            icon: 'icon-test',
            title: 'title-test',
            message: 'message-test',
            score: 10
        });
    });
    it('should update displayResult', () => {
        const wrapper = mountComponent();
        wrapper.vm.setDisplayResult(true);

        expect(wrapper.vm.displayResult).toEqual(true);
    });
});