import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import ResultsScreen from './ResultsScreen.vue';
import * as service from '@/services/ExercicioOito/Service.js';

vi.mock("@/services/ExercicioOito/Service.js");

describe('ResultsScreen', () => {
    const mountComponent =  propsData =>
        shallowMount(ResultsScreen, {
            propsData,
        });
    it('should fill totalResults when questionResults is received', async () => {
        service.calculateScore.mockReturnValue(15);
        service.calculateTime.mockReturnValue(10);
        const wrapper = mountComponent();
        await wrapper.setProps({questionResults: []});

        expect(wrapper.vm.totalResults.score).toEqual(15);
        expect(wrapper.vm.totalResults.time).toEqual(10);
    });
    it('should fill completedQuestions when prepareQuestionsForDisplay is called', () => {
        const fakeResults = [{
            question: 'What number does the Roman numeral XX represent?',
            answer: 20,
            allAnswers: [20, 10, 15, 5],
            score: 10
        }];
        const wrapper = mountComponent({questionResults: fakeResults});
        wrapper.vm.prepareQuestionsForDisplay();

        expect(wrapper.vm.completedQuestions).toEqual([{
            question: 'What number does the Roman numeral XX represent?',
            answer: 20,
            allAnswers: [20, 10, 15, 5],
        }]);
    });
});