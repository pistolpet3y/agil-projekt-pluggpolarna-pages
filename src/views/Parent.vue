<template>
  <div class="parents-container">
    <h2>Ordlista</h2>

    <!-- Inputfält för att lägga till ord -->
    <input v-model="newWord.svenska" placeholder="Svenskt ord" />
    <input v-model="newWord.engelska" placeholder="Engelskt ord" />
    <button class="add-word-button" @click="addWord" @mouseover="playHoverAudio">Lägg till ord</button>

    <!-- VocabularyList använder Pinia-store -->
    <VocabularyList :words="wordsStore.words" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useWordsStore } from '../stores/wordsStore';
import VocabularyList from '../components/VocabularyList.vue';

// Hämta Pinia-store
const wordsStore = useWordsStore();

// Nytt ord som användaren skriver in
const newWord = ref({
  svenska: '',
  engelska: ''
});

// Funktion för att lägga till ett nytt ord
const addWord = () => {
  if (newWord.value.svenska && newWord.value.engelska) {
    wordsStore.addWord({
      svenska: newWord.value.svenska.toLowerCase(),
      engelska: newWord.value.engelska.toLowerCase()
    });

    // Töm inputfälten
    newWord.value.svenska = '';
    newWord.value.engelska = '';

    // Spela upp ljudet
    playWordAddedAudio();
  } else {
    alert('Fyll i både svenska och engelska ord');
  }
};

// Ladda ord från localStorage när sidan laddas
onMounted(() => {
  wordsStore.loadWords();
});

// Ljud för knappar
const hoverAudio = '/audio/click.mp3';
const wordAddedAudio = '/audio/quiz-correct-answer.mp3';

// Spela upp ljud
const playHoverAudio = () => {
  const audio = new Audio(hoverAudio);
  audio.play().catch(error => console.error('Audio play error:', error));
};
const playWordAddedAudio = () => {
  const audio = new Audio(wordAddedAudio);
  audio.play().catch(error => console.error('Audio play error:', error));
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
  width: 80%;
  display: block;
  margin: 20px auto;
  border: 3px solid #111;
  padding: 10px;
  font-family: "Arial", "Helvetica", "sans-serif";
  font-size: 1.1rem;
  letter-spacing: 0.15em;
  background-color: #fff;
  border-radius: 5px;
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

@media only screen and (max-width: 480px) {
  h2 {
    text-align: center;
    text-align: center;
    font-size: 1.5rem;
    padding-top: 0px;
    margin-top: -15px !important;
    margin-bottom: 10px;
  }

  input {
    width: 75%;
  }

  .add-word-button {
    padding: 8px 13px;
  }

  .parents-container {
    padding: 15px;
  }
}
</style>
