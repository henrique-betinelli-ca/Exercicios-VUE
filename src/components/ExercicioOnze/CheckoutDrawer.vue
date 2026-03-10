<template>
    <v-navigation-drawer
        :model-value="isCheckoutOpen"
        class="d-flex flex-column fill-height"
        location="right"
        width="500"
        temporary
    >
        <CheckoutProductsList/>
        <CouponImput
            @coupon-applied="handleCoupon"
        />
        <CheckoutSumary
            @purchase-completed="handlePurchaseCompleted"
            :coupon="coupon"
        />
    </v-navigation-drawer>
</template>

<script>
    import CheckoutProductsList from "./CheckoutProductsList.vue";
    import CouponImput from "./CouponImput.vue";
    import CheckoutSumary from "./CheckoutSumary.vue";
    
    export default {
        name: "CheckoutDrawer",
        components: {
            CheckoutProductsList,
            CouponImput,
            CheckoutSumary
        },
        props: {
            isCheckoutOpen: {
                type: Boolean
            }
        },
        data() {
            return {
                coupon: null
            }
        },
        methods: {
            handleCoupon(value) {
                this.coupon = value;
            },
            handlePurchaseCompleted() {
                this.$emit('purchase-completed')
            }
        }
    }
</script>