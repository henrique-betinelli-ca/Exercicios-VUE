import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import QuizTypeSelect from './QuizTypeSelect.vue';
import * as service from '@/services/ExercicioOito/Service.js';

vi.mock('@/services/ExercicioOito/Service.js');

describe('QuizTypeSelect', () => {
    const mountComponent =  () =>
        shallowMount(QuizTypeSelect, {
            global: {
                stubs: ['v-select']
            }
        });
    it('should load the options', () => {
        const typeOptions = [
            "multiple",
            "boolean"
        ];
        service.getTypeOptions.mockReturnValue(typeOptions);
        const wrapper = mountComponent();

        expect(service.getTypeOptions).toHaveBeenCalled();
        expect(wrapper.vm.typeOptions).toEqual(typeOptions);
    });
    it("should emit type-selected when the value changes", async () => {
        const wrapper = mountComponent();
        const vSelect = wrapper.findComponent({name: 'VSelect'});
        await vSelect.vm.$emit('update:modelValue', 'multiple');

        expect(wrapper.emitted('type-selected')).toBeTruthy();
        expect(wrapper.emitted('type-selected')[0]).toEqual(['multiple']);
    });
});