<template>
  <div class="vocabulary-list">
    <h3>Sparade Ord</h3>

    <!-- Redigera glosor-knapp -->
    <button @click="editMode = !editMode" class="edit-button">
      {{ editMode ? 'Sluta redigera' : 'Redigera glosor' }}
    </button>

    <div v-if="words.length > 0">
      <ul>
        <li v-for="(word, index) in words" :key="index">
          {{ word.svenska }} - {{ word.engelska }}

          <!-- Visa radera-knapp om editMode är aktiverad -->
          <button class="delete-button" v-if="editMode" @click="removeWord(index)">Radera</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Inga ord sparade än.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Ta emot 'words' som en prop
const props = defineProps({
  words: {
    type: Array,
    required: true
  }
});

const editMode = ref(false); // Variabel för att hålla reda på om användaren är i redigeringsläge

// Funktion för att ta bort ett ord från listan
const removeWord = (index) => {
  props.words.splice(index, 1); // Tar bort ordet vid det angivna indexet
  saveWords(); // Uppdatera localStorage med den nya listan
  playDeleteAudio(); //Spelar upp ljud
};

// Ljudfil för knapp
const deleteAudio = '/audio/quiz-skip-question.mp3';

// Funktion för att spela upp ljud
const playDeleteAudio = () => {
  const audio = new Audio(deleteAudio);
  audio.play().catch(error => console.error('Audio play of playDeleteAudio error:', error)); // spelar ljudet och error-konsolloggar om fel.
};

// Funktion för att spara ord i localStorage
const saveWords = () => {
  localStorage.setItem('vocabularyList', JSON.stringify(props.words));
};
</script>

<style scoped>
.vocabulary-list {
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
}

p {
  text-align: center;
}

.edit-button {
  border: 3px solid #111;
  padding: 10px 20px;
  background-color: #f77f00;
  color: #111;
  font-size: 1em;
  font-family: 'Bangers', sans-serif;
  letter-spacing: 0.08em;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s ease-in-out;
}

.edit-button:hover {
  background-color: #ff99cc;
}

.delete-button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #d32f2f;
}
</style>
