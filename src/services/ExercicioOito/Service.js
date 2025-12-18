export { getCategories, queryGenerator } from "./Resource.js";
import { FEEDBACK_ALERT_MESSAGES, SCREENS, CARD_RESULTS_CONTENTS, AMOUNT_OPTIONS, DIFFICULTY_OPTIONS, TYPE_OPTIONS } from "./Constants.js";

export function getFeedbackAlertMesseges() {
    return FEEDBACK_ALERT_MESSAGES;
}
export function getScreens() {
    return SCREENS;
}
export function getAmountOptions() {
    return AMOUNT_OPTIONS;
}
export function getDifficultyOptions() {
    return DIFFICULTY_OPTIONS;
}
export function getTypeOptions() {
    return TYPE_OPTIONS;
}

export function answerShuffler(correctAnswer, incorrectAnswers) {
    let allAnswers = [
        correctAnswer,
        ...incorrectAnswers,
    ];

    const shuffledQuestions = allAnswers.sort(() => Math.random() - 0.5);
            
    return shuffledQuestions;
}
export function calculateResult({selectedAnswer, correctAnswer, helpWasUsed, usedExtraTime}) {
    let score = 0
    if (selectedAnswer === correctAnswer) {
        if (helpWasUsed || usedExtraTime) {
            score = 5;
        } else {
            score = 10;
        }
    }
    return score;
}
export function wrongAnswersRemover(answers, incorrectAnswers) {
    return answers.filter(options => !selectAnswersToRemove(incorrectAnswers).includes(options));
}
function selectAnswersToRemove(incorrectAnswers) {
    return incorrectAnswers.slice(0, 2);
}
export function buildResultCard(isTimeUp, isCorrectAnswer) {
    let cardResult = {...CARD_RESULTS_CONTENTS.WRONG_ANSWER};

    if(isTimeUp) {
        cardResult = {...CARD_RESULTS_CONTENTS.TIME_UP};
    } else {
        if(isCorrectAnswer) {
            cardResult = {...CARD_RESULTS_CONTENTS.CORRECT_ANSWER};
        }
    }
    return cardResult;
}
export function timeSpentCalculator(bonusTime, timeLeft) {
    const totalTimeAvailable = 30 + bonusTime;
    return totalTimeAvailable - timeLeft;
}
export function calculateScore(questionResults) {
    return questionResults.reduce((sum, result) => sum + result.score, 0);
}
export function calculateTime(questionResults) {
    return questionResults.reduce((sum, result) => sum + result.timeSpent, 0);
}