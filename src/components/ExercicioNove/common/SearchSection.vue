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
                try {
                    this.items = await service.getCountriesNames();
                }catch(error) {
                    this.$emit("error-detected", error.type);
                }
            }
        },
        methods: {
            handleUpdate(value) {
                if (this.mode == service.getSearchMode().COMPARISON) {
                    this.selectedValue = value.slice(0, 3);
                }
            },
            handleSearch() {
                if(this.selectedValue) this.$emit("selected-value", this.selectedValue);
                this.reset();
            },
            reset() {
                this.selectedValue = this.mode == service.getSearchMode().COMPARISON ? [] : null;
            }
        }
    };
</script>