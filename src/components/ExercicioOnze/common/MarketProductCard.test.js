import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import MarketProductCard from '@/components/ExercicioOnze/common/MarketProductCard.vue';
import * as service from '@/services/ExercicioOnze/Service';

vi.mock('@/services/ExercicioOnze/Service');

describe('MarketProductCard', () => {
    const mountComponent =  propsData =>
        shallowMount(MarketProductCard, {
            propsData,
        });
    it('should render the product data', () => {
        const utilityTexts = {
            productStock: "Estoque disponível: ",
            currencySymbol: "R$ "
        };
        const buttonLabels = {
            add: "Adicionar"
        };
        const product = {
            id: 'FE49',
            name: 'Feijão - 1kg',
            photo: 'https://samsclub.vtexassets.com/arquivos/ids/200531/7897122600071_12_9_1200_72_SRGB.png?v=638820613995900000',
            price: 8.49,
            availableQuantity: 18
        };
        service.getUtilityTexts.mockReturnValue(utilityTexts);
        service.getButtonLabels.mockReturnValue(buttonLabels);
        const wrapper = mountComponent({
            ProductData: product
        });
        const [productName, productPrice] = wrapper.findAll('h2');
        const productQuantity = wrapper.find('p');
        const amount = wrapper.find('span');
        const addButton = wrapper.findAll('v-btn').at(2);

        expect(productName.text()).toEqual(product.name);
        expect(productPrice.text()).toEqual(`${utilityTexts.currencySymbol}${product.price}`);
        expect(productQuantity.text()).toEqual(`${utilityTexts.productStock}${product.availableQuantity}`);
        expect(amount.text()).toEqual('1');
        expect(addButton.text()).toEqual(buttonLabels.add);
    });
    it('should increase or decrease the amount according to the clicked button', async () => {
        const utilityTexts = {
            productStock: "Estoque disponível: ",
            currencySymbol: "R$ "
        };
        const buttonLabels = {
            add: "Adicionar"
        };
        const product = {
            id: 'FE49',
            name: 'Feijão - 1kg',
            photo: 'https://samsclub.vtexassets.com/arquivos/ids/200531/7897122600071_12_9_1200_72_SRGB.png?v=638820613995900000',
            price: 8.49,
            availableQuantity: 18
        };
        service.getUtilityTexts.mockReturnValue(utilityTexts);
        service.getButtonLabels.mockReturnValue(buttonLabels);
        const wrapper = mountComponent({
            ProductData: product
        });
        const decrementButton = wrapper.findAll('v-btn').at(0);
        const incrementButton = wrapper.findAll('v-btn').at(1);
        expect(wrapper.find('span').text()).toEqual('1');
        
        incrementButton.trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.find('span').text()).toEqual('2');

        decrementButton.trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.find('span').text()).toEqual('1');
    });
    it('should not allow the amount to exceed the product maximum quantity', async () => {
        const utilityTexts = {
            productStock: "Estoque disponível: ",
            currencySymbol: "R$ "
        };
        const buttonLabels = {
            add: "Adicionar"
        };
        const product = {
            id: 'FE49',
            name: 'Feijão - 1kg',
            photo: 'https://samsclub.vtexassets.com/arquivos/ids/200531/7897122600071_12_9_1200_72_SRGB.png?v=638820613995900000',
            price: 8.49,
            availableQuantity: 18
        };
        service.getUtilityTexts.mockReturnValue(utilityTexts);
        service.getButtonLabels.mockReturnValue(buttonLabels);
        const wrapper = mountComponent({
            ProductData: product
        });
        const incrementButton = wrapper.findAll('v-btn').at(1);
        for(let i = 0; i < 20; i++) {
            await incrementButton.trigger('click');
        };

        expect(wrapper.find('span').text()).toEqual('18');
    });
    it('should emit product-selected and pass the id along with the quantity', () => {
        const utilityTexts = {
            productStock: "Estoque disponível: ",
            currencySymbol: "R$ "
        };
        const buttonLabels = {
            add: "Adicionar"
        };
        const product = {
            id: 'FE49',
            name: 'Feijão - 1kg',
            photo: 'https://samsclub.vtexassets.com/arquivos/ids/200531/7897122600071_12_9_1200_72_SRGB.png?v=638820613995900000',
            price: 8.49,
            availableQuantity: 18
        };
        service.getUtilityTexts.mockReturnValue(utilityTexts);
        service.getButtonLabels.mockReturnValue(buttonLabels);
        const wrapper = mountComponent({
            ProductData: product
        });
        const incrementButton = wrapper.findAll('v-btn').at(1);
        const addButton = wrapper.findAll('v-btn').at(2);
        incrementButton.trigger('click');
        addButton.trigger('click');

        expect(wrapper.emitted('product-selected').length).toEqual(1);
        expect(wrapper.emitted('product-selected')[0]).toEqual(['FE49', 2]);
    });
});