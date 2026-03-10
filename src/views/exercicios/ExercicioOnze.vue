<template>
    <v-app>
        <MarketNavbar
            @cart-toggled="isCartOpen = !isCartOpen"
        />
        <v-main>
            <ProductRow
                :productList="firstProducts"
            />
            <ProductRow
                :productList="secondProducts"
            />
            <ShoppingCart
                v-model:isCartOpen="isCartOpen"
                @checkout-requested="handleCheckoutRequested"
            />
            <CheckoutSection
                v-model:isCheckoutOpen="isCheckoutOpen"
                @purchase-completed="handlePurchaseCompleted"
            />
        </v-main>
    </v-app>
</template>

<script>
    import ProductRow from "../../components/ExercicioOnze/common/MarketProductRow.vue";
    import MarketNavbar from "../../components/ExercicioOnze/MarketNavbar.vue";
    import ShoppingCart from "../../components/ExercicioOnze/ShoppingCartDrawer.vue";
    import CheckoutSection from "../../components/ExercicioOnze/CheckoutDrawer.vue";
    import * as service from "../../services/ExercicioOnze/Service.js";

    export default {
        name: "ExercicioOnze",
        components: {
            MarketNavbar,
            ProductRow,
            ShoppingCart,
            CheckoutSection
        },
        data() {
            return {
                isCartOpen: false,
                isCheckoutOpen: false
            }
        },
        computed: {
            firstProducts() {
                return service.getProductsSlice(0, 5);
            },
            secondProducts() {
                return service.getProductsSlice(5, 9);
            }
        },
        methods: {
            handleCheckoutRequested() {
                this.setIsCheckoutOpen(true);
                this.setIsCartOpen(false);
            },
            handlePurchaseCompleted() {
                this.setIsCheckoutOpen(false);
                this.setIsCartOpen(false);
                service.resetCart();
            },
            setIsCheckoutOpen(value) {
                this.isCheckoutOpen = value;
            },
            setIsCartOpen(value) {
                this.isCartOpen = value;
            }
        }
    }
</script>