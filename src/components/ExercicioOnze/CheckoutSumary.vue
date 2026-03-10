<template>
    <v-divider class="ma-4 mt-8"></v-divider>
    <h3 class="ma-5">{{ sectionTitles.summary }}</h3>
    <v-row class="ml-4 mr-4">
        <v-col><p>{{ sectionTitles.subtotal }}</p></v-col>
        <v-col class="text-right">
            <p>{{ utilityTexts.currencySymbol + summary.subtotal }}</p>
        </v-col>
    </v-row>
    <v-row class="ml-4 mr-4">
        <v-col><p>{{ sectionTitles.shipping }}</p></v-col>
        <v-col class="text-right">
            <p>{{ utilityTexts.currencySymbol + summary.shipping }}</p>
        </v-col>
    </v-row>
    <v-row class="ml-4 mr-4">
        <v-col><p>{{ sectionTitles.discount }}</p></v-col>
        <v-col class="text-right">
            <p>{{ utilityTexts.less + utilityTexts.currencySymbol + summary.discount }}</p>
        </v-col>
    </v-row>
    <v-row class="ml-4 mr-4">
        <v-col><p><strong>{{ sectionTitles.total }}</strong></p></v-col>
        <v-col class="text-right">
            <p><strong>{{ utilityTexts.currencySymbol + summary.total  }}</strong></p>
        </v-col>
    </v-row>
    <v-row class="ma-4 mt-10">
        <v-col>
            <v-btn
                class="w-100"
                color="light-green-darken-4"
                @click="finishPurchase"
            >{{ buttonLabels.placeOrder }}</v-btn>
        </v-col>
    </v-row>
</template>

<script>
    import * as service from "../../services/ExercicioOnze/Service.js";

    export default {
        name: "CheckoutSumary",
        props: {
            coupon: {
                type: String
            }
        },
        computed: {
            sectionTitles() {
                return service.getSectionTitles()
            },
            buttonLabels() {
                return service.getButtonLabels();
            },
            utilityTexts() {
                return service.getUtilityTexts();
            },
            summary() {
                return {
                    subtotal: service.calculateSalesSum().toFixed(2),
                    shipping: service.calculateShipping(),
                    total: service.calculateTotal(this.coupon).toFixed(2),
                    discount: service.calculateCoupon(this.coupon) == service.getCoupons().invalid? 0 : service.calculateCoupon(this.coupon).toFixed(2)
                }
            }
        },
        methods: {
            finishPurchase() {
                this.$emit('purchase-completed');
            }
        }
    }
</script>