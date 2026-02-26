<template>
    <v-row>
        <v-col class="d-flex flex-row justify-center pa-2">
            <v-btn
                @click="$emit('show-rules')"
                class="w-33 ms-3"
                variant="tonal"
            >{{ labelSeeRulesButton }}</v-btn>
            <v-btn
                to="/ExercicioDez/Jogo"
                class="w-33 ms-3"
                variant="tonal"
            >{{ labelStartGameButton }}</v-btn>
        </v-col>
    </v-row>
</template>

<script>
    import * as service from "../../services/ExercicioDez/Service.js";

    export default {
        name: "WelcomeActions",
        data() {
            return {
                labelSeeRulesButton: service.getButtonLabels("SEE_RULES"),
                labelStartGameButton: service.getButtonLabels("START_GAME")
            }
        }
    }
</script>