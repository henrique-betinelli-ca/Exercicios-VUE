<template>
    <v-row>
        <v-col class="d-flex flex-column align-center">
            <v-card class="w-75 pa-15">
                <ScoreResult
                    :totalResults="totalResults"
                />
                <FinalSteps
                    @back-home-requested="$emit('back-home-requested')"
                    @play-again-requested="$emit('play-again-requested')"
                />
                <DisplayQuestions
                    :completedQuestions="completedQuestions"
                    @questions-for-display-requested="prepareQuestionsForDisplay"
                />
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import ScoreResult from "../../components/ExercicioOito/ScoreResult.vue";
    import FinalSteps from "../../components/ExercicioOito/FinalSteps.vue";
    import DisplayQuestions from "../../components/ExercicioOito/DisplayQuestions.vue";

    export default {
        name: "ResultsScreen",
        components: {
            ScoreResult,
            FinalSteps,
            DisplayQuestions,
        },
        data() {
            return {
                totalResults: {
                    score: 0,
                    time: 0,
                },
                completedQuestions: [],
            }
        },
        props: {
            questionResults: {
                type: Array,
            },
            isPlayAgain: {
                type: Boolean,
            }
        },
        watch: {
            questionResults: {
                handler() {
                    this.calculateFinalScore();
                },
                deep: true,
                immediate: true
            }
        },
        methods: {
            calculateFinalScore() {
                this.totalResults.score = this.questionResults.reduce((sum, result) => sum + result.score, 0);

                this.totalResults.time = this.questionResults.reduce((sum, result) => sum + result.timeSpent, 0);
            },
            prepareQuestionsForDisplay() {
                this.completedQuestions = this.questionResults.map(question => ({
                    question: question.question,
                    isCorrectAnswer: question.isCorrectAnswer,
                    answer: question.answer,
                    allAnswers: question.allAnswers,
                }));
            }
        }
    }
</script>