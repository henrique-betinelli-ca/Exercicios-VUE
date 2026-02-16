<template>
    <v-col class="d-flex flex-column align-center">
        <v-alert
            v-show="alertData.status"
            class="w-75"
            closable
            @click:close="closeAlert"
            :title="alertData.title"
            :text="alertData.message"
            :type="alertData.type"
            variant="tonal"
        >
        </v-alert>
    </v-col>
</template>

<script>
    import * as service from "../../../services/ExercicioNove/Service.js";

    export default {
        name: "AlertsPanel",
        props: {
            alertType: {
                type: String
            }
        },
        data() {
            return {
                alertData: {
                    title: null,
                    message: null,
                    type: null,
                    status: false
                },
                alertTimeout: null
            }
        },
        watch: {
            alertType: {
                handler(alertType) {
                    if(alertType) {
                        this.handleAlertData(service.getAlertMessageByType(alertType));
                    } else {
                        this.closeAlert();
                    }
                }
            }
        },
        methods: {
            handleAlertData(alertPayload) {
                if(this.alertTimeout) clearTimeout(this.alertTimeout);
                this.alertData = {
                    title: alertPayload.TITLE,
                    message: alertPayload.MESSAGE,
                    type: alertPayload.TYPE,
                    status: true
                };
                this.alertTimeout = setTimeout(() => this.closeAlert(), 10000);
            },
            closeAlert() {
                if(this.alertTimeout) clearTimeout(this.alertTimeout);
                this.setAlertStatus(false);
                this.$emit("alert-closed");
            },
            setAlertStatus(value) {
                this.alertData.status = value;
            }
        }
    }
</script>