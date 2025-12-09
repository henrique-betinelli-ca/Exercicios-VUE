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
    export default {
        name: "QuizAmountSelect",
        data() {
            return {
                amountOptions: [5, 10],
                chosenAmount: 5,
            }
        },
    }
</script>