<template>
    <v-dialog :model-value="isGameOver" @update:model-value="handleClose" width="450">
        <v-card class="d-flex flex-column align-center pa-6 text-center">
            <v-card-title>
                <h2>{{ gameOverTitle }}</h2>
            </v-card-title>
            <v-card-text>
                <h3>{{ winner }}</h3>
            </v-card-text>
            <v-card-actions class="mt-3">
                <v-btn
                    class="ms-auto"
                    @click="$emit('restart-requested')"
                    variant="tonal"
                >{{ labelPlayAgainButton }}</v-btn>
                <v-btn
                    class="ms-auto"
                    to="/ExercicioDez"
                    variant="tonal"
                >{{ labelBackToHomeButton }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import * as service from "../../services/ExercicioDez/Service.js";

    export default {
        name: "GameOverDialog",
        props: {
            isGameOver: {
                type: Boolean
            },
            winner: {
                type: String
            }
        },
        data() {
            return {
                gameOverTitle: service.getGameOverTitle(),
                labelPlayAgainButton: service.getButtonLabels("PLAY_AGAIN"),
                labelBackToHomeButton: service.getButtonLabels("BACK_TO_HOME")
            }
        },
        methods: {
            handleClose() {
                this.$emit('restart-requested')
            }
        }
    }
</script>