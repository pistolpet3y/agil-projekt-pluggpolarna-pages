<template>
  <div class="parents-container">
    <h2>Ordlista</h2>

    <!-- Inputfält för att lägga till ord -->
    <input v-model="newWord.svenska" placeholder="Svenskt ord" />
    <input v-model="newWord.engelska" placeholder="Engelskt ord" />
    <button @click="addWord">Lägg till ord</button>

    <!-- Här används VocabularyList-komponenten -->
    <VocabularyList />
  </div>
</template>

<script setup>
import { ref } from 'vue';
// Importera VocabularyList-komponenten här
import VocabularyList from '../components/VocabularyList.vue';

const newWord = ref({
  svenska: '',
  engelska: ''
});

// Funktion för att lägga till nya ord
const addWord = () => {
  if (newWord.value.svenska && newWord.value.engelska) {
    let savedWords = JSON.parse(localStorage.getItem('vocabularyList')) || [];
    savedWords.push({
      svenska: newWord.value.svenska,
      engelska: newWord.value.engelska
    });

    // Spara den uppdaterade listan i localStorage
    localStorage.setItem('vocabularyList', JSON.stringify(savedWords));

    // Töm inputfälten
    newWord.value.svenska = '';
    newWord.value.engelska = '';
  } else {
    alert('Fyll i både svenska och engelska ord');
  }
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

button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #7dffcb;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ff99cc;
}
</style>
