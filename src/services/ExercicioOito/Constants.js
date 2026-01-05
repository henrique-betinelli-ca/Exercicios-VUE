export const FEEDBACK_ALERT_MESSAGES = {
    ERROR_FETCHING_CATEGORIES: {
        TITLE: "Failed to fetch categories.",
        MESSAGE: "An error occurred while fetching the categories. To continue, the random mode has been selected.",
        TYPE: "error",
    },
    ERROR_FETCHING_QUESTIONS: {
        TITLE: "Failed to fetch questions.",
        MESSAGE: "An error occurred while fetching the questions. Please try again later.",
        TYPE: "error",
    }
}
export const SCREENS = {
    HOME_SCREEN: "HomeScreen",
    GAME_SCREEN: "GameScreen",
    RESULTS_SCREEN: "ResultsScreen",
}
export const CARD_RESULTS_CONTENTS = {
    TIME_UP: {
        ICON: "mdi-close-circle",
        TITLE: "Time Expired",
        MESSAGE: "Unfortunately, the time limit has been reached.",
    },
    CORRECT_ANSWER: {
        ICON: "mdi-check-circle",
        TITLE: "Correct",
        MESSAGE: "Congratulations! You got it right!",
    },
    WRONG_ANSWER: {
        ICON: "mdi-close-circle",
        TITLE: "Incorrect",
        MESSAGE: "You almost got it!",
    }
}
export const RESULT = {
    isCorrectAnswer: false,
    question: null,
    answer: null,
    allAnswers: [],
    helpWasUsed: false,
    usedExtraTime: false,
    isTimeUp: false,
    score: 0,
    timeSpent: 0,
}
    
export const QUENTION_DATA = {
    question: "",
    allAnswers: [],
    showAnswers: [],
}
export const AMOUNT_OPTIONS = [
    5,
    10,
]
export const DIFFICULTY_OPTIONS = [
    "easy",
    "medium",
    "hard",
]
export const TYPE_OPTIONS = [
    "multiple",
    "boolean",
]