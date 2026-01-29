import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import QuizControlPanel from '../../components/ExercicioOito/QuizControlPanel.vue';
import QuizCategorySelect from '../../components/ExercicioOito/ControlPanelSelects/QuizCategorySelect.vue';
import QuizDifficultySelect from '../../components/ExercicioOito/ControlPanelSelects/QuizDifficultySelect.vue';
import QuizTypeSelect from '../../components/ExercicioOito/ControlPanelSelects/QuizTypeSelect.vue';
import QuizAmountSelect from '../../components/ExercicioOito/ControlPanelSelects/QuizAmountSelect.vue';
import * as service from '@/services/ExercicioOito/Service.js';

vi.mock("@/services/ExercicioOito/Service.js");

describe('QuizControlPanel', () => {
    const mountComponent = propsData =>
        shallowMount(QuizControlPanel, {
            propsData,
            global: {
                stubs: {
                    VAlert: {
                        name: 'VAlert',
                        props: ['title', 'text', 'type'],
                        template: '<div class="v-alert-stub"></div>'
                    },
                    VBtn: {
                        name: 'VBtn',
                        template: '<button><slot /></button>'
                    }
                }
            }
        });
    it('should update filterControls.category when category-selected is emitted', () => {
        service.getAmountOptions.mockReturnValue([5, 10]);
        const wrapper = mountComponent();

        const button = wrapper.findComponent({name: 'VBtn'});
        button.trigger('click');

        expect(wrapper.emitted('quiz-control-past')[0][0].difficulty).toEqual(null);

        wrapper.findComponent(QuizCategorySelect).vm.$emit('category-selected', 11);
        button.trigger('click');

        expect(wrapper.emitted('quiz-control-past')[0][0].category).toEqual(11);
    });
    it('should update filterControls.difficulty when difficulty-selected is emitted', () => {
        service.getAmountOptions.mockReturnValue([5, 10]);
        const wrapper = mountComponent();

        const button = wrapper.findComponent({name: 'VBtn'});
        button.trigger('click');

        expect(wrapper.emitted('quiz-control-past')[0][0].difficulty).toEqual(null);

        wrapper.findComponent(QuizDifficultySelect).vm.$emit('difficulty-selected', 'hard');
        button.trigger('click');

        expect(wrapper.emitted('quiz-control-past')[0][0].difficulty).toEqual('hard');
    });
    it('should update filterControls.type when type-selected is emitted', () => {
        service.getAmountOptions.mockReturnValue([5, 10]);
        const wrapper = mountComponent();

        const button = wrapper.findComponent({name: 'VBtn'});
        button.trigger('click');

        expect(wrapper.emitted('quiz-control-past')[0][0].type).toEqual(null);

        wrapper.findComponent(QuizTypeSelect).vm.$emit('type-selected', 'multiple');
        button.trigger('click');

        expect(wrapper.emitted('quiz-control-past')[0][0].type).toEqual('multiple');
    });
    it('should update filterControls.amount when amount-selected is emitted', () => {
        service.getAmountOptions.mockReturnValue([5, 10]);
        const wrapper = mountComponent();

        const button = wrapper.findComponent({name: 'VBtn'});
        button.trigger('click');

        expect(wrapper.emitted('quiz-control-past')[0][0].amount).toEqual(5);

        wrapper.findComponent(QuizAmountSelect).vm.$emit('amount-selected', 10);
        button.trigger('click');

        expect(wrapper.emitted('quiz-control-past')[0][0].amount).toEqual(10);
    });
    it('should show alert when category fetch fails', async () => {
        service.getAmountOptions.mockReturnValue([5, 10]);
        service.getFeedbackAlertMesseges.mockReturnValue({
            ERROR_FETCHING_CATEGORIES: {
                TITLE: 'Failed to fetch categories.',
                MESSAGE: 'An error occurred while fetching the categories. To continue, the random mode has been selected.',
                TYPE: 'error'
            }
        });
        const wrapper = mountComponent();

        const categorySelect = wrapper.findComponent(QuizCategorySelect);
        categorySelect.vm.$emit('category-data-fetch-failed');
        await wrapper.vm.$nextTick();

        const alert = wrapper.findComponent({name: 'VAlert'});

        expect(alert.props().title).toEqual('Failed to fetch categories.');
        expect(alert.props().text).toEqual('An error occurred while fetching the categories. To continue, the random mode has been selected.');
        expect(alert.props().type).toEqual('error');
    });
    it('should show alert when questions fetch fails', async () => {
        service.getFeedbackAlertMesseges.mockReturnValue({
            ERROR_FETCHING_QUESTIONS: {
                TITLE: "Failed to fetch questions.",
                MESSAGE: "An error occurred while fetching the questions. Please try again later.",
                TYPE: "error",
            }
        });
        const wrapper = mountComponent();

        wrapper.setProps({isFetchError: true});
        await wrapper.vm.$nextTick();

        const alert = wrapper.findComponent({name: 'VAlert'});

        expect(alert.props().title).toEqual('Failed to fetch questions.');
        expect(alert.props().text).toEqual('An error occurred while fetching the questions. Please try again later.');
        expect(alert.props().type).toEqual('error');
    });
    it('should emit quiz-control-past with the provided data', () => {
        service.getAmountOptions.mockReturnValue([5, 10]);
        const wrapper = mountComponent();

        const button = wrapper.findComponent({name: 'VBtn'});
        button.trigger('click');

        expect(wrapper.emitted('quiz-control-past')[0][0]).toEqual({
            category: null,
            difficulty: null,
            type: null,
            amount: 5
        });

        wrapper.findComponent(QuizCategorySelect).vm.$emit('category-selected', 21);
        wrapper.findComponent(QuizAmountSelect).vm.$emit('amount-selected', 10);
        wrapper.findComponent(QuizDifficultySelect).vm.$emit('difficulty-selected', 'hard');
        wrapper.findComponent(QuizTypeSelect).vm.$emit('type-selected', 'multiple');

        button.trigger('click');

        expect(wrapper.emitted('quiz-control-past')[0][0]).toEqual({
            category: 21,
            difficulty: 'hard',
            type: 'multiple',
            amount: 10
        });
    });
});