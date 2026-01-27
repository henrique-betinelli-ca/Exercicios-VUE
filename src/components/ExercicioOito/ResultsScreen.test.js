import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import ResultsScreen from '../../components/ExercicioOito/ResultsScreen.vue';
import ScoreResult from '../../components/ExercicioOito/ScoreResult.vue';
import DisplayQuestions from '../../components/ExercicioOito/DisplayQuestions.vue';
import FinalSteps from '../../components/ExercicioOito/FinalSteps.vue';
import * as service from '@/services/ExercicioOito/Service.js';

vi.mock("@/services/ExercicioOito/Service.js");

describe('ResultsScreen', () => {
    const mountComponent =  propsData =>
        shallowMount(ResultsScreen, {
            propsData,
        });
    it('should calculate totalResults when questionResults is received', async () => {
        service.calculateScore.mockReturnValueOnce(15).mockReturnValue(10);
        service.calculateTime.mockReturnValueOnce(10).mockReturnValue(5);
        const wrapper = mountComponent({questionResults: []});

        const scoreResult = wrapper.findComponent(ScoreResult);

        expect(scoreResult.props().totalResults).toEqual({
            score: 15,
            time: 10
        });

        await wrapper.setProps({questionResults: [{ test: '123' }]});

        expect(scoreResult.props().totalResults).toEqual({
            score: 10,
            time: 5
        });
        
    });
    it('should fill completedQuestions when prepareQuestionsForDisplay is called', async () => {
        const fakeResults = [{
            question: 'What number does the Roman numeral XX represent?',
            answer: 20,
            allAnswers: [20, 10, 15, 5],
            score: 10
        }];
        const wrapper = mountComponent({questionResults: fakeResults});
        
        const displayQuestions = wrapper.findComponent(DisplayQuestions);
        displayQuestions.vm.$emit('questions-for-display-requested');
        await wrapper.vm.$nextTick();

        expect(displayQuestions.props().completedQuestions).toEqual([{
            question: 'What number does the Roman numeral XX represent?',
            answer: 20,
            allAnswers: [20, 10, 15, 5],
        }]);
    });
    it('should emit back-home-requested when FinalSteps emits it', () => {
        const wrapper = mountComponent();

        const finalSteps = wrapper.findComponent(FinalSteps);
        finalSteps.vm.$emit('back-home-requested');

        expect(wrapper.emitted('back-home-requested').length).toEqual(1);
    });
    it('should emit play-again-requested when FinalSteps emits it', () => {
        const wrapper = mountComponent();
        
        const finalSteps = wrapper.findComponent(FinalSteps);
        finalSteps.vm.$emit('play-again-requested');

        expect(wrapper.emitted('play-again-requested').length).toEqual(1);
    });
});