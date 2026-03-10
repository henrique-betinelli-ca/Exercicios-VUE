<template>
    <v-navigation-drawer
        :model-value="isCartOpen"
        class="d-flex flex-column fill-height"
        location="right"
        width="500"
        temporary
    >
        <CartSection
            :products="cart"
        />
        <EmptyCartMessage
            v-if="!cart.length"
        />
        <CheckoutButton
            v-if="cart.length"
            @checkout-requested="$emit('checkout-requested')"
        />
    </v-navigation-drawer>
</template>

<script>
    import CartSection from "./CartSection.vue";
    import EmptyCartMessage from "./EmptyCartMessage.vue";
    import CheckoutButton from "./CheckoutButton.vue";
    import * as service from "../../services/ExercicioOnze/Service.js";

    export default {
        name: "ShoppingCartDrawer",
        components: {
            CartSection,
            EmptyCartMessage,
            CheckoutButton
        },
        props: {
            isCartOpen: {
                type: Boolean
            }
        },
        computed: {
            cart() {
                return service.state.cart;
            }

        }
    }
</script>