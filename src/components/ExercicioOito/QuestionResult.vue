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
                cardResults: {
                    icon: "",
                    title: "",
                    message: "",
                    score: null,
                },
            }
        },
        props: {
            answersResult: {
                type: Object
            }
        },
        watch: {
            answersResult: {
                handler(result) {
                    if(result){
                        this.loadCard(service.buildResultCard(this.answersResult.isTimeUp, this.answersResult.isCorrectAnswer));
                        this.setDisplayResult(true);
                    } 
                }
            }
        },
        methods: {
            closeResult() {
                this.setDisplayResult(false);

                this.$emit("displayed-result");
            },
            loadCard(cardData) {
                this.cardResults = {
                    icon: cardData.ICON,
                    title: cardData.TITLE,
                    message: cardData.MESSAGE,
                    score: this.answersResult.score,
                };
            },
            setDisplayResult(value) {
                this.displayResult = value;
            }
        }
    }

</script>