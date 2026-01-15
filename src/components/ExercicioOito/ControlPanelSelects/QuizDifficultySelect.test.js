import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import QuizDifficultySelect from './QuizDifficultySelect.vue';
import * as service from '@/services/ExercicioOito/Service.js';

vi.mock('@/services/ExercicioOito/Service.js');

describe('QuizDifficultySelect', () => {
    const mountComponent =  () =>
        shallowMount(QuizDifficultySelect, {
            global: {
                stubs: ['v-select']
            }
        });
    it('should load the options', () => {
        const difficultyOptions = [
            "easy",
            "medium",
            "hard"
        ];
        service.getDifficultyOptions.mockReturnValue(difficultyOptions);
        const wrapper = mountComponent();

        expect(service.getDifficultyOptions).toHaveBeenCalled();
        expect(wrapper.vm.difficultyOptions).toEqual(difficultyOptions);
    });
    it("should emit difficulty-selected when the value changes", async () => {
        const wrapper = mountComponent();
        const vSelect = wrapper.findComponent({name: 'VSelect'});
        await vSelect.vm.$emit('update:modelValue', 'medium');

        expect(wrapper.emitted('difficulty-selected')).toBeTruthy();
        expect(wrapper.emitted('difficulty-selected')[0]).toEqual(['medium']);
    });
});