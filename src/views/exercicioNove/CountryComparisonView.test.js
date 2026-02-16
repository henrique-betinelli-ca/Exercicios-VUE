import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import CountryComparisonView from '@/views/exercicioNove/CountryComparisonView.vue';
import NavigationArea from '@/components/ExercicioNove/common/NavigationArea.vue';
import SearchSection from '@/components/ExercicioNove/common/SearchSection.vue';
import LoadingStage from '@/components/ExercicioNove/common/LoadingStage.vue';
import ComparisonResult from '@/components/ExercicioNove/ComparisonResult.vue';
import AlertsPanel from '@/components/ExercicioNove/common/AlertsPanel.vue';
import * as service from '@/services/ExercicioNove/Service.js';

vi.mock("@/services/ExercicioNove/Service.js");

describe('CountryComparisonView', () => {
    const mountComponent =  propsData =>
        shallowMount(CountryComparisonView, {
            propsData,
        });
        it('should render NavigationArea and SearchSection', () => {
            service.getSearchMode.mockReturnValue('COMPARISON');
            const wrapper = mountComponent();
            const navigationArea = wrapper.findComponent(NavigationArea);
            const searchSection = wrapper.findComponent(SearchSection);

            expect(navigationArea.exists()).toEqual(true);
            expect(searchSection.exists()).toEqual(true);
        });
        it('should show LoadingStage while fetching country data', async () => {
            let resolvePromise
            service.getSearchMode.mockReturnValue('COMPARISON');
            service.compareCountries.mockReturnValue( new Promise(resolve => {
                resolvePromise = resolve
            }));
            const wrapper = mountComponent();
            const searchSection = wrapper.findComponent(SearchSection);
            await searchSection.vm.$emit('countries-selected', ['Brazil', 'Argentina']);
            await wrapper.vm.$nextTick();

            expect(wrapper.findComponent(LoadingStage).exists()).toEqual(true);
            await resolvePromise({ name: 'Brazil' }, { name: 'Argentina' })
            await wrapper.vm.$nextTick();
            expect(wrapper.findComponent(LoadingStage).exists()).toEqual(false);
        });
        it('should pass fetched data to CountryCard on success', async () => {
        const comparisonData = {
            largestAreaCountry: { name: 'Canada' },
            largestPopulationCountry: { name: 'Nigeria' }
        };
        service.getSearchMode.mockReturnValue('COMPARISON');
        service.compareCountries.mockReturnValue(comparisonData);
        const wrapper = mountComponent();
        const searchSection = wrapper.findComponent(SearchSection);
        await searchSection.vm.$emit('countries-selected', ['Canada', 'Nigeria']);
        const comparisonResult = wrapper.findComponent(ComparisonResult);
        await wrapper.vm.$nextTick();

        expect(comparisonResult.props('comparisonCardData')).toEqual(comparisonData);
    });
    it('should set alertType when comparison-selection-invalid is emitted', async () => {
        service.getSearchMode.mockReturnValue('COMPARISON');
        const wrapper = mountComponent();
        const searchSection = wrapper.findComponent(SearchSection);
        await searchSection.vm.$emit('comparison-selection-invalid', 'NOT_ENOUGH_COUNTRIES');
        const alertsPanel = wrapper.findComponent(AlertsPanel);
        await wrapper.vm.$nextTick();

        expect(alertsPanel.props('alertType')).toEqual('NOT_ENOUGH_COUNTRIES');
    })
});