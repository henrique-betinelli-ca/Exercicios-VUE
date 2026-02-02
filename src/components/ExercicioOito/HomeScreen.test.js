import { describe, it, expect, } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import HomeScreen from './HomeScreen.vue';
import QuizControlPanel from './QuizControlPanel.vue';

describe('HomeScreen', () => {
    const mountComponent = propsData =>
        shallowMount(HomeScreen, {
            propsData,
        });
    it('should emit quiz-control-past when get the filters', () => {
        const wrapper = mountComponent();

        const quizControlPanel = wrapper.findComponent(QuizControlPanel);
        
        quizControlPanel.vm.$emit('quiz-control-past', {
            category: null,
            difficulty: null,
            type: null,
            amount: 5
        });

        expect(wrapper.emitted('quiz-control-past').length).toEqual(1);
        expect(wrapper.emitted('quiz-control-past')[0][0]).toEqual({
            category: null,
            difficulty: null,
            type: null,
            amount: 5
        });
    });
    it('should pass isFetchError to QuizControlPanel', async () => {
        const wrapper = mountComponent();

        await wrapper.setProps({isFetchError: true});
        const quizControlPanel = wrapper.findComponent(QuizControlPanel);

        expect(quizControlPanel.props('isFetchError')).toEqual(true);
    });
});