import { defineStore } from 'pinia';


// state håller de tillståndsvariabler vi behöver. Actions är funktioner för att uppdatera tillståndet (i setQuizResults).

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    correctAnswers: 0,
    errorWords: [],
  }),
  actions: {
    setQuizResults(correctAnswers, errorWords) {
      this.correctAnswers = correctAnswers;
      this.errorWords = errorWords;
    },
    startQuiz() {
      this.correctAnswers = 0;
      this.errorWords = [];
    },
  },
});