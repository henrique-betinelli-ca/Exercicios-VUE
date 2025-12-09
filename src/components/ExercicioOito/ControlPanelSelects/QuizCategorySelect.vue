<template>
    <v-select
        @update:menu="getCategories"
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
    export default {
        name: "QuizCategorySelect",
        data() {
            return {
                categoriesOptions: [],
                chosenCategory: null,
            }
        },
        methods: {
            async getCategories() {
                try {
                    const resp = await fetch("https://opentdb.com/api_category.php");
                    const data = await resp.json();
                    
                    this.categoriesOptions = data.trivia_categories;
                } catch {
                    this.$emit("category-data-fetch-failed")
                }
            }
        }
    }
</script>