<template>
    <v-row class="d-flex flex-column justify-center align-center text-center">
        <v-col>
            <h1>Quiz Completed!</h1>
            <p>You have reached the end of the challenge! Check your score below and see how you performed.</p>
        </v-col>
        <v-col>
            <h3>Score: {{ totalResults.score }} points</h3>
            <h3>Time: {{ totalResults.time }} s</h3>
        </v-col>
    </v-row>
</template>

<script>

    export default {
        name: "ScoreResult",
        props: {
            totalResults: {
                type: Object,
            }
        }
    }
</script>