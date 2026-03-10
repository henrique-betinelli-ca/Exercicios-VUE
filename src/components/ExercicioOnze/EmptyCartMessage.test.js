import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import EmptyCartMessage from '@/components/ExercicioOnze/EmptyCartMessage.vue';
import * as service from '@/services/ExercicioOnze/Service';

vi.mock('@/services/ExercicioOnze/Service');

describe('EmptyCartMessage', () => {
    const mountComponent =  propsData =>
        shallowMount(EmptyCartMessage, {
            propsData,
        });
    it('should render all messages', () => {
        const emptyCartMessage = {
            title: "Seu carrinho está vazio.",
            text: "Adicione produtos para continuar com a compra."
        };
        service.getEmptyCartMessages.mockReturnValue(emptyCartMessage);
        const wrapper = mountComponent();
        const title = wrapper.find('h2');
        const text = wrapper.find('p');

        expect(title.text()).toEqual(emptyCartMessage.title);
        expect(text.text()).toEqual(emptyCartMessage.text);
    });
});