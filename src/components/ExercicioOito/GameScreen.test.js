import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import GameScreen from './GameScreen.vue';
import * as service from '@/services/ExercicioOito/Service.js';

vi.mock("@/services/ExercicioOito/Service.js");

describe('GameScreen', () => {
    const mountComponent =  propsData =>
        shallowMount(GameScreen, {
            propsData,
        });
    it('should load questions from API', async () => {
        const fakeQuestion = [
            {question: 'question 1'},
            {question: 'question 2'},
        ];
        service.getQuestions.mockResolvedValue(fakeQuestion);
        const wrapper = mountComponent({
            questionFilters: {amount: 5}
        });
        await Promise.resolve();

        expect(service.getQuestions).toHaveBeenCalledWith({amount: 5});
        expect(wrapper.vm.questions).toEqual(fakeQuestion);
    });
    it('should emit questions-fetch-failed when questions fetch error', async () => {
        service.getQuestions.mockRejectedValue('error');
        const wrapper = mountComponent({
            questionFilters: {amount: 5},
        });
        await Promise.resolve();

        expect(wrapper.emitted('questions-fetch-failed')).toBeTruthy();
    });
    it('should reset index and answers when isPlayAgain is true', async () => {
        const wrapper = mountComponent({
            questionFilters: {amount: 5},
            isPlayAgain: false
        });
        wrapper.vm.answers = ['a', 'b'];
        wrapper.vm.questionIndex = 2;
        await wrapper.setProps({isPlayAgain: true});

        expect(wrapper.vm.answers).toEqual([]);
        expect(wrapper.vm.questionIndex).toEqual(0);
    });
    it('should emit game-ended when last question is answered', async () => {
        const fakeQuestion = [
            {question: 'question 1'},
            {question: 'question 2'},
        ];
        service.getQuestions.mockResolvedValue(fakeQuestion);
        const wrapper = mountComponent({
            questionFilters: {amount: 5},
        });
        wrapper.vm.questionController('a');
        wrapper.vm.questionController('b');

        expect(wrapper.emitted('game-ended')).toBeTruthy();
    });
});