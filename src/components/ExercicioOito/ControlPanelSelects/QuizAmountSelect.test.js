import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import QuizAmountSelect from './QuizAmountSelect.vue';
import * as service from '@/services/ExercicioOito/Service.js';

vi.mock('@/services/ExercicioOito/Service.js');

describe('QuizAmountSelect', () => {
    const mountComponent =  () =>
        shallowMount(QuizAmountSelect, {
            global: {
                stubs: {
                    VSelect: {
                        name: 'VSelect',
                        props: ['modelValue', 'items'],
                        emits: ['update:modelValue'],
                        template: `
                            <select :value="modelValue">
                            <option v-for="item in items" :key="item" :value="item">
                                {{ item }}
                            </option>
                            </select>
                        `
                    }
                }
            }
        });
    it('should load the options', () => {
        const amountOptions = [5, 10];
        service.getAmountOptions.mockReturnValue(amountOptions);

        const wrapper = mountComponent();
        const vSelect = wrapper.findComponent({name: 'VSelect'});

        expect(service.getAmountOptions).toHaveBeenCalledTimes(1);
        expect(vSelect.element.value).toEqual('5');
    });
    it("should emit amount-selected when the value changes", async () => {
        const wrapper = mountComponent();
        const vSelect = wrapper.findComponent({name: 'VSelect'});
        await vSelect.vm.$emit('update:modelValue', 10);

        expect(wrapper.emitted('amount-selected').length).toEqual(1);
        expect(wrapper.emitted('amount-selected')[0]).toEqual([10]);
    });
});