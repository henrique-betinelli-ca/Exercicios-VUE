import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import CountryCard from '@/components/ExercicioNove/common/CountryCard.vue';
import * as service from '@/services/ExercicioNove/Service.js';

vi.mock("@/services/ExercicioNove/Service.js");

describe('CountryCard', () => {
    const mountComponent =  propsData =>
        shallowMount(CountryCard, {
            propsData,
        });
    it('should render the card when countryCardData is provided', async () => {
        service.getCountryInfoFields.mockReturnValue([
            { KEY: "capital", ICON: "mdi-map-marker", LABEL: "Capital" },
            { KEY: "region", ICON: "mdi-earth", LABEL: "Region" }
        ]);
        const countryData = {
            flag: "https://flagcdn.com/w320/br.png",
            name: "Brazil",
            capital: "Brasília",
            region: "Americas",
        };
        const wrapper = mountComponent();
        await wrapper.setProps({ countryCardData: countryData });
        const countryName = wrapper.find('h1');
        const countryFlag = wrapper.find('v-img');
        const [countryCapital, countryRegion] = wrapper.findAll('div');

        expect(countryName.text()).toEqual(countryData.name);
        expect(countryFlag.attributes('src')).toEqual(countryData.flag);
        expect(countryCapital.text()).toEqual('mdi-map-markerCapital: Brasília');
        expect(countryRegion.text()).toEqual('mdi-earthRegion: Americas');
    });
    it('shold not render card when countryCardData is null', async () => {
        const wrapper = mountComponent();
        await wrapper.setProps({ countryCardData: null });
        const countryCard = wrapper.find('v-card');

        expect(countryCard.exists()).toEqual(false);
    });
});