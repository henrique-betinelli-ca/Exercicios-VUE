import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import QuizCategorySelect  from './QuizCategorySelect.vue';
import * as service from '@/services/ExercicioOito/Service.js';

vi.mock('@/services/ExercicioOito/Service.js');

describe('QuizCategorySelect', () => {
    const mountComponent = () =>
        shallowMount(QuizCategorySelect, {
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
    it('should fetch categories when opening the menu', () => {
        const fakeCategories = [
            { id: 1, name: 'Science' },
            { id: 2, name: 'Sports' }
        ];
        const wrapper = mountComponent();

        const vSelect = wrapper.findComponent({name: 'VSelect'});
        service.getCategories.mockResolvedValue(fakeCategories);
        vSelect.vm.$emit('update:menu');

        expect(service.getCategories).toHaveBeenCalledTimes(1);
    });
    it('should emit category-selected when a category is selected', () => {
        const wrapper = mountComponent();

        const vSelect = wrapper.findComponent({name: 'VSelect'});
        vSelect.vm.$emit('update:modelValue', 2);

        expect(wrapper.emitted('category-selected').length).toEqual(1);
        expect(wrapper.emitted('category-selected')[0]).toEqual([2]);
    });
    it('should emit category-data-fetch-failed when the API request fails', async () => {
        const wrapper = mountComponent();

        const vSelect = wrapper.findComponent({name: 'VSelect'});
        service.getCategories.mockRejectedValue(new Error('API error'));
        await vSelect.vm.$emit('update:menu');

        expect(wrapper.emitted('category-data-fetch-failed').length).toEqual(1);
    });
});