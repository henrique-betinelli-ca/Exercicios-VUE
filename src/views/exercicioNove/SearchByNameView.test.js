import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import SearchByNameView from '@/views/exercicioNove/SearchByNameView.vue';
import NavigationArea from '@/components/ExercicioNove/common/NavigationArea.vue';
import SearchSection from '@/components/ExercicioNove/common/SearchSection.vue';
import LoadingStage from '@/components/ExercicioNove/common/LoadingStage.vue';
import CountryCard from '@/components/ExercicioNove/common/CountryCard.vue';
import AlertsPanel from '@/components/ExercicioNove/common/AlertsPanel.vue';
import * as service from '@/services/ExercicioNove/Service.js';

vi.mock("@/services/ExercicioNove/Service.js");

describe('SearchByNameView', () => {
    const mountComponent =  propsData =>
        shallowMount(SearchByNameView, {
            propsData,
        });
        it('should render NavigationArea and SearchSection', () => {
            service.getSearchMode.mockReturnValue('NAME');
            const wrapper = mountComponent();
            const navigationArea = wrapper.findComponent(NavigationArea);
            const searchSection = wrapper.findComponent(SearchSection);

            expect(navigationArea.exists()).toEqual(true);
            expect(searchSection.exists()).toEqual(true);
        });
        it('should show LoadingStage while fetching country data', async () => {
            let resolvePromise
            service.getSearchMode.mockReturnValue('NAME');
            service.getMainCountryData.mockReturnValue( new Promise(resolve => {
                resolvePromise = resolve
            }));
            const wrapper = mountComponent();
            const searchSection = wrapper.findComponent(SearchSection);
            await searchSection.vm.$emit('selected-value', 'Brazil');
            await wrapper.vm.$nextTick();

            expect(wrapper.findComponent(LoadingStage).exists()).toEqual(true);
            await resolvePromise({ name: 'Brazil' })
            await wrapper.vm.$nextTick();
            expect(wrapper.findComponent(LoadingStage).exists()).toEqual(false);
        });
        it('should pass fetched data to CountryCard on success', async () => {
        const countryData = {
            flag: "https://flagcdn.com/w320/br.png",
            name: "Brazil",
            capital: "Brasília",
            region: "Americas",
        };
        service.getSearchMode.mockReturnValue('NAME');
        service.getMainCountryData.mockReturnValue(countryData);
        const wrapper = mountComponent();
        const searchSection = wrapper.findComponent(SearchSection);
        await searchSection.vm.$emit('selected-value', 'Brazil');
        const countryCard = wrapper.findComponent(CountryCard);
        await wrapper.vm.$nextTick();

        expect(countryCard.props('countryCardData')).toEqual(countryData);
    });
    it('should set alertType in AlertsPanel when service fails', async () => {
        service.getSearchMode.mockReturnValue('NAME');
        service.getMainCountryData.mockRejectedValue({ type: 'COUNTRY_NOT_FOUND' });
        const wrapper = mountComponent();
        const searchSection = wrapper.findComponent(SearchSection);
        await searchSection.vm.$emit('selected-value', 'invalidCountry');
        const alertsPanel = wrapper.findComponent(AlertsPanel);
        await wrapper.vm.$nextTick();

        expect(alertsPanel.props('alertType')).toEqual('COUNTRY_NOT_FOUND');
    })
});