<template>
    <v-select
        @update:menu="takeCategories"
        @update:modelValue="$emit('category-selected', $event)"
        label="category"
        item-title="name"
        item-value="id"
        :items="categoriesOptions"
        v-model="chosenCategory"
    >
        <template #no-data>
            <div class="pa-4">
                loading...
            </div>
        </template>
    </v-select>
</template>

<script>
    import * as service from "../../../services/ExercicioOito/Service.js";

    export default {
        name: "QuizCategorySelect",
        data() {
            return {
                categoriesOptions: [],
                chosenCategory: null,
            }
        },
        methods: {
            async takeCategories() {
                try {
                    this.categoriesOptions = await service.getCategories();
                } catch {
                    this.$emit("category-data-fetch-failed");
                }
            }
        }
    }
</script>