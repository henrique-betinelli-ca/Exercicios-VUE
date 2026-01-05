<template>
    <v-row class="d-flex flex-column align-center">
        <v-col>
            <QuestionUtilities
                :startTimer="timerKey"
                :isBooleanQuestion="isBooleanQuestion"
                :pausedTime="timerPaused"
                @requested-facilitator="questionHelper"
                @time-bonus-used="result.usedExtraTime = true"
                @time-expired="timeExpired"
                @updated-time="result.timeSpent = $event"
            />
        </v-col>
        <v-col>
            <p>{{ questionData.question }}</p>
        </v-col>
        <v-col>
            <v-radio-group v-model="selectedAnswer" v-show="questionData.showAnswers.length > 0">
                <template v-for="answers in questionData.showAnswers" :key="answers">
                    <v-radio :label="answers" :value="answers"></v-radio>
                </template>
            </v-radio-group>
        </v-col>
        <v-col class="d-flex justify-end align-center mt-auto ga-4">
            <v-btn
                @click="sendQuestion"
                variant="tonal"
                :disabled="!answeredQuestion"
                width="150"
            >send</v-btn>
            <v-btn
                @click="skipQuestion"
                variant="tonal"
                width="150"
            >skip</v-btn>
        </v-col>
        <QuestionResult
            :answersResult="answersResult"
            @displayed-result="questionController"
        />
    </v-row>
</template>

<script>
    import * as service from "../../services/ExercicioOito/Service.js";
    import QuestionUtilities from "../../components/ExercicioOito/QuestionUtilities.vue";
    import QuestionResult from "../../components/ExercicioOito/QuestionResult.vue";
    
    export default {
        name: "QuestionCards",
        components: {
            QuestionUtilities,
            QuestionResult,
        },
        data() {
            return {
                questionData: {...service.getQustionData()},
                result: {...service.getResult()},
                answersResult: null,
                isBooleanQuestion: null,
                timerKey: 0,
                timerPaused: false,
                selectedAnswer: null,
                answeredQuestion: false,
            }
        },
        props: {
            currentQuestion: {
                type: Object,
            },
        },
        watch: {
            currentQuestion: {
                immediate: true,
                handler() {
                    this.processingNewQuestion()
                }
            },
            selectedAnswer: {
                handler(answer) {
                    if(answer) {
                        this.setAnsweredQuestion(true);
                    } else {
                        this.setAnsweredQuestion(false);
                    }
                }
            }
        },
        methods: {
            processingNewQuestion() {
                this.questionData.question = this.currentQuestion.question;
                this.result.question = this.currentQuestion.question;
                this.timerKey++;  

                const shuffledQuestions = service.answerShuffler(this.currentQuestion.correct_answer, this.currentQuestion.incorrect_answers);
                this.questionData.showAnswers = shuffledQuestions
                this.result.allAnswers = shuffledQuestions

                this.isBooleanQuestion = this.currentQuestion.type === "boolean" 
            },
            skipQuestion() {
                this.result.isCorrectAnswer = false;
                this.result.score = 0;
                this.result.answer = null;

                this.timerKey++;   

                this.$emit("question-answered", {...this.result});
                
                this.resetCard();
                this.resetResults();
            },
            sendQuestion() {
                if(this.selectedAnswer) {
                    const calculationResult = service.calculateResult({
                        selectedAnswer: this.selectedAnswer, 
                        correctAnswer: this.currentQuestion.correct_answer,
                        helpWasUsed: this.result.helpWasUsed,
                        usedExtraTime: this.result.usedExtraTime
                    });
                    this.result.score = calculationResult;
                    this.result.isCorrectAnswer = !!calculationResult;
                    this.result.answer = this.selectedAnswer;

                    this.setTimerPaused(true);

                    this.answersResult = {...this.result};
                }
            },
            questionController() {
                this.answersResult = null;

                this.timerKey++;   
                this.setTimerPaused(false);

                this.$emit("question-answered", {...this.result});

                this.resetCard();
                this.resetResults();
            },
            resetResults() {
                this.result = {...service.getResult()};
            },
            resetCard() {
                this.questionData = {...service.getQustionData()};

                this.selectedAnswer = null;
                this.setAnsweredQuestion(false);
            },
            questionHelper() {
                this.questionData.showAnswers = service.wrongAnswersRemover(this.questionData.showAnswers, this.currentQuestion.incorrect_answers);
            
                this.result.helpWasUsed = true;
            },
            timeExpired() {
                this.result.isTimeUp = true;

                this.setTimerPaused(true);

                this.answersResult = {...this.result};
            },
            setAnsweredQuestion(value) {
                this.answeredQuestion = value;
            },
            setTimerPaused(value) {
                this.timerPaused = value;
            }
        }
    }
</script>