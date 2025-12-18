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
    import * as service from "../../../services/ExercicioOito/Service.js";

    export default {
        name: "QuizTypeSelect",
        data() {
            return {
                typeOptions: service.getTypeOptions(),
                chosenType: null,
            }
        },
    }
</script>