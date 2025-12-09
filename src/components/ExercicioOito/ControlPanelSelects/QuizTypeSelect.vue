<template>
    <v-select
            @update:modelValue="$emit('type-selected', $event)"
            class="w-33"
            label="Type"
            :items="typeOptions"
            v-model="chosenType"
    ></v-select>
</template>

<script>
    export default {
        name: "QuizTypeSelect",
        data() {
            return {
                typeOptions: [
                    "multiple",
                    "boolean"
                ],
                chosenType: null,
            }
        },
    }
</script>