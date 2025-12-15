export { getCategories, queryGenerator } from "./Resource.js";
import { FEEDBACK_ALERT_MESSAGES, FILTER_CONTROLS, SCREENS, RESULT, QUESTION_DATA, CARD_RESULTS_CONTENTS, TOTAL_RESULTS } from "./Constants.js";

export function getFeedbackAlertMesseges() {
    return FEEDBACK_ALERT_MESSAGES;
}
export function getFilterControls() {
    return FILTER_CONTROLS
}
export function getScreens() {
    return SCREENS;
}
export function getResult() {
    return RESULT;
}
export function getQuestionData() {
    return QUESTION_DATA;
}
export function getTotalResults() {
    return TOTAL_RESULTS;
}

export function answerShuffler(correctAnswer, incorrectAnswers) {
    let allAnswers = [
        correctAnswer,
        ...incorrectAnswers,
    ];

    const shuffledQuestions = allAnswers.sort(() => Math.random() - 0.5);
            
    return shuffledQuestions;
}
export function calculateResult(selectedAnswer, correctAnswer, helpWasUsed, usedExtraTime) {
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
export function buildResultCard(isTimeUp, isCorrectAnswer, score) {
    let cardResult = {...CARD_RESULTS_CONTENTS.WRONG_ANSWER};

    if(isTimeUp) {
        cardResult = {...CARD_RESULTS_CONTENTS.TIME_UP};
    } else {
        if(isCorrectAnswer) {
            cardResult = {...CARD_RESULTS_CONTENTS.CORRECT_ANSWER};
        }
    }
    cardResult.score = score;
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