import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import SearchByRegionView from '@/views/exercicioNove/SearchByRegionView.vue';
import NavigationArea from '@/components/ExercicioNove/common/NavigationArea.vue';
import SearchSection from '@/components/ExercicioNove/common/SearchSection.vue';
import LoadingStage from '@/components/ExercicioNove/common/LoadingStage.vue';
import CountryList from '@/components/ExercicioNove/CountryList.vue';
import AlertsPanel from '@/components/ExercicioNove/common/AlertsPanel.vue';
import * as service from '@/services/ExercicioNove/Service.js';

vi.mock("@/services/ExercicioNove/Service.js");

describe('SearchByRegionView', () => {
    const mountComponent =  propsData =>
        shallowMount(SearchByRegionView, {
            propsData,
        });
        it('should render NavigationArea and SearchSection', () => {
            service.getSearchMode.mockReturnValue('REGION');
            const wrapper = mountComponent();
            const navigationArea = wrapper.findComponent(NavigationArea);
            const searchSection = wrapper.findComponent(SearchSection);

            expect(navigationArea.exists()).toEqual(true);
            expect(searchSection.exists()).toEqual(true);
        });
        it('should show LoadingStage while fetching country data', async () => {
            let resolvePromise
            service.getSearchMode.mockReturnValue('REGION');
            service.getCountriesByRegion.mockReturnValue( new Promise(resolve => {
                resolvePromise = resolve
            }));
            const wrapper = mountComponent();
            const searchSection = wrapper.findComponent(SearchSection);
            await searchSection.vm.$emit('selected-value', 'Europe');
            await wrapper.vm.$nextTick();

            expect(wrapper.findComponent(LoadingStage).exists()).toEqual(true);
            await resolvePromise([{ name: 'Brazil' }])
            await wrapper.vm.$nextTick();
            expect(wrapper.findComponent(LoadingStage).exists()).toEqual(false);
        });
        it('should pass fetched data to CountryCard on success', async () => {
        const countriesData = [
            {
                flag: "https://flagcdn.com/w320/br.png",
                name: "Brazil",
                capital: "Brasília",
                region: "Americas",
            },
            {
                flag: "https://flagcdn.com/w320/pr.png",
                name: "Puerto Rico",
                capital: "San Juan",
                region: "Americas",
            }
        ];
        service.getSearchMode.mockReturnValue('REGION');
        service.getCountriesByRegion.mockReturnValue(countriesData);
        const wrapper = mountComponent();
        const searchSection = wrapper.findComponent(SearchSection);
        await searchSection.vm.$emit('selected-value', 'Americas');
        const countryList = wrapper.findComponent(CountryList);
        await wrapper.vm.$nextTick();

        expect(countryList.props('countriesPanelData')).toEqual(countriesData);
    });
    it('should set alertType in AlertsPanel when service fails', async () => {
        service.getSearchMode.mockReturnValue('REGION');
        service.getCountriesByRegion.mockRejectedValue({ type: 'REGION_NOT_FOUND' });
        const wrapper = mountComponent();
        const searchSection = wrapper.findComponent(SearchSection);
        await searchSection.vm.$emit('selected-value', 'invalidCountry');
        const alertsPanel = wrapper.findComponent(AlertsPanel);
        await wrapper.vm.$nextTick();

        expect(alertsPanel.props('alertType')).toEqual('REGION_NOT_FOUND');
    })
});