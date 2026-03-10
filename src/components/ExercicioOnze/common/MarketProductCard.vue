<template>
    <v-card class="w-25 ma-5 d-flex flex-column">
        <v-img
            height="230px"
            color="light-green-lighten-1"
            :src="ProductData.photo"
        />
        <v-card-title class="pt-4">
            <h2>{{ ProductData.name }}</h2>
        </v-card-title>

        <v-card-text>
            <h2 class="product-price mb-2">{{ utilityTexts.currencySymbol + ProductData.price }}</h2>
            <p>{{ utilityTexts.productStock + ProductData.availableQuantity }}</p>
        </v-card-text>

        <v-card-actions class="d-flex flex-column">
            <div class="d-flex align-center justify-center mb-3">
                <v-btn
                    icon="mdi-minus"
                    @click="decrement"
                />
                <span class="mx-4 text-h6">{{ amount }}</span>
                <v-btn
                    icon="mdi-plus"
                    @click="increment"
                />
            </div>
            <v-btn 
                class="w-100"
                color="light-green-darken-4" 
                variant="flat"
                :disabled="!ProductData.availableQuantity"
                @click="addProduct"
            >{{ buttonLabels.add }}</v-btn>
        </v-card-actions>
  </v-card>
</template>

<script>
    import * as service from "../../../services/ExercicioOnze/Service.js";

    export default {
        name: "MarketProductCard",
        props: {
            ProductData: {
                type: Object
            }
        },
        data() {
            return {
                amount: 1,
            }
        },
        computed: {
            utilityTexts() {
                return service.getUtilityTexts();
            },
            buttonLabels() {
                return service.getButtonLabels();
            }
        },
        methods: {
            increment() {
                if(this.ProductData.availableQuantity > this.amount) {
                    this.amount++;
                }
            },
            decrement() {
                if(this.amount > 1) {
                    this.amount--;
                }
            },
            addProduct() {
                this.$emit('product-selected', this.ProductData.id, this.amount);
                this.resetAmount();
            },
            resetAmount() {
                this.amount = 1;
            }
        }
    }
</script>

<style scoped>
    .product-price{
        color: #1B5E20;
    }
</style>