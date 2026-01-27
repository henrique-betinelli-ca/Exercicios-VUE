import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import DisplayQuestions from './DisplayQuestions.vue';

describe('DisplayQuestions', () => {
    const mountComponent = propsData =>
        shallowMount(DisplayQuestions, {
            propsData,
            global: {
                stubs: {
                    VBtn: {
                        name: 'VBtn',
                        template: '<button><slot /></button>'
                    },
                    VRadioGroup: {
                        name: 'VRadioGroup',
                        props: ['modelValue'],
                        template: '<div><slot /></div>'
                    },
                    VRadio: {
                        name: 'VRadio',
                        props: ['label', 'value'],
                        template: '<input type="radio" :value="value" :checked="value === $parent.modelValue" />'
                    }
                }
            }
        });
    it('should emit questions-for-display-requested when the view result button is clicked', async () => {
        const wrapper = mountComponent();

        const button = wrapper.findComponent({name: 'VBtn'});
        await button.trigger('click');

        expect(wrapper.emitted('questions-for-display-requested').length).toEqual(1);
    });
    it('should display the answered questions when the button is clicked', async () => {
        const wrapper = mountComponent();

        await wrapper.setProps({
            completedQuestions: [{question: "Human cells typically have how many copies of each gene?", answer: 3, allAnswers: [3, 2, 1, 4]}]
        });

        const button = wrapper.findComponent({name: 'VBtn'});
        await button.trigger('click');
        await wrapper.vm.$nextTick();

        const p = wrapper.find('p');

        const radios = wrapper.findAllComponents({name: 'VRadio'});
        const checkedRadio = radios.find(r => r.element.checked);
        const answers = radios.map(radio => radio.props('label'));

        expect(p.text()).toEqual('Human cells typically have how many copies of each gene?');
        expect(checkedRadio.element.value).toEqual('3');
        expect(answers).toEqual([3, 2, 1, 4]);
    });
});