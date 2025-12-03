<template>
    <v-row>
        <v-col class="d-flex flex-column align-center">
            <v-card class="w-75 pa-15">
                <WelcomeMessage/>
                <QuizControlPanel
                    @past-quiz-control="ReceiveControlFilters"
                />
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import WelcomeMessage from "./WelcomeMessage.vue";
import QuizControlPanel from "./QuizControlPanel.vue";

export default {
    name: 'HomeScreen',
    components: {
        QuizControlPanel,
        WelcomeMessage,
    },
    methods: {
        ReceiveControlFilters(filters) {
            this.$emit("past-quiz-control", filters);
        }
    }
}
</script>