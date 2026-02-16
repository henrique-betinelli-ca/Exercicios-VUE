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
                        @countries-selected="sendCountriesToCamparison"
                        @comparison-selection-invalid="sendAlert"
                    />
                    <v-card class="pa-15 elevation-0" color="grey-lighten-4" min-height="500px">
                        <LoadingStage
                            v-if="isLoading"
                        />
                        <ComparisonResult
                            :comparisonCardData="comparisonCardData"
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
    import ComparisonResult from "../../components/ExercicioNove/ComparisonResult.vue";
    import * as service from "../../services/ExercicioNove/Service";

    export default {
        name: "CountryComparisonView",
        components: {
            NavigationArea,
            AlertsPanel,
            SearchSection,
            LoadingStage,
            ComparisonResult
        },
        data() {
            return {
                searchMode: service.getSearchMode().COMPARISON,
                comparisonCardData: null,
                alertType: null,
                isLoading: false
            }
        },
        methods: {
            async sendCountriesToCamparison(countries) {
                this.resetComparisonCardData();
                this.setIsLoading(true);
                this.comparisonCardData = await service.compareCountries(countries);
                this.resetAlert();
                this.setIsLoading(false);
            },
            setIsLoading(value) {
                this.isLoading = value;
            },
            resetComparisonCardData() {
                this.comparisonCardData = null;
            },
            sendAlert(type) {
                this.alertType = type;
                this.setIsLoading(false);
            },
            resetAlert() {
                this.alertType = null;
            }
        }
    }
</script>