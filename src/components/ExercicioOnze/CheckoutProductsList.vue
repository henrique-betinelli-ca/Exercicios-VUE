<template>
    <h2 class="ma-4">{{ sectionTitles.placeOrder }}</h2>
    <v-divider class="ma-4 mt-8"></v-divider>
    <h3 class="ml-5">{{ sectionTitles.products }}</h3>
    <v-list density="compact">
        <v-list-item
            class="ml-4 mr-4"
            v-for="item in cart"
            :key="item.id"
        >
            <v-row>
                <v-col>
                    <p>{{ item.quantity + utilityTexts.quantity + item.name }}</p>
                </v-col>

                <v-col class="text-right">
                    <p><strong>{{ utilityTexts.currencySymbol + price(item) }}</strong></p>
                </v-col>
            </v-row>
        </v-list-item>
    </v-list>
</template>

<script>
    import * as service from "../../services/ExercicioOnze/Service.js";

    export default {
        name: "CheckoutProductsList",
        computed: {
            sectionTitles() {
                return service.getSectionTitles()
            },
            utilityTexts() {
                return service.getUtilityTexts();
            },
            cart() {
                return service.state.cart;
            },
        },
        methods: {
            price(item) {
                return service.calculatePrice(item.price, item.quantity).toFixed(2);
            }
        }
    }
</script>