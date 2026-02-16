import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import CountryList from '@/components/ExercicioNove/CountryList.vue';
import CountryCard from '@/components/ExercicioNove/common/CountryCard.vue';
import * as service from '@/services/ExercicioNove/Service';

vi.mock('@/services/ExercicioNove/Service');

describe('CountryList', () => {
    const mountComponent =  propsData =>
        shallowMount(CountryList, {
            propsData,
        });
    it('should not render CountryCard initially', () => {
        const mockCountries = [
            {
                name: { common: 'Brazil' },
                translations: { por: { common: 'Brasil' } }
            },
            {
                name: { common: 'Canada' },
                translations: { por: { common: 'Canadá' } }
            }
        ];
        const wrapper = mountComponent({ countriesPanelData: mockCountries });
        const countryCard = wrapper.findComponent(CountryCard);

        expect(countryCard.exists()).toEqual(false);
    });
    it('should pass correct countryCardData prop to CountryCard', async () => {
        const mockCountries = [
            {
                name: { common: 'Brazil' },
                translations: { por: { common: 'Brasil' } }
            },
            {
                name: { common: 'Canada' },
                translations: { por: { common: 'Canadá' } }
            }
        ];
        const mappedData = { name: 'Brasil' };
        service.mapCountryToCardData.mockReturnValue(mappedData);
        const wrapper = mountComponent({ countriesPanelData: mockCountries });
        await wrapper.setData({ activePanel: 0 });

        const countryCard = wrapper.findComponent(CountryCard);

        expect(countryCard.exists()).toEqual(true);
        expect(countryCard.props('countryCardData')).toEqual(mappedData);
    })
});
