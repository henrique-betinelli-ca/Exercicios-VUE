<template>
    <v-dialog
      v-model="displayResult"
      width="auto"
    >
        <v-card 
            width="400"
            height="200"
        >
            <v-card-title>
                <v-icon class="me-2">{{ cardResults.icon }}</v-icon>
                {{ cardResults.title }}
            </v-card-title>

            <v-card-text>
                <p>{{ cardResults.message }}</p>
                <strong>+ {{ cardResults.score }} points</strong>
            </v-card-text>

            <template v-slot:actions>
                <v-btn
                    class="ms-auto"
                    @click="closeResult"
                >Next</v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>

<script>

    export default {
        name: "QuestionResult",
        data() {
            return {
                displayResult: false,
                cardResults: {
                    icon: "",
                    title: "",
                    message: "",
                    score: null,
                }
            }
        },
        props: {
            answersResult: {
                type: Object
            }
        },
        watch: {
            answersResult: {
                handler(Result) {
                    if(Result){
                        this.displayResult = true;
                        this.loadCard();
                    } 
                }
            }
        },
        methods: {
            closeResult() {
                this.displayResult = false;

                this.$emit("displayed-result");
            },
            loadCard() {
                if(this.answersResult.isTimeUp) {
                    this.cardResults.icon = "mdi-close-circle";
                    this.cardResults.title = "Time Expired";
                    this.cardResults.message = "Unfortunately, the time limit has been reached.";

                } else {
                    if(this.answersResult.isCorrectAnswer) {
                        this.cardResults.icon = "mdi-check-circle";
                        this.cardResults.title = "Correct";
                        this.cardResults.message = "Congratulations! You got it right!";

                    } else {
                        this.cardResults.icon = "mdi-close-circle";
                        this.cardResults.title = "Incorrect";
                        this.cardResults.message = "You almost got it!";
                    }
                }

                this.cardResults.score = this.answersResult.score;
            }
        }
    }

</script>