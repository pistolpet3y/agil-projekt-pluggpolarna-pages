<template>
  <div class="vocabulary-list">
    <h3>Sparade ord</h3>
    <div v-if="words.length > 0">
      <ul>
        <li v-for="(word, index) in words" :key="index">
          {{ word.svenska }} - {{ word.engelska }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Inga ord sparade än.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const words = ref([]);

// Funktion för att hämta sparade ord från localStorage
const loadWords = () => {
  const saved = localStorage.getItem('vocabularyList');
  if (saved) {
    words.value = JSON.parse(saved);
  }
};

// Hämta sparade ord när komponenten laddas
onMounted(() => {
  loadWords();
});

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
</style>
