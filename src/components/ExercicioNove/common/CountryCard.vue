<template>
    <v-card v-if="countryCardData" class="mx-auto" max-width="400">
        <v-img
            class="align-end text-white"
            height="200"
            :src="countryCardData.flag"
            cover
        />
        <v-card-title>
            <h1>{{ countryCardData.name }}</h1>
        </v-card-title>

        <v-card-text>
            <div 
                v-for="info in countryInfo"
                :key="info.label"
                class="ma-3"
            >
                <v-icon  class="me-2">{{ info.icon }}</v-icon>
                <span><strong>{{ info.label }}:</strong> {{ info.value }}</span>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    import * as service from "../../../services/ExercicioNove/Service.js";
    
    export default {
        name: "CountryCard",
        props: {
            countryCardData: {
                type: Object
            }
        },
        computed: {
            countryInfo() {
                return service.getCountryInfoFields().map(field => ({
                    icon: field.ICON,
                    label: field.LABEL,
                    value: this.countryCardData[field.KEY]
                }));
            }
        }
    }
</script>