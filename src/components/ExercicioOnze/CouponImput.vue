<template>
    <v-divider class="ma-4 mt-8"></v-divider>
    <h3 class="ma-5">{{ sectionTitles.coupon }}</h3>
    <v-row class="ml-4 mr-4">
        <v-col>
            <v-text-field
                width="320"
                v-model="coupon"
                label="Cupom"
                density="compact"
            />
        </v-col>
        <v-col>
            <v-btn
                color="light-green-darken-4"
                @click="applyCoupon"
            >{{ buttonLabels.apply }}</v-btn>
        </v-col>
    </v-row>
    <v-row class="ml-5 mr-5">
        <v-alert
            v-if="alert.show"
            :text="alert.text"
            :title="alert.title"
            :type="alert.type"
            density="compact"
            variant="tonal"
        ></v-alert>
    </v-row>
</template>

<script>
    import * as service from "../../services/ExercicioOnze/Service.js";

    export default {
        name: "CouponImput",
        data() {
            return {
                coupon: null,
                alert: {
                    show: false,
                    type: null,
                    title: null,
                    text: null
                }
            }
        },
        computed: {
            sectionTitles() {
                return service.getSectionTitles();
            },
            buttonLabels() {
                return service.getButtonLabels();
            }
        },
        methods: {
            applyCoupon() {
                if(service.calculateCoupon(this.coupon) == service.getCoupons().invalid) {
                    this.alert = service.getAlertCoupon(service.getCoupons().invalid);
                } else {
                    this.alert = service.getAlertCoupon(service.getCoupons().success);
                }
                this.$emit('coupon-applied', this.coupon);
                this.alert.show = true;
                this.coupon = null;
            }
        }
    }
</script>