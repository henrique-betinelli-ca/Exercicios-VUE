import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import QuestionResult from './QuestionResult.vue';
import * as service from '@/services/ExercicioOito/Service.js';

vi.mock("@/services/ExercicioOito/Service.js");

describe('QuestionResult', () => {
    const mountComponent = propsData =>
        shallowMount(QuestionResult, {
            propsData,
            global: {
                stubs: {
                    VDialog: {template: '<div><slot /></div>'},
                    VCard: {template: '<div><slot /><slot name="actions" /></div>'},
                    VCardTitle: {template: '<div class="title"><slot /></div>'},
                    VCardText: {template: '<div class="text"><slot /></div>'},
                    VIcon: {template: '<span class="icon"><slot /></span>'},
                    VBtn: {
                        emits: ['click'],
                        template: '<button @click="$emit(`click`)"><slot /></button>'
                    }
                }
            }
        });
    it('should render icon and title in v-card-title', async () => {
        service.buildResultCard.mockReturnValue({
            ICON: "mdi-check-circle",
            TITLE: "Correct",
            MESSAGE: "Congratulations! You got it right!",
        });

        const wrapper = mountComponent();
        await wrapper.setProps({
            answersResult: {
            isTimeUp: false,
            isCorrectAnswer: true,
            score: 10
            }
        });

        const title = wrapper.find('.title');
        expect(title.text()).toContain('mdi-check');
        expect(title.text()).toContain('Correct');
    })
    it('should render message and score in v-card-text', async () => {
        service.buildResultCard.mockReturnValue({
            ICON: "mdi-check-circle",
            TITLE: "Correct",
            MESSAGE: "Congratulations! You got it right!",
        });

        const wrapper = mountComponent();
        await wrapper.setProps({
                answersResult: {
                isTimeUp: false,
                isCorrectAnswer: true,
                score: 10
            }
        });

        const text = wrapper.find('.text');
        expect(text.text()).toContain('Congratulations! You got it right!');
        expect(text.text()).toContain('+ 10 points');
    })
    it('should emit displayed-result when next button is clicked', async () => {
        const wrapper = mountComponent();
        await wrapper.setProps({
                answersResult: {
                isTimeUp: false,
                isCorrectAnswer: true,
                score: 10
            }
        });

        const button = wrapper.find('button');
        await button.trigger('click');

        expect(wrapper.emitted('displayed-result').length).toEqual(1);
    })
});