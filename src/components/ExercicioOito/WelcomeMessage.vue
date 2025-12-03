<template>
    <v-row class="d-flex flex-column align-center" style="max-height: 600px;">
        <v-col>
            <h1>Mind Smash</h1>
        </v-col>
        <v-col>
            <h3>Welcome to the Random Questions Quiz!</h3>
            <p>Choose your preferences, test your knowledge, and aim for the highest score possible. Each round is unique, with questions generated directly from the Open Trivia DB. Configure your game and enjoy the challenge!</p>
        </v-col>
        <v-col>
            <v-divider :thickness="3"></v-divider>
        </v-col>
    </v-row>
</template>

<script>

export default {
    name: "WelcomeMessage",
}
</script>