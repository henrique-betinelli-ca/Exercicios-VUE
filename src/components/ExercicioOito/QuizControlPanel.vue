<template>
    <v-row class="d-flex flex-column align-center">
        <v-col>
            <QuizCategorySelect
                @category-selected="filterControls.category = $event"
                @category-data-fetch-failed="categoryDataFetchFailed"
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
    import * as service from "../../services/ExercicioOito/Service.js";
    import QuizCategorySelect from "./ControlPanelSelects/QuizCategorySelect.vue";
    import QuizDifficultySelect from "./ControlPanelSelects/QuizDifficultySelect.vue";
    import QuizTypeSelect from "./ControlPanelSelects/QuizTypeSelect.vue";
    import QuizAmountSelect from "./ControlPanelSelects/QuizAmountSelect.vue";

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
                filterControls: service.getFilterControls(),
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
                if(isFetchError) this.feedbackAlert(service.getFeedbackAlertMesseges().ERROR_FETCHING_QUESTIONS);
            }
           } 
        },
        methods: {
            categoryDataFetchFailed() {
                this.feedbackAlert(service.getFeedbackAlertMesseges().ERROR_FETCHING_CATEGORIES);
            },
            feedbackAlert(alert) {
                this.alertReturn = {
                    title: alert.title,
                    message: alert.message,
                    type: alert.type,
                    status: true
                };

                setTimeout(() => this.alertReturn.status = false, 10000);
            },
        }
    }
</script>