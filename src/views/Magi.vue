<template>
  <div class="mattemagi-container">
    <h2>Mattemagi</h2>
    <InfoButton color="blue" :infoContent="`Välkommen till Mattemagi, där din mattehjärna får briljera!<br><br>I detta spel ska du lösa spännande multiplikationsproblem. Varje rätt svar ger dig poäng och tar dig ett steg närmare till att bli en riktig mattemagiker.<br><br>Utmana dig själv, ha kul med siffror och visa vad du går för! Lycka till! 🧙‍♂️✨`" id="info" />
    <div v-if="!gameOver">
      <p class="styled">Uppgift {{ questionCount + 1 }} av {{ totalQuestions }}</p>
      <p class="styled">Poäng: {{ score }}</p>
      <p>Beräkna: <strong>{{ question.a }} x {{ question.b }}</strong></p>
      <div class="options">
        <button v-for="(option, index) in options" :key="index" :class="{ selected: selectedOption === option }" :disabled="selectedOption !== null" @click="checkAnswer(option)">
          {{ option }}
        </button>
      </div>
      <p v-if="feedback" class="feedback" v-html="feedback"></p>
      <button @click="nextQuestion">Nästa fråga</button>
    </div>
    <div v-else>
      <h3>Ditt Resultat</h3>
      <p v-if="score === totalQuestions"><strong>{{ score }}</strong> av <strong>{{ totalQuestions }}</strong> rätt!<br>Du är en äkta mattemagiker! 🧙‍♂️</p>
      <p v-else><strong>{{ score }}</strong> av <strong>{{ totalQuestions }}</strong> rätt!</p>
      <button @click="restartGame">Spela igen!</button>
    </div>
  </div>
</template>

<script setup>
// Importerar ref från Vue för att skapa reaktiva variabler
import { ref, watch } from 'vue';
import confetti from 'canvas-confetti';
import InfoButton from '../components/InfoButton.vue';

const tableSize = ref(10);
const question = ref({ a: 0, b: 0 });
const correctAnswer = ref(0);
const options = ref([]);
const feedback = ref('');

const score = ref(0);
const questionCount = ref(0);
const totalQuestions = ref(10);
const gameOver = ref(false);
const selectedOption = ref(null);

// Ljudfiler för rätt/fel svar
const correctAnswerAudio = new Audio('/audio/math-correct-answer.mp3');
const incorrectAnswerAudio = new Audio('/audio/math-incorrect-answer.mp3');
const nextQuestionAudio = new Audio('/audio/quiz-skip-question.mp3');
const restartGameAudio = new Audio('/audio/start-math.mp3');

// Skapar en ny multiplikationsfråga
function newQuestion() {
  feedback.value = '';
  selectedOption.value = null;
  const a = Math.floor(Math.random() * tableSize.value) + 1;
  const b = Math.floor(Math.random() * tableSize.value) + 1;
  question.value = { a, b };
  correctAnswer.value = a * b;
  generateOptions();
}

// Genererar 6 alternativ där ett är korrekt
function generateOptions() {
  let opts = new Set();
  opts.add(correctAnswer.value);
  while (opts.size < 6) {
    let wrong = (Math.floor(Math.random() * tableSize.value) + 1) *
      (Math.floor(Math.random() * tableSize.value) + 1);
    opts.add(wrong);
  }
  options.value = Array.from(opts).sort(() => Math.random() - 0.5);
}

// Kontrollerar användarens svar
function checkAnswer(selected) {
  if (selectedOption.value !== null) return;

  selectedOption.value = selected;

  if (selected === correctAnswer.value) {
    feedback.value = '✅ Rätt! Bra jobbat! :)';
    score.value++;
    correctAnswerAudio.play();
  } else {
    feedback.value = `❌ Fel! Rätt svar var: <strong>${correctAnswer.value}</strong>`;
    incorrectAnswerAudio.play();
  }
}

// Nästa fråga eller avsluta spelet
function nextQuestion() {
  if (questionCount.value < totalQuestions.value - 1) {
    questionCount.value++;
    newQuestion();
    nextQuestionAudio.play();
  } else {
    questionCount.value++;
    gameOver.value = true;
  }
}

// Confetti för perfekt resultat
watch (gameOver, (value) => {
  if (value && score.value === totalQuestions.value) {
    confetti({
      particleCount: 300,
      spread: 360,
      origin: { y: 0.5 }
    });
  }
});

// Starta om spelet och nollställ poäng
function restartGame() {
  score.value = 0;
  questionCount.value = 0;
  gameOver.value = false;
  newQuestion();
  restartGameAudio.play();
}

// Starta från första frågan
newQuestion();
</script>

<style scoped>
.mattemagi-container {
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
}

p {
  text-align: center;
  font-size: 1.05rem;
}

.styled {
  font-family: 'Bangers', sans-serif;
  font-size: 1.35em;
  color: #4cb5f5;
  text-shadow:
    -1px -1px 0 #111,
    1px -1px 0 #111,
    -1px 1px 0 #111,
    1px 1px 0 #111;
  letter-spacing: 0.15em;
}

.options {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-auto-rows: 100px;
  gap: 5px;
  justify-content: center;
  margin-bottom: 20px;
}

.options button {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #111;
  background-color: #4cb5f5;
  font-family: 'Bangers', sans-serif;
  font-size: 1.8em;
  color: #111;
  letter-spacing: 0.08em;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s ease-in-out;
}

.options button:hover:enabled {
  background-color: #ff99cc;
}

.options button.selected {
  background-color: #ff99cc;
}

button {
  margin: 0 5px;
  border: 3px solid #111;
  padding: 10px 20px;
  background-color: #4cb5f5;
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
