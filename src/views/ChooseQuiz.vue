<template>
  <div>
    <div class="button-container">
      <router-link to='/glosquiz'>
        <button class="button-green" @mouseover="playHoverAudio" @click="playStartMathAudio">Glosquiz</button>
      </router-link>
      <router-link to='/savedwordsquiz'>
        <button class="button-green" @mouseover="playHoverAudio" @click="playStartMathAudio">Egna
          glosor</button>
      </router-link>
      <router-link to='/parent'>
        <button class="button-blue" @mouseover="playHoverAudio" @click="playStartBattleAudio">Redigera glosor</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Ljudfiler för olika knappar och händelser
const hoverAudio = '/audio/click.mp3'

// Funktioner för att spela upp ljud
const playHoverAudio = () => {
  const audio = new Audio(hoverAudio);
  audio.play();
};
</script>

<style scoped>
@font-face {
  font-family: 'Kidprint';
  src: url('/fonts/Kidprint.OTF') format('opentype');
  font-weight: bold;
  font-style: normal;
}

.button-green {
  background-color: #7dffcb;
}

.button-blue {
  background-color: #4cb5f5;
}

.button-orange {
  background-color: #f77f00;
}

.button-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  margin: 5px;
  border: 3px solid #111;
  padding: 10px 20px;
  width: 120px;
  color: #111;
  font-size: 1.2em;
  font-family: 'Bangers', sans-serif;
  letter-spacing: 0.08em;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ff99cc;
}
</style>