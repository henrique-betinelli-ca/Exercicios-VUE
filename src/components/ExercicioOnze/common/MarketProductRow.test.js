import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import MarketProductRow from '@/components/ExercicioOnze/common/MarketProductRow.vue';
import MarketProductCard from '@/components/ExercicioOnze/common/MarketProductCard.vue';
import * as service from '@/services/ExercicioOnze/Service';

vi.mock('@/services/ExercicioOnze/Service');

describe('MarketProductRow', () => {
    const mountComponent =  propsData =>
        shallowMount(MarketProductRow, {
            propsData,
        });
    it('should render the correct number of cards', () => {
        const products = [
            { id: "AR90", name: "Arroz - 5kg", photo: "https://www.korinalimentos.com.br/wp-content/uploads/2023/11/Arroz-AGULINHA-INTEGRAL-ORGANICO-min.png", price: 24.90, availableQuantity: 15 },
            { id: "FE49", name: "Feijão - 1kg", photo: "https://samsclub.vtexassets.com/arquivos/ids/200531/7897122600071_12_9_1200_72_SRGB.png?v=638820613995900000", price: 8.49, availableQuantity: 18 }
        ];
        const wrapper = mountComponent({
            productList: products
        });
        const cards = wrapper.findAllComponents(MarketProductCard);

        expect(cards.length).toEqual(products.length);
    });
    it('should pass the correct data to each card', () => {
        const products = [
            { id: "AR90", name: "Arroz - 5kg", photo: "https://www.korinalimentos.com.br/wp-content/uploads/2023/11/Arroz-AGULINHA-INTEGRAL-ORGANICO-min.png", price: 24.90, availableQuantity: 15 },
            { id: "FE49", name: "Feijão - 1kg", photo: "https://samsclub.vtexassets.com/arquivos/ids/200531/7897122600071_12_9_1200_72_SRGB.png?v=638820613995900000", price: 8.49, availableQuantity: 18 }
        ];
        const wrapper = mountComponent({
            productList: products
        });
        const firstCard = wrapper.findAllComponents(MarketProductCard).at(0);

        expect(firstCard.props('ProductData')).toEqual(products[0]);
    });
    it('should call addToCart when the card emits product-selected', () => {
        const products = [
            { id: "AR90", name: "Arroz - 5kg", photo: "https://www.korinalimentos.com.br/wp-content/uploads/2023/11/Arroz-AGULINHA-INTEGRAL-ORGANICO-min.png", price: 24.90, availableQuantity: 15 },
            { id: "FE49", name: "Feijão - 1kg", photo: "https://samsclub.vtexassets.com/arquivos/ids/200531/7897122600071_12_9_1200_72_SRGB.png?v=638820613995900000", price: 8.49, availableQuantity: 18 }
        ];
        const wrapper = mountComponent({
            productList: products
        });
        const firstCard = wrapper.findAllComponents(MarketProductCard).at(0);
        firstCard.vm.$emit('product-selected', 1, 5);

        expect(service.addToCart).toHaveBeenCalledOnce();
        expect(service.addToCart).toHaveBeenCalledWith(1, 5);
    });
});