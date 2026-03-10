<template>
    <section class="d-flex justify-md-space-between">
        <v-badge
            class="mb-5"
            color="light-green-darken-4"
            :content="totalItems"
            location="right center" 
            :offset-x="-20"
        >
            <h2>{{ sectionTitles.cart }}</h2>
        </v-badge>
        <h3>{{ utilityTexts.currencySymbol + totalSum }}</h3>
    </section>
</template>

<script>
    import * as service from "../../services/ExercicioOnze/Service.js";

    export default {
        name: "CartHeader",
        computed: {
            sectionTitles() {
                return service.getSectionTitles()
            },
            utilityTexts() {
                return service.getUtilityTexts();
            },
            totalItems() {
                return  service.cartItemCount();
            },
            totalSum() {
                return service.calculateSalesSum().toFixed(2);
            }
        }
    }
</script>