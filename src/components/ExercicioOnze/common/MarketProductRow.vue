<template>
    <section class="d-flex pa-14">
        <MarketProductCard
            v-for="product in productList"
            :key="product.id"
            :ProductData="product"
            @product-selected="handleAdd"
        />
    </section>
</template>

<script>
    import MarketProductCard from './MarketProductCard.vue';
    import * as service from "../../../services/ExercicioOnze/Service.js";
  
    export default {
        name: "MarketProductRow",
        components: {
            MarketProductCard
        },
        props: {
            productList: {
                type: Array
            }
        },
        methods: {
            handleAdd(productId, productQuantity) {
                service.addToCart(productId, productQuantity);
            }
        }
    }
</script>