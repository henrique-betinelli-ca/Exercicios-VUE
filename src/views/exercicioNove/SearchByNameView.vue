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
                        @selected-value="sendCountryDataToCard"
                        @error-detected="sendAlert"
                    />
                    <v-card class="pa-15 elevation-0" color="grey-lighten-4" min-height="500px">
                        <LoadingStage
                            v-if="isLoading"
                        />
                        <CountryCard
                            :countryCardData="countryCardData"
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
    import CountryCard from "../../components/ExercicioNove/common/CountryCard.vue";
    import * as service from "../../services/ExercicioNove/Service";

    export default {
        name: "SearchByNameView",
        components: {
            NavigationArea,
            AlertsPanel,
            SearchSection,
            LoadingStage,
            CountryCard
        },
        data() {
            return {
                searchMode: service.getSearchMode().NAME,
                countryCardData: null,
                alertType: null,
                isLoading: false
            }
        },
        methods: {
            async sendCountryDataToCard(country) {
                this.resetCountryCardData();
                this.setIsLoading(true);
                try{
                    this.countryCardData = await service.getMainCountryData(country);
                    this.resetAlert();
                }catch(error) {
                    this.alertType = error.type;
                    this.resetCountryCardData();
                }
                this.setIsLoading(false);
            },
            setIsLoading(value) {
                this.isLoading = value;
            },
            sendAlert(value) {
                this.alertType = value;
            },
            resetAlert() {
                this.alertType = null;
            },
            resetCountryCardData() {
                this.countryCardData = null;
            }
        }
    }
</script>