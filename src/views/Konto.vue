<template>
  <div>
    <div class="button-container">
      <div class="button-wrapper">
        <router-link to="/parent">
          <button class="button-green" @mouseover="playHoverAudio" @click="playStartQuizAudio">Egna
            glosor</button>
        </router-link>
        <p class="green">Redigera dina egna glosor</p>
      </div>
      <div class="button-wrapper">
        <router-link to='/kontakt'>
          <button class="button-blue" @mouseover="playHoverAudio" @click="playStartMathAudio">Kontakt</button>
        </router-link>
        <p class="blue">Har du frågor?</p>
      </div>
      <div class="button-wrapper">
        <router-link to='/om-oss'>
          <button class="button-orange" @mouseover="playHoverAudio" @click="playStartBattleAudio">Om oss</button>
        </router-link>
        <p class="orange">Ta reda på mer om oss!</p>
      </div>
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

p {
  font-family: 'Bangers', sans-serif;
  font-size: 1.08em;
  text-shadow:
    -1px -1px 0 #111,
    1px -1px 0 #111,
    -1px 1px 0 #111,
    1px 1px 0 #111;
  letter-spacing: 0.08em;
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

.green {
  color: #7dffcb;
}

.blue {
  color: #4cb5f5;
}

.orange {
  color: #f77f00;
}

.button-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-wrapper {
  text-align: center;
}

button {
  border: 3px solid #111;
  padding: 10px 20px;
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
  animation: wiggle 0.5s ease-in-out infinite;
}

@keyframes wiggle {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(5deg);
  }

  50% {
    transform: rotate(-5deg);
  }

  75% {
    transform: rotate(5deg);
  }

  100% {
    transform: rotate(0deg);
  }
}
</style>