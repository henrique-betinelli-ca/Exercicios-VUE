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
    import * as service from "../../services/ExercicioOito/Service.js";

    export default {
        name: "QuestionResult",
        data() {
            return {
                displayResult: false,
                cardResults: null,
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
                        this.setDisplayResult(true);
                        this.loadCard();
                    } 
                }
            }
        },
        methods: {
            closeResult() {
                this.setDisplayResult(false);

                this.$emit("displayed-result");
            },
            loadCard() {
                this.cardResults = {...service.buildResultCard(this.answersResult.isTimeUp, this.answersResult.isCorrectAnswer, this.answersResult.score)};
            },
            setDisplayResult(value) {
                this.displayResult = value;
            }
        }
    }

</script>