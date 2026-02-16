<template>
    <v-card class="w-100 pa-6 elevation-3 rounded-0">
        <v-row class="align-center w-75 mx-auto">
            <v-col>
                <RouteButton 
                    :to="homeRoute.TO"
                    :label="homeRoute.LABEL"
                />
            </v-col>
            <v-col class="d-flex justify-end mr-6">
                <ModeSelector/>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    import ModeSelector from "./ModeSelector.vue";
    import RouteButton from "./RouteButton.vue";
    import * as service from "../../../services/ExercicioNove/Service.js";

    export default {
        name: "NavigationArea",
        components: {
            ModeSelector,
            RouteButton
        },
        data() {
            return {
                homeRoute: service.getRoutes().HOME_ROUTE
            }
        }
    }
</script>