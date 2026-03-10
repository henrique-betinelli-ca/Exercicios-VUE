<template>
    <div class="pa-11">
        <v-btn
            class="w-100"
            color="light-green-darken-4"
            @click="finishPurchase"
        >{{ buttonLabels.proceedToCheckout }}</v-btn>
    </div>
</template>

<script>
    import * as service from "../../services/ExercicioOnze/Service.js";

    export default {
        name: "CheckoutButton",
        computed: {
            buttonLabels() {
                return service.getButtonLabels();
            }
        },
        methods: {
            finishPurchase() {
                this.$emit('checkout-requested');
            }
        }
    }
</script>