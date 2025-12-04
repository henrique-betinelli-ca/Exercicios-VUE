<template>
    <v-row>
        <v-col class="d-flex flex-column align-center">
            <v-card class="w-75 pa-15">
                <div
                    v-if="questions.length <= 0"
                    class="d-flex flex-column align-center ga-4"
                >
                    <p>loading...</p>
                    <v-progress-circular indeterminate/>
                </div>
                <QuestionCards
                    v-if="questions.length > 0"
                    :currentQuestion="questions[questionIndex]"
                    @question-answer="questionController"
                />
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import QuestionCards from "../../components/ExercicioOito/QuestionCards.vue";

    export default {
        name: "GameScreem",
        components: {
            QuestionCards,
        },
        data() {
            return {
                url: "https://opentdb.com/api.php?",
                questions: [],
                questionIndex: 0,
                answers: [],
            }
        },
        props: {
            questionFilters: {
                type: Object,
            },
            isPlayAgain: {
                type: Boolean,
            }
        },
        watch: {
            questionFilters: {
                handler() {
                    this.getQuestions();
                },
                deep: true,
                immediate: true,
            },
            isPlayAgain: {
                handler(isPlayAgain) {
                    if(isPlayAgain) {
                        this.answers = [];
                        this.questionIndex = 0;
                    }
                },
                deep: true,
                immediate: true,
            }
        },
        methods: {
            queryGenerator() {
                this.url = `https://opentdb.com/api.php?amount=${this.questionFilters.amount}`;

                if(this.questionFilters.category) {
                    this.url += `&category=${this.questionFilters.category}`;
                }

                if(this.questionFilters.difficulty) {
                    this.url += `&difficulty=${this.questionFilters.difficulty}`;
                }

                if(this.questionFilters.type) {
                    this.url += `&type=${this.questionFilters.type}`;
                }

                return this.url;
            },
            async getQuestions() {
                await fetch(this.queryGenerator())
                .then(resp => resp.json())
                .then(data => this.questions = data.results || [])
                .catch(error => {
                    if(error) this.$emit("questions-fetch-failed");
                })

            },
            questionController(answer) {
                this.answers.push(answer);


                if (this.questionIndex < this.questions.length - 1) {
                    this.questionIndex++;
                } else {
                    this.$emit("game-ended", this.answers);
                }
            }
        }
    }
</script>