<script setup>
import { ref } from "vue";

const glosor = ref([
  { svenska: "äpple", engelska: "apple" },
  { svenska: "hund", engelska: "dog" },
  { svenska: "sol", engelska: "sun" },
  { svenska: "vatten", engelska: "water" },
  { svenska: "bil", engelska: "car" }
]);

const currentIndex = ref(0);
const userAnswer = ref("");
const feedback = ref("");

const randomizeWord = () => {
  currentIndex.value = Math.floor(Math.random() * glosor.value.length);
  userAnswer.value = "";
  feedback.value = "";
};

const checkAnswer = () => {
  if (userAnswer.value.toLowerCase() === glosor.value[currentIndex.value].engelska.toLowerCase()) {
    feedback.value = "✅ Rätt!";
  } else {
    feedback.value = `❌ Fel! Rätt svar är: ${glosor.value[currentIndex.value].engelska}`;
  }
};


randomizeWord();
</script>

<template>
  <div class="container">
    <h2>GlosQuiz!</h2>
    <p>Vad är det engelska ordet för: {{ glosor[currentIndex].svenska }}?</p>
    
    <input v-model="userAnswer" type="text" placeholder="Skriv översättningen..." @keyup.enter="checkAnswer" />
    <button @click="checkAnswer">Kontrollera</button>
    <button @click="randomizeWord">Hoppa över</button>

    <p v-if="feedback">{{ feedback }}</p>
  </div>
</template>

<style scoped>

.container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

input {
  width: 80%;
  padding: 8px;
  margin: 10px 0;
}

button {
  margin: 5px;
  padding: 8px 15px;
  cursor: pointer;
}
</style>