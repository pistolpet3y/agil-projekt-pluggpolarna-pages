<template>
  <div class="button-container">
    <div class="button-wrapper">
      <router-link to="/quiz">
        <button class="glosquiz" @mouseover="playSound">Glosquiz!</button>
      </router-link>
      <p class="green">Träna dina glosor på ett roligt sätt!</p>
    </div>
    <div class="button-wrapper">
      <router-link to="/magi">
        <button class="mattemagi" @mouseover="playSound">Mattemagi!</button>
      </router-link>
      <p class="blue">Ett magiskt sätt att lära dig multiplikation!</p>
    </div>
    <div class="button-wrapper">
      <button class="ordstriden" @mouseover="playSound">Ordstriden!</button>
      <p class="orange">En spännande kamp för att bemästra stavning!</p>
    </div>
  </div>
</template>

<script setup>
// Funktion för att spela upp hoverljud
const hoverSound = '/hover-sound.mp3'

const playSound = () => {
  const audio = new Audio(hoverSound);
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
