<template>
    <v-btn 
        :to="to"
        class="w-33 ms-3"
        variant="tonal"
    >{{ label }}</v-btn>
</template>

<script>
    export default {
        name: "RouteButton",
        props: {
            to: {
                type: String
            },
            label: {
                type: String
            }
        }
    }
</script>