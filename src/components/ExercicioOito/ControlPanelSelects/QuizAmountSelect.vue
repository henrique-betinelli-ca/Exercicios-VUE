<template>
    <v-select
        @update:modelValue="$emit('amount-selected', $event)"
        class="w-33"
        label="Number of questions"
        :items="amountOptions"
        v-model="chosenAmount"
    ></v-select>
</template>

<script>
    import * as service from "../../../services/ExercicioOito/Service.js";

    export default {
        name: "QuizAmountSelect",
        data() {
            return {
                amountOptions: service.getAmountOptions(),
                chosenAmount: 5,
            }
        },
    }
</script>