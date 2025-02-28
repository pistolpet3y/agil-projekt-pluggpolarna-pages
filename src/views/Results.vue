<script setup>
import { ref, onMounted } from 'vue';
import Chart from '../components/Chart.vue';
// Importera quizStore
import { useQuizStore } from '../stores/quizStore';
// Skapa instans av store
const quizStore = useQuizStore();

const correctAnswers = quizStore.correctAnswers;  // Hämta korrekt antal svar
const errorWords = quizStore.errorWords;  // Hämta felaktiga ord

// Variabler för resultatvisning
const perfectScore = ref(false);
const mediumScore = ref(false);
const lowerScore = ref(false);

// Funktion för att visa stjärnor (när 10/10 är korrekt)
const showStars = () => {
  console.log('Grattis! Du fick 10 rätt, här är dina stjärnor! ✨');
};

onMounted(() => {
  console.log('testing från results.vue!');
  if (quizStore.correctAnswers === 10) {
    perfectScore.value = true;
    showStars(); // Kör funktionen för stjärnorna
  } else if (quizStore.correctAnswers >= 7) {
    mediumScore.value = true;
  } else {
    lowerScore.value = true;

  }
});
</script>

<style></style>

<template>
  <div>
    <h3>Ditt resultat</h3>
    <Chart :correctAnswers="correctAnswers" :errorWords="errorWords" />
    <p v-if="correctAnswers === 10">Du hade alla rätt! Enastående, vilken stjärna! ✨</p>
    <p v-else-if="correctAnswers >= 7">
      Du har {{ correctAnswers }} rätt! Bra jobbat! Du behöver jobba vidare på följande ord:
    </p>
    <p v-else>
      Du hade {{ correctAnswers }} rätt. Fortsätt kämpa! Du behöver jobba vidare på följande ord:
    </p>
    <ul v-if="errorWords.length">
      <li v-for="(word, index) in errorWords" :key="index">{{ word }}</li>
    </ul>
  </div>
</template>
