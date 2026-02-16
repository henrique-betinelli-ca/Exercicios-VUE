<template>
    <v-col class="d-flex flex-column align-center mb-12 pa-2">
        <h1>{{ welcomeMessage.TITLE }}</h1>
        <p>{{ welcomeMessage.FIRST_MESSAGE }}</p>
        <p>{{ welcomeMessage.SECOND_MESSAGE }}</p>
    </v-col>
</template>

<script>
import * as service from "../../services/ExercicioNove/Service.js";

    export default {
        name: "WelcomeMessage",
        data() {
            return {
               welcomeMessage: service.getWelcomeMessage()
            }
        },
    }
</script>