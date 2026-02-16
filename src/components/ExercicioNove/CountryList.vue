<template>
    <v-expansion-panels v-model="activePanel">
        <v-expansion-panel
            v-for="(country, index) in countriesPanelData"
            :key="country.name.common"
            :title="country.translations.por.common"
        >
            <v-expansion-panel-text>
                <div class="pa-4">
                    <CountryCard
                        v-if="activePanel == index"
                        :countryCardData="countryCardData"
                    />
                </div>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
    import CountryCard from "./common/CountryCard.vue";
    import * as service from "../../services/ExercicioNove/Service";

    export default {
        name: "CountryList",
        components: {
            CountryCard
        },
        props: {
            countriesPanelData: {
                type: Array
            }
        },
        data() {
            return {
                activePanel: null,
            }
        },
        watch: {
            countriesPanelData: {
                handler() {
                    this.resetActivePanel();
                }
            }
        },
        computed: {
            countryCardData() {
                if (this.activePanel == null) return null;
                return service.mapCountryToCardData(this.countriesPanelData[this.activePanel]);
            },
        },
        methods: {
            resetActivePanel() {
                this.activePanel = null;
            }
        }
    }
</script>