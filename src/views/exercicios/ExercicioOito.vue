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
                    @quiz-control-past="receiveControlFilters"
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
    import * as service from "../../services/ExercicioOito/Service.js";
    import HomeScreen from "../../components/ExercicioOito/HomeScreen.vue";
    import GameScreen from "../../components/ExercicioOito/GameScreen.vue";
    import ResultsScreen from "../../components/ExercicioOito/ResultsScreen.vue";

    export default {
        name: "ExercicioOito",
        components: {
            HomeScreen,
            GameScreen,
            ResultsScreen,
        },
        data() {
            return {
                filterControls: {},
                currentComponent: service.getScreens().HomeScreen,
                questionResults: [],
                isPlayAgain: false,
                isFetchError: false,
            }
        },
        methods: {
            receiveControlFilters(filters) {
                this.filterControls = filters;

                this.setIsPlayAgain(false);
                this.setIsFetchError(false);

                this.currentComponent = service.getScreens().GameScreen;
            },
            questionLoadFailed() {
                this.setIsFetchError(true);

                this.currentComponent = service.getScreens().HomeScreen;
            },
            receiveResults(results) {
                this.questionResults = results;
                this.setIsPlayAgain(false);
                
                this.currentComponent = service.getScreens().ResultsScreen;
            },
            playAgain() {
                this.setIsPlayAgain(true);

                this.currentComponent = service.getScreens().GameScreen;
            },
            setIsPlayAgain(value) {
                this.isPlayAgain = value;
            },
            setIsFetchError(value) {
                this.isFetchError = value;
            },
        }
    }
</script>