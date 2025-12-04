<template>
    <v-row class="d-flex flex-column align-center">
        <v-col>
            <QuestionUtilities
                :startTimer="timerKey"
                :isBooleanQuestion="currentQuestion.type === 'boolean'"
                :pausedTime="timerPaused"
                @requested-facilitator="questionHelper"
                @time-bonus-used="result.usedExtraTime = true"
                @time-expired="timeExpired"
                @update-time="result.timeSpent = $event"
            />
        </v-col>
        <v-col>
            <p>{{ questionData.question }}</p>
        </v-col>
        <v-col>
            <v-radio-group v-model="selectedAnswer" v-if="questionData.allAnswers.length > 0">
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
    import QuestionUtilities from "../../components/ExercicioOito/QuestionUtilities.vue";
    import QuestionResult from "../../components/ExercicioOito/QuestionResult.vue";

    const RESULT = {
        isCorrectAnswer: false,
        question: null,
        answer: null,
        allAnswers: [],
        helpWasUsed: false,
        usedExtraTime: false,
        isTimeUp: false,
        score: 0,
        timeSpent: 0,
    };

    const QUESTION_DATA = {
        question: "",
        allAnswers: [],
        showAnswers: [],
    };

    export default {
        name: "QuestionCards",
        components: {
            QuestionUtilities,
            QuestionResult,
        },
        data() {
            return {
                questionData: { ...QUESTION_DATA },
                result: { ...RESULT },
                answersResult: null,
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
                    this.questionData.question = this.currentQuestion.question;
                    this.result.question = this.currentQuestion.question;
                    this.answerShuffler();
                    this.timerKey++;   
                }
            },
            selectedAnswer: {
                handler(answer) {
                    if(answer) {
                        this.answeredQuestion = true;
                    } else {
                        this.answeredQuestion = false;
                    }
                }
            }
        },
        methods: {
            answerShuffler() {
                this.questionData.allAnswers = [
                    this.currentQuestion.correct_answer,
                    ...this.currentQuestion.incorrect_answers,
                ];

                const shuffledQuestions = this.questionData.allAnswers.sort(() => Math.random() - 0.5);
                
                this.questionData.showAnswers = shuffledQuestions;
                this.result.allAnswers = shuffledQuestions;
            },
            skipQuestion() {
                this.result.isCorrectAnswer = false;
                this.result.score = 0;
                this.result.answer = null;

                this.timerKey++;   

                this.$emit("question-answer", {...this.result});
                
                this.resetCard();
                this.resetResults();
            },
            sendQuestion() {
                if(this.selectedAnswer) {
                    this.calculateResult();

                    this.timerPaused = true;

                    this.answersResult = {...this.result};
                }
            },
            questionController() {
                this.answersResult = null;

                this.timerKey++;   
                this.timerPaused = false;

                this.$emit("question-answer", {...this.result});

                this.resetCard();
                this.resetResults();
            },
            calculateResult() {
                if(this.selectedAnswer == this.currentQuestion.correct_answer) {
                    this.result.isCorrectAnswer = true;
                    
                    if(this.result.helpWasUsed || this.result.usedExtraTime) {
                        this.result.score = 5;
                    } else {
                        this.result.score = 10;
                    }

                } else {
                    this.result.isCorrectAnswer = false;
                    this.result.score = 0;
                }

                this.result.answer = this.selectedAnswer;

            },
            resetResults() {
                this.result = { ...RESULT }
            },
            resetCard() {
                this.questionData = { ...QUESTION_DATA }
                this.selectedAnswer = null;
                this.answeredQuestion = false;
            },
            questionHelper() {
                const incorrectOptionsSeparator = this.currentQuestion.incorrect_answers.slice(0, 2);

                this.questionData.showAnswers = this.questionData.showAnswers.filter(options => !incorrectOptionsSeparator.includes(options));
            
                this.result.helpWasUsed = true;
            },
            timeExpired() {
                this.result.isTimeUp = true;

                this.timerPaused = true;

                this.answersResult = {...this.result};
            }
        }
    }
</script>