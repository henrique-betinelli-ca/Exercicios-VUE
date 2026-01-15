import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import QuizCategorySelect  from './QuizCategorySelect.vue';
import * as service from '@/services/ExercicioOito/Service.js';

vi.mock('@/services/ExercicioOito/Service.js');

describe('QuizCategorySelect', () => {
    const mountComponent = () =>
        shallowMount(QuizCategorySelect, {
            global: {
                stubs: ['v-select']
            }
        });
    it('should fetch categories when opening the menu', async () => {
        const fakeCategories = [
            { id: 1, name: 'Science' },
            { id: 2, name: 'Sports' }
        ];
        const wrapper = mountComponent();
        const vSelect = wrapper.findComponent({name: 'VSelect'});
        service.getCategories.mockResolvedValue(fakeCategories);
        await vSelect.vm.$emit('update:menu');

        expect(service.getCategories).toHaveBeenCalled();
        expect(wrapper.vm.categoriesOptions).toEqual(fakeCategories);
    });
    it('should emit category-selected when a category is selected', async () => {
        const wrapper = mountComponent();
        const vSelect = wrapper.findComponent({name: 'VSelect'});
        await vSelect.vm.$emit('update:modelValue', 2);

        expect(wrapper.emitted('category-selected')).toBeTruthy();
        expect(wrapper.emitted('category-selected')[0]).toEqual([2]);
    });
    it('should emit category-data-fetch-failed when the API request fails', async () => {
        const wrapper = mountComponent();
        const vSelect = wrapper.findComponent({name: 'VSelect'});
        service.getCategories.mockRejectedValue(new Error('API error'));
        await vSelect.vm.$emit('update:menu');

        expect(wrapper.emitted('category-data-fetch-failed')).toBeTruthy();
    });
});