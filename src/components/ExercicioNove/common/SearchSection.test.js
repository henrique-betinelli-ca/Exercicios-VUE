import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import SearchSection from '@/components/ExercicioNove/common/SearchSection.vue';
import * as service from '@/services/ExercicioNove/Service.js';

vi.mock("@/services/ExercicioNove/Service.js");

describe('SearchSection', () => {
    const mountComponent =  propsData =>
        shallowMount(SearchSection, {
            propsData,
        });
    it('should render the SearchSection in name mode', async () => {
        service.getSearchMode.mockReturnValue({
            REGION : "REGION",
            NAME: "NAME",
            COMPARISON: "COMPARISON"
        });
        service.getSearchLabels.mockReturnValue("Informe o País");
        service.getCountriesNames.mockResolvedValue([
            'Brazil',
            'Argentina',
            'Chile'
        ]);
        const wrapper = mountComponent({ mode: 'NAME' });
        await Promise.resolve();
        await wrapper.vm.$nextTick();
        const autocomplete = wrapper.find('v-autocomplete');

        expect(autocomplete.attributes('label')).toEqual('Informe o País');
        expect(autocomplete.attributes('items')).toContain('Brazil', 'Argentina', 'Chile');

        await wrapper.setData({ selectedValue: 'Brazil' })
        await wrapper.find('v-btn').trigger('click');

        expect(wrapper.emitted('selected-value').length).toEqual(1);
        expect(wrapper.emitted('selected-value')[0][0]).toEqual('Brazil');
    });
    it('should render the SearchSection in region mode', async () => {
        service.getSearchMode.mockReturnValue({
            REGION : "REGION",
            NAME: "NAME",
            COMPARISON: "COMPARISON"
        });
        service.getSearchLabels.mockReturnValue('Informe a Região');
        service.getRegions.mockReturnValue([
            'Europe', 
            'Americas', 
            'Asia'
        ]);
        const wrapper = mountComponent({ mode: 'REGION' });
        await wrapper.vm.$nextTick();
        const autocomplete = wrapper.find('v-autocomplete');

        expect(autocomplete.attributes('label')).toEqual('Informe a Região');
        expect(autocomplete.attributes('items')).toContain('Europe', 'Americas', 'Asia');

        await wrapper.setData({ selectedValue: 'Europe' })
        await wrapper.find('v-btn').trigger('click');

        expect(wrapper.emitted('selected-value').length).toEqual(1);
        expect(wrapper.emitted('selected-value')[0]).toEqual(['Europe']);
    });
    it('should render the SearchSection in comparison mode', async () => {
        service.getSearchMode.mockReturnValue({
            REGION : "REGION",
            NAME: "NAME",
            COMPARISON: "COMPARISON"
        });
        service.getSearchLabels.mockReturnValue('Selecione os Países');
        service.getRegions.mockReturnValue([
            'Brazil',
            'Argentina',
            'Chile',
            'Canada'
        ]);
        const wrapper = mountComponent({ mode: 'COMPARISON' });
        await Promise.resolve();
        await wrapper.vm.$nextTick();
        const autocomplete = wrapper.find('v-autocomplete');

        expect(autocomplete.attributes('label')).toEqual('Selecione os Países');
        expect(autocomplete.attributes('items')).toContain('Brazil', 'Argentina', 'Chile');

        await wrapper.setData({ selectedValue: ['Brazil', 'Argentina', 'Chile'] })
        await wrapper.find('v-btn').trigger('click');

        expect(wrapper.emitted('selected-value').length).toEqual(1);
        expect(wrapper.emitted('selected-value')[0]).toEqual([['Brazil', 'Argentina', 'Chile']]);

        await wrapper.setData({ selectedValue: ['Brazil', 'Argentina', 'Chile', 'Canada'] })
        await wrapper.find('v-btn').trigger('click');

        expect(wrapper.emitted('selected-value')[0]).toEqual([['Brazil', 'Argentina', 'Chile']]);
    });
    it('should emit error-detected when getCountriesNames fails', async () => {
        service.getSearchMode.mockReturnValue({
            REGION : "REGION",
            NAME: "NAME",
            COMPARISON: "COMPARISON"
        });
        service.getSearchLabels.mockReturnValue("Informe o País");
        service.getCountriesNames.mockRejectedValue({type: 'OUNTRIES_NAMES_NOT_FOUND'});
        const wrapper = mountComponent({ mode: 'NAME' });
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('error-detected').length).toEqual(1);
        expect(wrapper.emitted('error-detected')[0]).toEqual(['OUNTRIES_NAMES_NOT_FOUND']);
    })
});