<template>
    <v-col class="d-flex flex-column align-center mb-12 pa-2 text-center">
        <h2 class="mb-4">Vez de: {{ currentPlayer }}</h2>
        <div class="d-flex flex-wrap justify-center" style="max-width: 330px;">
            <v-btn
                v-for="(icon, index) in board"
                :key="index"
                class="ma-1 text-h4"
                width="100"
                height="100"
                variant="tonal"
                @click="$emit('played', index)"
            >{{ icon }}</v-btn>
        </div>
    </v-col>
</template>

<script>
    export default {
        name: "GameScreem",
        props: {
            board: {
                type: Array
            },
            currentPlayer: {
                type: String
            }
        }
    }
</script>