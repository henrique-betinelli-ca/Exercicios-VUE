<template>
    <v-row v-if="comparisonCardData">
        <v-col>
        <h2 class="mb-4 text-center">{{ titles.AREA }}</h2>
        <CountryCard
            :countryCardData="comparisonCardData.largestAreaCountry"
        />
        </v-col>
        <v-divider
            vertical
            class="d-none d-md-flex"
        />
        <v-col>
        <h2 class="mb-4 text-center">{{ titles.POPULATION }}</h2>
        <CountryCard
            :countryCardData="comparisonCardData.largestPopulationCountry"
        />
        </v-col>
    </v-row>
</template>

<script>
    import CountryCard from "../../components/ExercicioNove/common/CountryCard.vue";
    import * as service from "../../services/ExercicioNove/Service";

    export default {
        name: "ComparisonResult",
        components: {
            CountryCard
        },
        props: {
            comparisonCardData: {
                type: Object
            }
        },
        data() {
            return {
                titles: service.getComparisonResulTitles()
            }
        }
    }
</script>