import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import ComparisonResult from '@/components/ExercicioNove/ComparisonResult.vue';
import CountryCard from '@/components/ExercicioNove/common/CountryCard.vue';

describe('ComparisonResult', () => {
    const mountComponent =  propsData =>
        shallowMount(ComparisonResult, {
            propsData,
        });
    it('should render all titles for the largest area and largest population', () => {
        const wrapper = mountComponent({ comparisonCardData: true });
        const [area, population] = wrapper.findAll('h2');

        expect(area.text()).toEqual('Maior Área Territorial');
        expect(population.text()).toEqual('Maior População');
    });
    it('should call CountryCard with the data for the largest area and largest population cards', () => {
        const comparisonData = {
            largestAreaCountry: { name: 'Canada' }, 
            largestPopulationCountry: { name: 'Nigeria' }
        };
        const wrapper = mountComponent({ comparisonCardData: comparisonData });
        const countryCards = wrapper.findAllComponents(CountryCard);

        expect(countryCards[0].props('countryCardData')).toEqual(comparisonData.largestAreaCountry);
        expect(countryCards[1].props('countryCardData')).toEqual(comparisonData.largestPopulationCountry);
    });
});