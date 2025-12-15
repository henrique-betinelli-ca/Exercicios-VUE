export const FEEDBACK_ALERT_MESSAGES = {
    ERROR_FETCHING_CATEGORIES: {
        title: "Failed to fetch categories.",
        message: "An error occurred while fetching the categories. To continue, the random mode has been selected.",
        type: "error",
    },
    ERROR_FETCHING_QUESTIONS: {
        title: "Failed to fetch questions.",
        message: "An error occurred while fetching the questions. Please try again later.",
        type: "error",
    }
}
export const FILTER_CONTROLS = {
    category: null,
    difficulty: null,
    type: null,
    amount: 5,
}
export const SCREENS = {
    HomeScreen: "HomeScreen",
    GameScreen: "GameScreen",
    ResultsScreen: "ResultsScreen",
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
export const QUESTION_DATA = {
    question: "",
    allAnswers: [],
    showAnswers: [],
}
export const CARD_RESULTS_CONTENTS = {
    TIME_UP: {
        icon: "mdi-close-circle",
        title: "Time Expired",
        message: "Unfortunately, the time limit has been reached.",
        score: null,
    },
    CORRECT_ANSWER: {
        icon: "mdi-check-circle",
        title: "Correct",
        message: "Congratulations! You got it right!",
        score: null,
    },
    WRONG_ANSWER: {
        icon: "mdi-close-circle",
        title: "Incorrect",
        message: "You almost got it!",
        score: null,
    }
}
export const TOTAL_RESULTS = {
    score: 0,
    time: 0,
}