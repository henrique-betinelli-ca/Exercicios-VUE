<template>
    <v-app>
        <v-app-bar>
            <NavigationArea/>
        </v-app-bar>
        <v-main>
            <v-container height="130px">
                <AlertsPanel
                    :alertType="alertType"
                    @alert-closed="alertType = null"
                />
            </v-container> 
            <v-container class="d-flex flex-column align-center">   
                <v-card class="w-75 pa-15 elevation-3">
                    <SearchSection
                        :mode="searchMode"
                        @region-selected="sendRegionDataToCard"
                    />
                    <v-card class="pa-15 elevation-0" color="grey-lighten-4" min-height="500px">
                        <LoadingStage
                            v-if="isLoading"
                        />
                        <CountryList
                            :countriesPanelData="countriesPanelData"
                        />
                    </v-card>
                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import NavigationArea from "../../components/ExercicioNove/common/NavigationArea.vue";
    import AlertsPanel from "../../components/ExercicioNove/common/AlertsPanel.vue";
    import SearchSection from "../../components/ExercicioNove/common/SearchSection.vue";
    import LoadingStage from "../../components/ExercicioNove/common/LoadingStage.vue";
    import CountryList from "../../components/ExercicioNove/CountryList.vue";
    import * as service from "../../services/ExercicioNove/Service";

    export default {
        name: "SearchByRegionView",
        components: {
            NavigationArea,
            AlertsPanel,
            SearchSection,
            LoadingStage,
            CountryList
        },
        data() {
            return {
                searchMode: service.getSearchMode().REGION,
                countriesPanelData: null,
                alertType: null,
                isLoading: false
            }
        },
        methods: {
            async sendRegionDataToCard(region) {
                this.resetCountriesPanelData();
                this.setIsLoading(true);
                try{
                    this.countriesPanelData = await service.getCountriesByRegion(region);
                    this.resetAlert();
                }catch(error) {
                    this.alertType = error.type;
                    this.resetCountriesPanelData();
                }
                this.setIsLoading(false);
            },
            setIsLoading(value) {
                this.isLoading = value;
            },
            resetAlert() {
                this.alertType = null;
            },
            resetCountriesPanelData() {
                this.countriesPanelData = null;
            }
        }
    }
</script>