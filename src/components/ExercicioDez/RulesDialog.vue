<template>
    <v-dialog :model-value="showRules" @update:model-value="handleClose" width="700">
        <v-card class="d-flex flex-column pa-6">
            <v-card-title class="text-center">
                <h2>{{ rulesDialog.TITLE }}</h2>
            </v-card-title>
            <v-card-text>
                <ol>
                    <li
                        v-for="rule in rulesDialog.RULES_TEXT"
                        :key="rule"
                    >{{ rule }}</li>
                </ol>
            </v-card-text>
            <v-card-actions class="mt-3">
                <v-btn
                    class="ms-auto"
                    @click="handleClose"
                    variant="tonal"
                >{{ labelCloseButton }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import * as service from "../../services/ExercicioDez/Service.js";

    export default {
        name: "RulesDialog",
        props: {
            showRules: {
                type: Boolean
            }
        },
        data() {
            return {
                rulesDialog: service.getRulesDialog(),
                labelCloseButton: service.getButtonLabels('CLOSE')
            }
        },
        methods: {
            handleClose() {
                this.$emit('rules-closed')
            }
        }
    }
</script>