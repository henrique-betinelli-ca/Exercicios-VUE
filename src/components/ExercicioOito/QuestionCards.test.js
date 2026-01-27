import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import QuestionCards from './QuestionCards.vue';
import QuestionUtilities from './QuestionUtilities.vue';
import QuestionResult from './QuestionResult.vue';
import * as service from '@/services/ExercicioOito/Service.js';

vi.mock("@/services/ExercicioOito/Service.js");

describe('QuestionCards', () => {
    const mountComponent = () =>
        shallowMount(QuestionCards, {
            props: {
                currentQuestion: { 
                    type: 'multiple', 
                    question: 'In Chemistry, how many isomers does Butanol (C4H9OH) have?', 
                    correct_answer: 4, 
                    incorrect_answers: [3, 5, 6] 
                }
            },
            global: {
                stubs: {
                    VBtn: {
                        name: 'VBtn',
                        template: `<button @click="$emit('click')"><slot /></button>`
                    },
                    VRadioGroup: {
                        name: 'VRadioGroup',
                        template: `<div><slot /></div>`
                    },
                    VRadio: {
                        name: 'VRadio',
                        props: ['label', 'value'],
                        template: `<div class="radio">{{ label }}</div>`
                    },
                }
            }
        });
    it('should display the question and the alternatives when they are received', () => {
        service.getQustionData.mockReturnValue({question: '', showAnswers: []});
        service.getResult.mockReturnValue({});
        service.answerShuffler.mockReturnValue([3, 6, 4, 5]);

        const wrapper = mountComponent();

        const question = wrapper.find('p');
        const answers = wrapper.findAllComponents({name: 'VRadio'}).map(a => a.props('label'));

        expect(question.text()).toEqual('In Chemistry, how many isomers does Butanol (C4H9OH) have?');
        expect(answers).toEqual([3, 6, 4, 5]);
    });
    it('should emit answersResult when clicking send after selecting an alternative', async () => {
        service.getQustionData.mockReturnValue({question: '', showAnswers: []});
        service.getResult.mockReturnValue({
            question: '',
            allAnswers: [3, 6, 4, 5],
            helpWasUsed: false,
            usedExtraTime: false,
            isTimeUp: false,
            score: 0,
            timeSpent: 0
        });
        service.answerShuffler.mockReturnValue([3, 6, 4, 5]);

        const wrapper = mountComponent();

        const radioGroup = wrapper.findComponent({name: 'VRadioGroup'});
        await radioGroup.vm.$emit('update:modelValue', 6);

        const sendButton = wrapper.findAllComponents({name: 'VBtn'}).at(0);
        await sendButton.trigger('click');
        await wrapper.vm.$nextTick();

        const questionResult = wrapper.findComponent(QuestionResult);

        expect(questionResult.props('answersResult').answer).toEqual(6); 
        expect(questionResult.props('answersResult').isTimeUp).toEqual(false);
    });
    it('should emit answersResult when clicking skip without selecting an alternative', async () => {
        service.getQustionData.mockReturnValue({question: '', showAnswers: []});
        service.getResult.mockReturnValue({});
        service.answerShuffler.mockReturnValue([3, 6, 4, 5]);

        const wrapper = mountComponent();

        const skipButton = wrapper.findAllComponents({name: 'VBtn'}).at(1);
        await skipButton.trigger('click');

        expect(wrapper.emitted('question-answered')[0][0].answer).toEqual(null);
    });
    it('should pass the props to QuestionUtilities', () => {
        service.getQustionData.mockReturnValue({question: '', showAnswers: []});
        service.getResult.mockReturnValue({});
        service.answerShuffler.mockReturnValue([3, 6, 4, 5]);

        const wrapper = mountComponent();

        const questionUtilities = wrapper.findComponent(QuestionUtilities);

        expect(questionUtilities.props('startTimer')).toEqual(1);
        expect(questionUtilities.props('isBooleanQuestion')).toEqual(false);
        expect(questionUtilities.props('pausedTime')).toEqual(false);
    });
    it('should remove alternatives when requested-facilitator is emitted', async () => {
        service.getQustionData.mockReturnValue({question: '', showAnswers: []});
        service.getResult.mockReturnValue({});
        service.answerShuffler.mockReturnValue([3, 6, 4, 5]);
        service.wrongAnswersRemover.mockReturnValue([6, 4]);

        const wrapper = mountComponent();

        let radios = wrapper.findAllComponents({name: 'VRadio'});
        
        expect(radios.length).toEqual(4);

        const questionUtilities = wrapper.findComponent(QuestionUtilities);
        questionUtilities.vm.$emit('requested-facilitator');
        await wrapper.vm.$nextTick();

        radios = wrapper.findAllComponents({name: 'VRadio'});

        expect(radios.length).toEqual(2);
    });
    it('should display QuestionResult when time-expired is emitted', async () => {
        service.getQustionData.mockReturnValue({question: '', showAnswers: []});
        service.getResult.mockReturnValue({});
        service.answerShuffler.mockReturnValue([3, 6, 4, 5]);

        const wrapper = mountComponent();

        const questionResult = wrapper.findComponent(QuestionResult);
        const questionUtilities = wrapper.findComponent(QuestionUtilities);
        questionUtilities.vm.$emit('time-expired')
        await wrapper.vm.$nextTick()

        expect(questionResult.props('answersResult').isTimeUp).toEqual(true);
    });
    it('should emit question-answered when questionController is called', async () => {
        service.getQustionData.mockReturnValue({question: '', showAnswers: []});
        service.getResult.mockReturnValue({});
        service.answerShuffler.mockReturnValue([3, 6, 4, 5]);

        const wrapper = mountComponent();

        const questionResult = wrapper.findComponent(QuestionResult);
        questionResult.vm.$emit('displayed-result')
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted('question-answered').length).toEqual(1);
    });
});