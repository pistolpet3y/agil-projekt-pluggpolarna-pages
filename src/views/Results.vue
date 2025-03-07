<template>
  <div class="ordstriden-container">
    <h2>Ditt Resultat</h2>
    <Chart :correctAnswers="correctAnswers" :errorWords="errorWords" />
    <p v-if="correctAnswers === 10">Du hade alla rätt! Enastående, vilken stjärna! ✨</p>
    <p v-else-if="correctAnswers >= 7">
      <span class="styled">Du har {{ correctAnswers }} rätt!</span><br>Bra jobbat! 👏<br>Du behöver jobba vidare på
      följande ord:
    </p>
    <p v-else>
      <span class="styled">Du hade {{ correctAnswers }} rätt.</span><br>Fortsätt kämpa! 💪<br>Du behöver jobba vidare på
      följande ord:
    </p>
    <ul v-if="errorWords.length">
      <li v-for="(word, index) in errorWords" :key="index">{{ word }}</li>
    </ul>
    <button class="start-new-quiz-button" @click="startNewQuiz">Spela igen!</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from '../components/Chart.vue';
// Importera quizStore
import { useQuizStore } from '../stores/quizStore';
import confetti from 'canvas-confetti';
import { useRouter } from 'vue-router';
const router = useRouter();

// Skapa instans av store
const quizStore = useQuizStore();

const correctAnswers = quizStore.correctAnswers;  // Hämta korrekt antal svar
const errorWords = quizStore.errorWords;  // Hämta felaktiga ord

const startQuizAudio = new Audio('/audio/start-quiz.mp3');

// Variabler för resultatvisning
const perfectScore = ref(false);
const mediumScore = ref(false);
const lowerScore = ref(false);

// Funktion för att visa stjärnor (när 10/10 är korrekt)
const showStars = () => {
  console.log('Grattis! Du fick 10 rätt, här är dina stjärnor! ✨');
  // Confetti för perfekt resultat
  confetti({
    particleCount: 300,
    spread: 360,
    origin: { y: 0.5 }
  })
};

// När laddat så händer olika saker baserat på antal rätt
onMounted(() => {
  if (quizStore.correctAnswers === 10) {
    perfectScore.value = true;
    showStars(); // Kör funktionen för stjärnorna
  } else if (quizStore.correctAnswers >= 7) {
    mediumScore.value = true;
  } else {
    lowerScore.value = true;
  }
});

// Funktion för att starta nytt quiz
const startNewQuiz = () => {
  quizStore.startQuiz();
  router.push('/choosequiz');
  startQuizAudio.play();
};
</script>

<style scoped>
.ordstriden-container {
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
}

p {
  text-align: center;
  font-size: 1.05rem;
}

.styled {
  font-family: 'Bangers', sans-serif;
  font-size: 1.35em;
  color: #7dffcb;
  text-shadow:
    -1px -1px 0 #111,
    1px -1px 0 #111,
    -1px 1px 0 #111,
    1px 1px 0 #111;
  letter-spacing: 0.15em;
}

ul {
  list-style-position: inside;
  padding: 0;
  margin: 0 auto;
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
}

ul li {
  display: block;
  margin: 5px;
}

.start-new-quiz-button {
  margin-top: 20px;
  border: 3px solid #111;
  padding: 10px 20px;
  background-color: #7dffcb;
  color: #111;
  font-size: 1.2em;
  font-family: 'Bangers', sans-serif;
  letter-spacing: 0.08em;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: #ff99cc;
}
</style>
