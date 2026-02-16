<template>
    <v-row>
        <v-col class="d-flex flex-row justify-center pa-2">
            <RouteButton 
                v-for="route in searchRoutes"
                :key="route.TO"
                :to="route.TO"
                :label="route.LABEL"
            />
        </v-col>
    </v-row>
</template>

<script>
    import RouteButton from "./RouteButton.vue";
    import * as service from "../../../services/ExercicioNove/Service.js";

    export default {
        name: "ModeSelector",
        components: {
            RouteButton
        },
        data() {
            return {
               searchRoutes: service.getRoutes().SEARCH_ROUTES
            }
        }
    }
</script>