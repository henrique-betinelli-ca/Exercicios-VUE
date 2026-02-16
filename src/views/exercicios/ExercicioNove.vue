<template>
    <v-app>
        <v-row class="d-flex justify-center align-center">
            <v-col class="d-flex flex-column align-center">
                <v-card class="w-50 pa-15 elevation-24" >
                    <WelcomeMessage/>
                    <ModeSelector/>
                </v-card>
            </v-col>
        </v-row>
    </v-app>
</template>

<script>
    import WelcomeMessage from "../../components/ExercicioNove/WelcomeMessage.vue";
    import ModeSelector from "../../components/ExercicioNove/common/ModeSelector.vue";

    export default {
        name: "ExercicioNove",
        components: {
            WelcomeMessage,
            ModeSelector
        }
    }
</script>