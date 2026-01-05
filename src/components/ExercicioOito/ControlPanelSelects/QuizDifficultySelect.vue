<template>
    <v-select
        @update:modelValue="$emit('difficulty-selected', $event)"
        class="w-33"
        label="Difficulty"
        :items="difficultyOptions"
        v-model="chosenDifficulty"
    ></v-select>
</template>

<script>
    import * as service from "../../../services/ExercicioOito/Service.js";

    export default {
        name: "QuizDifficultySelect",
        data() {
            return {
                difficultyOptions: service.getDifficultyOptions(),
                chosenDifficulty: null,
            }
        },
    }
</script>