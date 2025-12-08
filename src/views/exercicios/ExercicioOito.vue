<template>
    <v-app justify="center">
        <v-row class="d-flex justify-center align-center" style="height: 100vh">
            <v-col cols="12" md="10">
                <component
                    :is="currentComponent"
                    :questionFilters="filterControls"
                    :questionResults="questionResults"
                    :isPlayAgain="isPlayAgain"
                    :isFetchError="isFetchError"
                    @past-quiz-control="receiveControlFilters"
                    @questions-fetch-failed="questionLoadFailed"
                    @game-ended="receiveResults"
                    @play-again-requested="playAgain"
                    @back-home-requested="currentComponent = 'HomeScreen'"
                />
            </v-col>
        </v-row>
    </v-app>
</template>

<script>
    import HomeScreen from "../../components/ExercicioOito/HomeScreen.vue";
    import GameScreem from "../../components/ExercicioOito/GameScreem.vue";
    import ResultsScreen from "../../components/ExercicioOito/ResultsScreen.vue";

    export default {
        name: "ExercicioOito",
        components: {
            HomeScreen,
            GameScreem,
            ResultsScreen,
        },
        data() {
            return {
                filterControls: {},
                currentComponent: "HomeScreen",
                questionResults: [],
                isPlayAgain: false,
                isFetchError: false,
            }
        },
        methods: {
            receiveControlFilters(filters) {
                this.filterControls = filters;

                this.isPlayAgain = false;
                this.isFetchError = false;

                this.currentComponent = "GameScreem";
            },
            questionLoadFailed() {
                this.isFetchError = true;

                this.currentComponent = "HomeScreen";
            },
            receiveResults(results) {
                this.questionResults = results;
                this.isPlayAgain = false;
                
                this.currentComponent = "ResultsScreen";
            },
            playAgain() {
                this.isPlayAgain = true;

                this.currentComponent = 'GameScreem';
            }
        }
    }
</script>