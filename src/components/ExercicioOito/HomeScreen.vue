<template>
    <v-row>
        <v-col class="d-flex flex-column align-center">
            <v-card class="w-75 pa-15">
                <WelcomeMessage/>
                <QuizControlPanel
                    @quiz-control-past="ReceiveControlFilters"
                    :isFetchError="isFetchError"
                />
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import WelcomeMessage from "./WelcomeMessage.vue";
    import QuizControlPanel from "./QuizControlPanel.vue";

    export default {
        name: "HomeScreen",
        components: {
            QuizControlPanel,
            WelcomeMessage,
        },
        props: {
            isFetchError: {
                type: Boolean,
            }
        },
        methods: {
            ReceiveControlFilters(filters) {
                this.$emit("quiz-control-past", filters);
            }
        }
    }
</script>