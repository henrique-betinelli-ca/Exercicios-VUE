import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import QuestionCards from './QuestionCards.vue';
import * as service from '@/services/ExercicioOito/Service.js';

vi.mock("@/services/ExercicioOito/Service.js");

describe('QuestionCards', () => {
    const fakeQuestion = {
        question: 'What number does the Roman numeral XX represent?',
        correct_answer: 20,
        incorrect_answers: [10, 15, 5],
        type: 'multiple'
    };
    const mountComponent = () =>
        shallowMount(QuestionCards, {
            props: {
                currentQuestion: fakeQuestion,
            },
            global: {
                stubs: {
                    VBtn: {
                        name: 'VBtn',
                        template: `<button @click="$emit('click')"><slot /></button>`
                    },
                    VRadioGroup: true,
                    VRadio: true
                }
            }
        });
    it('should process new question when currentQuestion changes', () => {
        service.answerShuffler.mockReturnValue([10, 5, 20, 5]);
        const wrapper = mountComponent();

        expect(wrapper.vm.questionData.question).toEqual(fakeQuestion.question);
        expect(wrapper.vm.questionData.showAnswers.length).toEqual(4);
        expect(wrapper.vm.isBooleanQuestion).toEqual(false);
    });
    it('should skip the question and emit question-answered', async () => {
        service.getQustionData.mockReturnValue({question: '', showAnswers: [] });
        service.getResult.mockReturnValue({isCorrectAnswer: false });
        const wrapper = mountComponent();
        const skipButton = wrapper.findAllComponents({name: 'VBtn' }).at(1);
        await skipButton.trigger('click');

        expect(wrapper.vm.result.isCorrectAnswer).toBe(false);
        expect(wrapper.emitted('question-answered')).toBeTruthy();
    });
    it('should call the sendQuestion function with the filled values', async () => {
        service.calculateResult.mockReturnValue(10);
        service.getResult.mockReturnValue({
            score: 0,
            isCorrectAnswer: false
        });
        const wrapper = mountComponent();
        await wrapper.setData({
            selectedAnswer: 20,
            answeredQuestion: true
        });
        const sendButton = wrapper.findAllComponents({name: 'VBtn'}).at(0);
        await sendButton.trigger('click');

        expect(service.calculateResult).toHaveBeenCalled();
        expect(wrapper.vm.result.score).toEqual(10);
        expect(wrapper.vm.result.isCorrectAnswer).toEqual(true);
    });
    it('should emit question-answered and reset the state when calling questionController', async () => {
        const wrapper = mountComponent();
        wrapper.vm.answersResult = {score: 10};
        wrapper.vm.timerPaused = true;
        wrapper.vm.questionController();

        expect(wrapper.vm.answersResult).toBe(null);
        expect(wrapper.vm.timerPaused).toBe(false);
        expect(wrapper.emitted('question-answered')).toBeTruthy();
    });
    it('should reset the result using getResult', () => {
        service.getResult.mockReturnValue({score: 0});
        const wrapper = mountComponent();
        wrapper.vm.result = {score: 10};
        wrapper.vm.resetResults();

        expect(wrapper.vm.result.score).toEqual(0);
    });
    it('should reset the card', () => {
        service.getQustionData.mockReturnValue({showAnswers: []});
        const wrapper = mountComponent();
        wrapper.vm.selectedAnswer = 5;
        wrapper.vm.answeredQuestion = true;
        wrapper.vm.resetCard();

        expect(wrapper.vm.selectedAnswer).toEqual(null);
        expect(wrapper.vm.answeredQuestion).toEqual(false);
    });
    it('should remove wrong answers and mark help as used', () => {
        service.wrongAnswersRemover.mockReturnValue([20, 5]);
        const wrapper = mountComponent();
        wrapper.vm.questionData.showAnswers = [20, 15, 10, 5];
        wrapper.vm.questionHelper();

        expect(service.wrongAnswersRemover).toHaveBeenCalled();
        expect(wrapper.vm.questionData.showAnswers).toEqual([20, 5]);
        expect(wrapper.vm.result.helpWasUsed).toEqual(true);
    });
    it('should mark time as up and pause the timer', () => {
        const wrapper = mountComponent();
        wrapper.vm.timeExpired();

        expect(wrapper.vm.result.isTimeUp).toEqual(true);
        expect(wrapper.vm.timerPaused).toEqual(true);
        expect(wrapper.vm.answersResult).toBeTruthy();
    });
    it('should update answeredQuestion', () => {
        const wrapper = mountComponent();
        wrapper.vm.setAnsweredQuestion(true);

        expect(wrapper.vm.answeredQuestion).toEqual(true);
    });
    it('should update timerPaused', () => {
        const wrapper = mountComponent();
        wrapper.vm.setTimerPaused(true);

        expect(wrapper.vm.timerPaused).toEqual(true);
    });
});