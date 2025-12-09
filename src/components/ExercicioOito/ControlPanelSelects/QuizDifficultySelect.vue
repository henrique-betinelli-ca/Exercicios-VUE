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
    export default {
        name: "QuizDifficultySelect",
        data() {
            return {
                difficultyOptions: [
                    "easy",
                    "medium",
                    "hard"
                ],
                chosenDifficulty: null,
            }
        },
    }
</script>