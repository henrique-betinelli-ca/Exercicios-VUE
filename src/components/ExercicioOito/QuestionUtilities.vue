<template>
    <v-row class="align-center">
        <v-col>
            <h6
                class="text-h6 mb-0" 
            >Timer: {{ timeLeft }}s</h6>
        </v-col>
        <v-col class="d-flex justify-end ga-4">
            <v-btn
                variant="tonal"
                :disabled="timeBonusUsed"
                @click="addTime"
                width="100"
            >+ 10s</v-btn>

            <v-btn
                variant="tonal"
                :disabled="helpUsed"
                @click="requestFacilitator"
                width="100"
            >Get Help</v-btn>
        </v-col>
    </v-row>
</template>

<script>

export default {
    name: "QuestionUtilities",
    data() {
        return {
            timeLeft: 30,
            bonusTime: 0,
            interval: null,
            timeBonusUsed: false,
            helpUsed: false,
        }
    },
    props: {
        isBooleanQuestion: {
            type: Boolean
        },
        startTimer: {
            type: Number
        },
        pausedTime: {
            type: Boolean
        },
    },
    mounted() {
        this.beginTimer();
    },
    watch: {
        startTimer: {
            handler() {
                this.resetTimer();
                this.timeBonusUsed = false;
                this.bonusTime = 0;
                this.helpUsed = this.isBooleanQuestion;
            }
        },
        isBooleanQuestion: {
            immediate: true,
            handler(value) {
                this.helpUsed = value;
            }
        },
        pausedTime: {
            handler(isPaused) {
                if (isPaused) {
                    clearInterval(this.interval);

                    const totalTimeAvailable = 30 + this.bonusTime;
                    const timeSpent = totalTimeAvailable - this.timeLeft;

                    this.$emit("update-time", timeSpent);

                } else {
                    if(this.timeLeft > 0) {
                        this.beginTimer();
                    }
                }
            }
        }
    },
    methods: {
        beginTimer() {
            clearInterval(this.interval);

            this.interval = setInterval(() => {
                if (this.timeLeft > 0) {
                    this.timeLeft--;
                } else {
                    clearInterval(this.interval);
                    this.$emit("time-expired")
                }
            }, 1000);
        },
        resetTimer() {
            clearInterval(this.interval);
            this.timeLeft = 30;
            if(!this.timerPaused) {
                this.beginTimer();
            }
        },
        addTime() {
            this.timeLeft += 10;
            this.bonusTime = 10;
            this.timeBonusUsed = true;
            this.$emit("time-bonus-used")
        },
        requestFacilitator() {
            this.helpUsed = true;
            this.$emit("requested-facilitator")
        }
    }
}
</script>