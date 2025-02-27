<template>
  <div>
    <h2>Mattemagi</h2>
    <p>{{ question.a }} x {{ question.b }}?</p>
    <div class="options">
      <button v-for="(option, index) in options" :key="index" @click="checkAnswer(option)">
        {{ option }}
      </button>
    </div>
    <p v-if="feedback" class="feedback">{{ feedback }}</p>
    <button @click="newQuestion">Nästa fråga</button>
  </div>
</template>

<script setup>
// Importerar ref från Vue för att skapa reaktiva variabler
import { ref } from 'vue';

const tableSize = ref(10);
const question = ref({ a: 0, b: 0 });
const correctAnswer = ref(0);
const options = ref([]);
const feedback = ref('');

// Ljudfiler för rätt/fel svar
const correctAnswerAudio = new Audio('/audio/answer-correct.mp3');
const incorrectAnswerAudio = new Audio('/audio/answer-incorrect.mp3');

// Skapar en ny multiplikationsfråga
function newQuestion() {
  feedback.value = '';
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
    if (wrong !== correctAnswer.value) {
      opts.add(wrong);
    }
  }
  options.value = Array.from(opts).sort(() => Math.random() - 0.5);
}

// Kontrollerar användarens svar
function checkAnswer(selected) {
  if (selected === correctAnswer.value) {
    feedback.value = 'Rätt svar!';
    correctAnswerAudio.play();
  } else {
    feedback.value = 'Fel svar! Försök igen.';
    incorrectAnswerAudio.play();
  }
}

// Starta spelet
newQuestion();
</script>

<style scoped>
.options {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  align-items: center;
  padding-bottom: 20px;
}

.options button {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  padding: 10px 15px;
  font-size: 16px;
}

.feedback {
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
