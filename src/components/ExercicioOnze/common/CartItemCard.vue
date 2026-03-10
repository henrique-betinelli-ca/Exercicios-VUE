<template>
    <v-card class="ma-5 d-flex flex-row">
        <v-card-text class="pt-4">
            <h3>{{ ProductData.name }}</h3>
            <p>{{ price }}</p>
        </v-card-text>
        <v-card-actions>
            <div>
                <v-btn
                    icon="mdi-minus"
                    @click="decrement"
                />
                <span>{{ ProductData.quantity }}</span>
                <v-btn
                    icon="mdi-plus"
                    @click="increment"
                />
            </div>
        </v-card-actions>
  </v-card>
</template>

<script>
    import * as service from "../../../services/ExercicioOnze/Service.js";

    export default {
        name: "CartItemCard",
        props: {
            ProductData: {
                type: Object
            }
        },
        computed: {
            price() {
                return service.calculatePrice(this.ProductData.price, this.ProductData.quantity).toFixed(2);
            }
        },
        methods: {
            increment() {
                this.$emit('quantity-incremented', this.ProductData.id);
            },
            decrement() {
                if(this.ProductData.quantity > 1) {
                    this.$emit('quantity-decremented', this.ProductData.id);
                    return;
                }
                this.$emit('product-removed', this.ProductData.id);
            }
        }
    }
</script>