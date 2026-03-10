<template>
    <section class="pa-6">
        <CartHeader/>
        <CartItemCard
            v-for="product in products"
            :key="product.id"
            :ProductData="product"
            @quantity-incremented="handleIncrement"
            @quantity-decremented="handleDecrement"
            @product-removed="handleRemove"
        />
    </section>
</template>

<script>
    import CartItemCard from './common/CartItemCard.vue';
    import CartHeader from './CartHeader.vue';
    import * as service from "../../services/ExercicioOnze/Service.js";

    export default {
        name: "CartSection",
        components: {
            CartItemCard,
            CartHeader
        },
        props: {
            products: {
                type: Array
            }
        },
        methods: {
            handleIncrement(productId) {
                service.addToCart(productId, 1);
            },
            handleDecrement(productId) {
                service.decrementToCart(productId);
            },
            handleRemove(productId) {
                service.removeToCart(productId)
            }
        }
    }
</script>