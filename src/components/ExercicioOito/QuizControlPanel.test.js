import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import QuizControlPanel from './QuizControlPanel.vue';
import * as service from '@/services/ExercicioOito/Service.js';

vi.mock("@/services/ExercicioOito/Service.js");

describe('QuizControlPanel', () => {
    const mountComponent = propsData =>
        shallowMount(QuizControlPanel, {
            propsData,
        });
    it('should call feedbackAlert with errorFetchingQuestions when isFetchError is received', async () => {
        service.getAmountOptions.mockReturnValue(5);
        service.getFeedbackAlertMesseges.mockReturnValue({
            ERROR_FETCHING_QUESTIONS: {
                TITLE: 'Failed to fetch questions.',
                MESSAGE: 'An error occurred while fetching the questions. Please try again later.',
                TYPE: 'error',
            }
        });
        const wrapper = mountComponent();
        const spyFeedbackAlert  = vi.spyOn(wrapper.vm, 'feedbackAlert');
        await wrapper.setProps({isFetchError: true});

        expect(spyFeedbackAlert ).toHaveBeenCalledWith({
            TITLE: 'Failed to fetch questions.',
            MESSAGE: 'An error occurred while fetching the questions. Please try again later.',
            TYPE: 'error',
        });
    });
    it('should call feedbackAlert with errorFetchingCategories when categoryDataFetchFailed is called', () => {
        service.getAmountOptions.mockReturnValue(5);
        service.getFeedbackAlertMesseges.mockReturnValue({
            ERROR_FETCHING_CATEGORIES: {
                TITLE: 'Failed to fetch categories.',
                MESSAGE: 'An error occurred while fetching the categories. To continue, the random mode has been selected.',
                TYPE: 'error',
            }
        });
        const wrapper = mountComponent();
        const spyFeedbackAlert  = vi.spyOn(wrapper.vm, 'feedbackAlert');
        wrapper.vm.categoryDataFetchFailed();

        expect(spyFeedbackAlert ).toHaveBeenCalledWith({
            TITLE: 'Failed to fetch categories.',
            MESSAGE: 'An error occurred while fetching the categories. To continue, the random mode has been selected.',
            TYPE: 'error',
        });
    });
    it('should fill alertReturn with the parameters passed to feedbackAlert', () => {
        vi.useFakeTimers();
        const wrapper = mountComponent();
        wrapper.vm.feedbackAlert({
            TITLE: 'title-test',
            MESSAGE: 'message-test',
            TYPE: 'type-test',
        });

        expect(wrapper.vm.alertReturn).toEqual({
            title: 'title-test',
            message: 'message-test',
            type: 'type-test',
            status: true
        });
        
        vi.advanceTimersByTime(10000);

        expect(wrapper.vm.alertReturn.status).toBe(false);
    });
});