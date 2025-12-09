<template>
    <v-row class="d-flex flex-column align-center">
        <v-col>
            <QuizCategorySelect
                @category-selected="filterControls.category = $event"
                @category-data-fetch-failed="
                feedbackAlert(
                    'Failed to fetch categories.',
                    'An error occurred while fetching the categories. To continue, the random mode has been selected.',
                    'error'
                )"
            />
        </v-col>

        <v-col class="d-flex flex-row align-center ga-xl-3">
            <QuizDifficultySelect
                @difficulty-selected="filterControls.difficulty = $event"
            />
            
            <QuizTypeSelect
                @type-selected="filterControls.type = $event"
            />

            <QuizAmountSelect
                @amount-selected="filterControls.amount = $event"
            />
        </v-col>

        <v-col cols="12" class="d-flex flex-column align-center">
            <v-btn 
                @click="$emit('quiz-control-past', this.filterControls)"
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
    import QuizCategorySelect from "./ControlPanelSelects/QuizCategorySelect.vue";
    import QuizDifficultySelect from "./ControlPanelSelects/QuizDifficultySelect.vue";
    import QuizTypeSelect from "./ControlPanelSelects/QuizTypeSelect.vue";
    import QuizAmountSelect from "./ControlPanelSelects/QuizAmountSelect.vue";

    const FILTER_CONTROLS = {
        category: null,
        difficulty: null,
        type: null,
        amount: 5,
    }

    export default {
        name: "QuizControlPanel",
        components: {
            QuizCategorySelect,
            QuizDifficultySelect,
            QuizTypeSelect,
            QuizAmountSelect
        },
        data() {
            return {
                alertReturn: {
                    title: "",
                    message: "",
                    status: false,
                    type: "info"
                },
                filterControls: { ...FILTER_CONTROLS },
                chosenDifficulty: null,
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
            feedbackAlert(title, message, type) {
                this.alertReturn = {title, message, status: true, type};

                setTimeout(() => this.alertReturn.status = false, 10000);
            },
        }
    }
</script>