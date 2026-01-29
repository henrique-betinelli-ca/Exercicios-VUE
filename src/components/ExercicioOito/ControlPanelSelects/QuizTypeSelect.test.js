import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import QuizTypeSelect from './QuizTypeSelect.vue';
import * as service from '@/services/ExercicioOito/Service.js';

vi.mock('@/services/ExercicioOito/Service.js');

describe('QuizTypeSelect', () => {
    const mountComponent =  () =>
        shallowMount(QuizTypeSelect, {
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
        const typeOptions = [
            "multiple",
            "boolean"
        ];
        service.getTypeOptions.mockReturnValue(typeOptions);

        const wrapper = mountComponent();
        const vSelect = wrapper.findComponent({name: 'VSelect'});

        expect(service.getTypeOptions).toHaveBeenCalledTimes(1);
        expect(vSelect.props('items')).toEqual(typeOptions);
    });
    it("should emit type-selected when the value changes", () => {
        const wrapper = mountComponent();
        const vSelect = wrapper.findComponent({name: 'VSelect'});
        vSelect.vm.$emit('update:modelValue', 'multiple');

        expect(wrapper.emitted('type-selected').length).toEqual(1);
        expect(wrapper.emitted('type-selected')[0]).toEqual(['multiple']);
    });
});