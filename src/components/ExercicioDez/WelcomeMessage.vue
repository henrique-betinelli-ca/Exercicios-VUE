<template>
    <v-col class="d-flex flex-column align-center mb-12 pa-2 text-center">
        <h1>{{ welcomeMessage.TITLE }}</h1>
        <p>{{ welcomeMessage.TEXT }}</p>
    </v-col>
</template>

<script>
    import * as service from "../../services/ExercicioDez/Service.js";

    export default {
        name: "WelcomeMessage",
        data() {
            return {
                welcomeMessage: service.getWelcomeMessage()
            }
        },
    }
</script>