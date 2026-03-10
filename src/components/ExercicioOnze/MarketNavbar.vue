<template>
    <v-app-bar>
        <v-toolbar-title>{{ utilityTexts.marketName }}</v-toolbar-title>
        <v-btn 
            class="mr-4"
            @click="showCart"
        >
            <v-badge 
                floating 
                location="top right" 
                color="light-green-darken-4" 
                :content="totalItems"
            >
                <v-icon icon="mdi-cart"></v-icon>
            </v-badge>
        </v-btn>
    </v-app-bar>
</template>

<script>
    import * as service from "../../services/ExercicioOnze/Service.js";

    export default {
        name: "MarketNavbar",
        computed: {
            utilityTexts() {
                return service.getUtilityTexts();
            },
            totalItems() {
                return  service.cartItemCount();
            }
        },
        methods: {
            showCart() {
                this.$emit('cart-toggled');
            }
        }
    }
</script>