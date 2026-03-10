import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import CartItemCard from '@/components/ExercicioOnze/common/CartItemCard.vue';
import * as service from '@/services/ExercicioOnze/Service';

vi.mock('@/services/ExercicioOnze/Service');

describe('CartItemCard', () => {
    const mountComponent =  propsData =>
        shallowMount(CartItemCard, {
            propsData,
        });
    it('should render the product data', () => {
        const price = 16.98;
        const product = {
            id: 'FE49',
            name: 'Feijão - 1kg',
            photo: 'https://samsclub.vtexassets.com/arquivos/ids/200531/7897122600071_12_9_1200_72_SRGB.png?v=638820613995900000',
            price: 8.49,
            quantity: 2
        };
        service.calculatePrice.mockReturnValue(price);
        const wrapper = mountComponent({
            ProductData: product
        });
        const productName = wrapper.find('h3');
        const productPrice = wrapper.find('p');
        const productQuantity = wrapper.find('span');

        expect(productName.text()).toEqual(product.name);
        expect(productPrice.text()).toEqual(price.toString());
        expect(productQuantity.text()).toEqual(product.quantity.toString())
    });
    it('should emit quantity-incremented with the product id when the increment button is clicked', () => {
        const price = 16.98;
        const product = {
            id: 'FE49',
            name: 'Feijão - 1kg',
            photo: 'https://samsclub.vtexassets.com/arquivos/ids/200531/7897122600071_12_9_1200_72_SRGB.png?v=638820613995900000',
            price: 8.49,
            quantity: 2
        };
        service.calculatePrice.mockReturnValue(price);
        const wrapper = mountComponent({
            ProductData: product
        });
        const incrementButton = wrapper.findAll('v-btn').at(1);
        incrementButton.trigger('click');

        expect(wrapper.emitted('quantity-incremented').length).toEqual(1);
        expect(wrapper.emitted('quantity-incremented')[0]).toEqual([product.id]);
    });
    it('should emit quantity-decremented with the product id when the decrement button is clicked and there is more than one item', () => {
        const price = 16.98;
        const product = {
            id: 'FE49',
            name: 'Feijão - 1kg',
            photo: 'https://samsclub.vtexassets.com/arquivos/ids/200531/7897122600071_12_9_1200_72_SRGB.png?v=638820613995900000',
            price: 8.49,
            quantity: 2
        };
        service.calculatePrice.mockReturnValue(price);
        const wrapper = mountComponent({
            ProductData: product
        });
        const decrementButton = wrapper.findAll('v-btn').at(0);
        decrementButton.trigger('click');

        expect(wrapper.emitted('quantity-decremented').length).toEqual(1);
        expect(wrapper.emitted('quantity-decremented')[0]).toEqual([product.id]);
    });
    it('should emit product-removed with the product id when the decrement button is clicked and there is only one item', () => {
        const price = 8.49;
        const product = {
            id: 'FE49',
            name: 'Feijão - 1kg',
            photo: 'https://samsclub.vtexassets.com/arquivos/ids/200531/7897122600071_12_9_1200_72_SRGB.png?v=638820613995900000',
            price: 8.49,
            quantity: 1
        };
        service.calculatePrice.mockReturnValue(price);
        const wrapper = mountComponent({
            ProductData: product
        });
        const decrementButton = wrapper.findAll('v-btn').at(0);
        decrementButton.trigger('click');

        expect(wrapper.emitted('product-removed').length).toEqual(1);
        expect(wrapper.emitted('product-removed')[0]).toEqual([product.id]);
    });
});