<template>
    <v-row class="d-flex flex-column">
        <v-col class="text-center">
            <v-divider class="my-5"/>
            <v-btn
                v-if="!isViewResults"
                @click="viewResults"
                variant="tonal"
                width="150"
            >View results</v-btn>
        </v-col>
        <v-col v-if="isViewResults">
            <template 
                v-for="question in completedQuestions" 
                :key="question.question"
            >
                <p class="opacity-60">{{ question.question }}</p>

                <v-radio-group v-model="question.answer">
                    <template 
                        v-for="answer in question.allAnswers" 
                        :key="answer"
                    >
                        <v-radio 
                            disabled
                            :label="answer" 
                            :value="answer"
                        ></v-radio>
                    </template>
            </v-radio-group>
            </template>
        </v-col>
    </v-row>
</template>

<script>

    export default {
        name: "DisplayQuestions",
        data() {
            return {
                isViewResults: false,
            }
        },
        mounted() {
            this.isViewResults = false;
        },
        props: {
            completedQuestions: {
                type: Array,
            }
        },
        methods: {
            viewResults() {
                this.isViewResults = true;

                this.$emit("questions-for-display-requested");
            }
        }
    }
</script>