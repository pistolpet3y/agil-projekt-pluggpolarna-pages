<template>
  <div class="parents-container">
    <h2>Ordlista</h2>

    <!-- Inputfält för att lägga till ord -->
    <input v-model="newWord.svenska" placeholder="Svenskt ord" />
    <input v-model="newWord.engelska" placeholder="Engelskt ord" />
    <button class="add-word-button" @click="addWord" @mouseover="playHoverAudio">Lägg till ord</button>

    <!-- Här används VocabularyList-komponenten som skickar med ordlistan -->
    <VocabularyList :words="savedWords" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VocabularyList from '../components/VocabularyList.vue';

// Reaktiv variabel för ordlistan
const savedWords = ref(JSON.parse(localStorage.getItem('vocabularyList')) || []);
const newWord = ref({
  svenska: '',
  engelska: ''
});

// Funktion för att lägga till nya ord (i lower case)
const addWord = () => {
  if (newWord.value.svenska && newWord.value.engelska) {
    playWordAddedAudio();  // Spela upp ljudet när ordet har lagts till

    // Lägg till ordet i den reaktiva variabeln
    savedWords.value.push({
      svenska: newWord.value.svenska.toLowerCase(),
      engelska: newWord.value.engelska.toLowerCase()
    });

    // Spara den uppdaterade listan i localStorage
    localStorage.setItem('vocabularyList', JSON.stringify(savedWords.value));

    // Töm inputfälten
    newWord.value.svenska = '';
    newWord.value.engelska = '';
  } else {
    alert('Fyll i både svenska och engelska ord');
  }
};

// Ljudfil för knapp
const hoverAudio = '/audio/click.mp3';
const wordAddedAudio = '/audio/quiz-correct-answer.mp3';

// Funktioner för att spela upp ljud
const playHoverAudio = () => {
  const audio = new Audio(hoverAudio);
  audio.play();
};
const playWordAddedAudio = () => {
  const audio = new Audio(wordAddedAudio);
  audio.play();
};
</script>

<style scoped>
.parents-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

input {
  margin: 10px 5px;
  padding: 10px;
  font-size: 1rem;
}

.add-word-button {
  margin: 0 5px;
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

.add-word-button:hover {
  background-color: #ff99cc;
}
</style>
