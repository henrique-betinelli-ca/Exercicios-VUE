<template>
    <v-app>
        <v-row class="d-flex justify-center align-center">
            <v-col class="d-flex flex-column align-center">
                <v-card class="w-50 pa-15 elevation-24" >
                    <WelcomeMessage/>
                    <WelcomeActions
                        @show-rules="showRules = true"
                    />
                    <RulesDialog
                        :showRules="showRules"
                        @rules-closed="showRules = false"
                    />
                </v-card>
            </v-col>
        </v-row>
    </v-app>
</template>

<script>
    import WelcomeMessage from "../../components/ExercicioDez/WelcomeMessage.vue";
    import WelcomeActions from "../../components/ExercicioDez/WelcomeActions.vue";
    import RulesDialog from "../../components/ExercicioDez/RulesDialog.vue";

    export default {
        name: "ExercicioDez",
        components: {
            WelcomeMessage,
            WelcomeActions,
            RulesDialog
        },
        data() {
            return {
                showRules: false
            }
        }
    }
</script>