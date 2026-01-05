<template>
    <v-row class="mt-9">
        <v-col class="d-flex justify-center align-center mt-auto ga-4">
            <v-btn
                @click="$emit('play-again-requested')"
                variant="tonal"
                width="150"
            >Play Again</v-btn>
            <v-btn
                @click="$emit('back-home-requested')"
                variant="tonal"
                width="150"
            >Change Settings</v-btn>
        </v-col>
    </v-row>
</template>

<script>

    export default {
        name: "FinalSteps",
    }
</script>