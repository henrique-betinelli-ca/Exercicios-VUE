<template>
    <v-app justify="center">
        <v-row class="d-flex justify-center align-center" style="height: 100vh">
            <v-col cols="12" md="10">
                <component
                    :is="currentComponent"
                    :questionFilters="filterControls"
                    :questionResults="questionResults"
                    @past-quiz-control="receiveControlFilters"
                    @game-ended="receiveResults"
                />
            </v-col>
        </v-row>
    </v-app>
</template>

<script>
import HomeScreen from '../../components/ExercicioOito/HomeScreen.vue';
import GameScreem from "../../components/ExercicioOito/GameScreem.vue";
import ResultsScreen from "../../components/ExercicioOito/ResultsScreen.vue";
export default {
    name: 'ExercicioOito',
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
        }
    },
    methods: {
        receiveControlFilters(filters) {
            this.filterControls = filters;
            this.currentComponent = "GameScreem";
        },
        receiveResults(results) {
            this.currentComponent = "ResultsScreen";

            this.questionResults = results;
        }
    }
}
</script>