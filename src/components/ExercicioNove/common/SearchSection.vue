<template>
    <v-row>
        <v-col>
            <v-autocomplete
                v-model="selectedValue"
                :label="label"
                :items="items"
                :multiple="isMultiple"
                clearable
                chips
                @update:modelValue="handleUpdate"
            />
        </v-col>
        <v-col>
            <v-btn
                class="h-75"
                variant="tonal"
                @click="handleSearch"
            >Buscar</v-btn>
        </v-col>
    </v-row>
</template>
<script>
    import * as service from "../../../services/ExercicioNove/Service";

    export default {
        name: "SearchSection",
        props: {
            mode: {
                type: String
            }
        },
        data() {
            return {
                selectedValue: this.mode == service.getSearchMode().COMPARISON ? [] : null,
                label: service.getSearchLabels(this.mode),
                items: []
            };
        },
        computed: {
            isMultiple() {
                return this.mode == service.getSearchMode().COMPARISON;
            }
        },
        async mounted() {
            if (this.mode == service.getSearchMode().REGION) {
                this.items = service.getRegions();
            } else {
                this.items = await service.getCountriesNames();
            }
        },
        methods: {
            handleUpdate(value) {
                if (this.mode == service.getSearchMode().COMPARISON) {
                    this.selectedValue = value.slice(0, 3);
                }
            },
            handleSearch() {
                if(this.selectedValue) {
                    if (this.mode == service.getSearchMode().REGION) {
                        this.$emit("region-selected", this.selectedValue);
                    }
                    if (this.mode == service.getSearchMode().NAME) {
                        this.$emit("country-selected", this.selectedValue);
                    }
                }
                if (this.mode == service.getSearchMode().COMPARISON) {
                    if (this.selectedValue.length > 1) {
                        this.$emit("countries-selected", this.selectedValue);
                    } else if (this.selectedValue.length > 0) {
                        this.$emit("comparison-selection-invalid", "NOT_ENOUGH_COUNTRIES");
                    }
                }
                this.reset();
            },
            reset() {
                this.selectedValue = this.mode == service.getSearchMode().COMPARISON ? [] : null;
            }
        }
    };
</script>