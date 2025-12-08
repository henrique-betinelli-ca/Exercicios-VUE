<template>
    <v-row class="d-flex flex-column align-center">
        <v-col>
            <v-select
                @update:menu="getCategories"
                label="category"
                item-title="name"
                item-value="id"
                :items="categoriesOptions"
                v-model="chosenCategory"
                v-model:menu="categoryMenuOpen"
            >
                <template #no-data>
                    <div class="pa-4">
                        loading...
                    </div>
                </template>
            </v-select>
        </v-col>

        <v-col class="d-flex flex-row align-center ga-xl-3">
            <v-select
                class="w-33"
                label="Difficulty"
                :items="difficultyOptions"
                v-model="chosenDifficulty"
            ></v-select>
        
            <v-select
                class="w-33"
                label="Type"
                :items="typeOptions"
                v-model="chosenType"
            ></v-select>

            <v-select
                class="w-33"
                label="Number of questions"
                :items="amountOptions"
                v-model="chosenAmount"
            ></v-select>
        </v-col>

        <v-col cols="12" class="d-flex flex-column align-center">
            <v-btn 
                @click="playQuiz"
                class="w-100"
                variant="tonal"
            >Start Quiz</v-btn>
            <v-alert
                v-show="alertReturn.status"
                class="mt-8 w-100"
                :text="alertReturn.message"
                :title="alertReturn.title"
                :type="alertReturn.type"
                variant="tonal"
            ></v-alert>
        </v-col>
    </v-row>
</template>

<script>
    const FILTER_CONTROLS = {
        category: "",
        difficulty: "",
        type: "",
        amount: "",
    }

    export default {
        name: "QuizControlPanel",
        data() {
            return {
                alertReturn: {
                    title: "",
                    message: "",
                    status: false,
                    type: "info"
                },
                difficultyOptions: [
                    "easy",
                    "medium",
                    "hard"
                ],
                typeOptions: [
                    "multiple",
                    "boolean"
                ],
                filterControls: { ...FILTER_CONTROLS },
                categoriesOptions: [],
                amountOptions: [5, 10],
                chosenAmount: 5,
                chosenCategory: null,
                chosenDifficulty: null,
                chosenType: null,
                categoryMenuOpen: false,
            }
        },
        props: {
            isFetchError: {
                type: Boolean
            }
        },
        watch: {
           isFetchError: {
            handler(isFetchError) {
                if(isFetchError) this.feedbackAlert("Failed to fetch questions.", "An error occurred while fetching the questions. Please try again later.", "error");
            }
           } 
        },
        methods: {
            async getCategories() {
                try {
                    const resp = await fetch("https://opentdb.com/api_category.php");
                    const data = await resp.json();
                    
                    this.categoriesOptions = data.trivia_categories;
                } catch {
                    this.feedbackAlert("Failed to fetch categories.", "An error occurred while fetching the categories. To continue, the random mode has been selected.", "error");
                
                    this.categoryMenuOpen = false;
                }
            },

            playQuiz() {

                this.filterControls = {
                    category: this.chosenCategory,
                    difficulty: this.chosenDifficulty, 
                    type: this.chosenType,
                    amount:  this.chosenAmount,
                };

                this.$emit("past-quiz-control", this.filterControls);
            },

            feedbackAlert(title, message, type) {
                this.alertReturn = {title, message, status: true, type};

                setTimeout(() => this.alertReturn.status = false, 10000);
            }
        }
    }
</script>