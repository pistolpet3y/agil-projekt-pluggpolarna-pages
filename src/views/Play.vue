<template>
  <div class="button-container">
    <div class="button-wrapper">
      <router-link to="/glosquiz">
        <button class="glosquiz" @mouseover="playHoverAudio" @click="playStartQuizAudio">Glosquiz!</button>
      </router-link>
      <p class="green">Träna dina glosor på ett roligt sätt!</p>
    </div>
    <div class="button-wrapper">
      <router-link to="/mattemagi">
        <button class="mattemagi" @mouseover="playHoverAudio" @click="playStartMathAudio">Mattemagi!</button>
      </router-link>
      <p class="blue">Ett magiskt sätt att lära dig multiplikation!</p>
    </div>
    <div class="button-wrapper">
      <router-link to="/ordstriden">
        <button class="ordstriden" @mouseover="playHoverAudio" @click="playStartBattleAudio">Ordstriden!</button>
      </router-link>
      <p class="orange">En spännande kamp för att bemästra stavning!</p>
    </div>
  </div>
</template>

<script setup>
// Ljudfiler för olika knappar och händelser
const hoverAudio = '/audio/click.mp3'
const startQuizAudio = '/audio/start-quiz.mp3';
const startMathAudio = '/audio/start-math.mp3';
const startBattleAudio = '/audio/start-battle.mp3';

// Funktioner för att spela upp ljud
const playHoverAudio = () => {
  const audio = new Audio(hoverAudio);
  audio.play();
};

const playStartQuizAudio = () => {
  const audio = new Audio(startQuizAudio);
  audio.play();
};

const playStartMathAudio = () => {
  const audio = new Audio(startMathAudio);
  audio.play();
};

const playStartBattleAudio = () => {
  const audio = new Audio(startBattleAudio);
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

.glosquiz {
  background-color: #7dffcb;
}

.mattemagi {
  background-color: #4cb5f5;
}

.ordstriden {
  background-color: #f77f00;
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
  width: 150px;
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
