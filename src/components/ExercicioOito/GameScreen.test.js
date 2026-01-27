import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import GameScreen from './GameScreen.vue';
import QuestionCards from './QuestionCards.vue';
import * as service from '@/services/ExercicioOito/Service.js';

vi.mock("@/services/ExercicioOito/Service.js");

describe('GameScreen', () => {
    const mountComponent =  propsData =>
        shallowMount(GameScreen, {
            propsData,
        });
    it('should show a loading state while the questions are not yet available', async () => {
        service.getQuestions.mockResolvedValue([]);

        const wrapper = mountComponent();
        const p = wrapper.find('p')

        expect(p.text()).toEqual('loading...');
    });
    it('should send the first question to QuestionCards', async () => {
        const questions = [
            { question: 'Pergunta 1' },
            { question: 'Pergunta 2' }
        ];

        service.getQuestions.mockResolvedValue(questions);

        const wrapper = mountComponent();
        await wrapper.vm.$nextTick();

        const questionCards = wrapper.findComponent(QuestionCards);

        expect(questionCards.props('currentQuestion')).toEqual(questions[0]);
    });
    it('should go to the next question when question-answered is emitted', async () => {
        const questions = [
            { question: 'Pergunta 1' },
            { question: 'Pergunta 2' }
        ];

        service.getQuestions.mockResolvedValue(questions);

        const wrapper = mountComponent();
        await wrapper.vm.$nextTick();

        const questionCards = wrapper.findComponent(QuestionCards);

        questionCards.vm.$emit('question-answered');
        await wrapper.vm.$nextTick();

        expect(questionCards.props('currentQuestion')).toEqual(questions[1]);
    });
});