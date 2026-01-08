import { describe, it, expect, vi } from 'vitest';
import * as service from './Service.js';

describe('service', () => {
    describe('getFeedbackAlertMesseges', () => {
        it('should return the feedbackAlertMessages constant', () => {
            expect(service.getFeedbackAlertMesseges().ERROR_FETCHING_CATEGORIES).toEqual({
                TITLE: "Failed to fetch categories.",
                MESSAGE: "An error occurred while fetching the categories. To continue, the random mode has been selected.",
                TYPE: "error",
            });
            expect(service.getFeedbackAlertMesseges().ERROR_FETCHING_QUESTIONS).toEqual({
                TITLE: "Failed to fetch questions.",
                MESSAGE: "An error occurred while fetching the questions. Please try again later.",
                TYPE: "error",
            });
        });
    });
    describe('getScreens', () => {
        it('should return the getScreens constant', () => {
            expect(service.getScreens().HOME_SCREEN).toEqual("HomeScreen");
            expect(service.getScreens().GAME_SCREEN).toEqual("GameScreen");
            expect(service.getScreens().RESULTS_SCREEN).toEqual("ResultsScreen");
        });
    });
    describe('getAmountOptions', () => {
        it('should return the getAmountOptions constant', () => {
            expect(service.getAmountOptions()).toEqual([5, 10]);
        });
    });
    describe('getDifficultyOptions', () => {
        it('should return the getDifficultyOptions constant', () => {
            expect(service.getDifficultyOptions()).toEqual([
                "easy",
                "medium",
                "hard",
            ]);
        });
    });
    describe('getTypeOptions', () => {
        it('should return the getTypeOptions constant', () => {
            expect(service.getTypeOptions()).toEqual([
                "multiple",
                "boolean",
            ]);
        });
    });
    describe('getQustionData', () => {
        it('should return the getQustionData constant', () => {
            expect(service.getQustionData()).toEqual({
                question: "",
                allAnswers: [],
                showAnswers: [],
            });
        });
    });
    describe('getTypeOptions', () => {
        it('should return the getTypeOptions constant', () => {
            expect(service.getTypeOptions()).toEqual([
                "multiple",
                "boolean",
            ]);
        });
    });
    describe('answerShuffler', () => {
        it('should check if the answer are shuffled', () => {
            expect(service.answerShuffler(1, [2, 3, 4])).not.toEqual([1, 2, 3, 4]);
        });
        it('should verify that all provided answers are present', () => {
            expect(service.answerShuffler(1, [2, 3, 4])).toEqual(
                expect.arrayContaining([1, 2, 3, 4])
            );
        });
    });
    describe('calculateResult', () => {
        it('should give 5 points if selectedAnswer equals correctAnswer, helpWasUsed is true, and usedExtraTime is false', () => {
            const result = service.calculateResult({
                selectedAnswer: 1, 
                correctAnswer: 1,
                helpWasUsed: true,
                usedExtraTime: false,
            });

            expect(result).toEqual(5);
        });
        it('should give 5 points if selectedAnswer equals correctAnswer, helpWasUsed is false, and usedExtraTime is true', () => {
            const result = service.calculateResult({
                selectedAnswer: 1, 
                correctAnswer: 1,
                helpWasUsed: false,
                usedExtraTime: true,
            });
            
            expect(result).toEqual(5);
        });
        it('should give 10 points if selectedAnswer equals correctAnswer, helpWasUsed is false, and usedExtraTime is false', () => {
            const result = service.calculateResult({
                selectedAnswer: 1, 
                correctAnswer: 1,
                helpWasUsed: false,
                usedExtraTime: false,
            });
            
            expect(result).toEqual(10);
        });
        it('should give 0 points if selectedAnswer is not equals correctAnswer, helpWasUsed is false, and usedExtraTime is false', () => {
            const result = service.calculateResult({
                selectedAnswer: 2, 
                correctAnswer: 1,
                helpWasUsed: false,
                usedExtraTime: false,
            });
            
            expect(result).toEqual(0);
        });
    });
    describe('wrongAnswersRemover', () => {
        it('should remove only answers returned by selectAnswersToRemove', () => {
            const answers = [1, 2, 3, 4];
            const incorrectAnswers = [2, 3, 4];

            expect(service.wrongAnswersRemover(answers, incorrectAnswers)).toEqual([1, 4]);
        });
    });
    describe('selectAnswersToRemove', () => {
        it('should return two answer for to remove', () => {
            expect(service.selectAnswersToRemove([2, 3, 4])).toEqual([2, 3]);
            expect(service.selectAnswersToRemove([5, 6, 7])).toEqual([5, 6]);
            expect(service.selectAnswersToRemove([1, 6, 8])).toEqual([1, 6]);
        });
    });
    describe('buildResultCard', () => {
        it('should return wrong_answer constant when isTimeUp is false and isCorrectAnswer is false', () => {
            expect(service.buildResultCard(false, false)).toEqual({
                ICON: "mdi-close-circle",
                TITLE: "Incorrect",
                MESSAGE: "You almost got it!",
            });
        });
        it('should return correct_answer constant when isTimeUp is false and isCorrectAnswer is true', () => {
            expect(service.buildResultCard(false, true)).toEqual({
                ICON: "mdi-check-circle",
                TITLE: "Correct",
                MESSAGE: "Congratulations! You got it right!",
            });
        });
        it('should return time_up constant when isTimeUp is true and isCorrectAnswer is true', () => {
            expect(service.buildResultCard(true, true)).toEqual({
                ICON: "mdi-close-circle",
                TITLE: "Time Expired",
                MESSAGE: "Unfortunately, the time limit has been reached.",
            });
        });
    });
    describe('timeSpentCalculator', () => {
        it('should add 30 at bonus time and subtract timeLeft from result', () => {
            expect(service.timeSpentCalculator(0, 5)).toEqual(25);
            expect(service.timeSpentCalculator(10, 0)).toEqual(40);
            expect(service.timeSpentCalculator(10, 5)).toEqual(35);
        });
    });
    describe('calculateScore', () => {
        it('should sum all scores', () => {
            const result = [
                { score: 10, timeSpent: 5 },
                { score: 10, timeSpent: 8 },
                { score: 5, timeSpent: 3 },
            ];
            
            expect(service.calculateScore(result)).toEqual(25);
        });
    });
    describe('calculateTime', () => {
        it('should sum all times', () => {
            const result = [
                { score: 10, timeSpent: 5 },
                { score: 10, timeSpent: 8 },
                { score: 5, timeSpent: 3 },
            ];
            
            expect(service.calculateTime(result)).toEqual(16);
        });
    });
});