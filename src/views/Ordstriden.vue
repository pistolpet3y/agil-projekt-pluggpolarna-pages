<template>
  <div class="ordstriden-container">
    <h2>Ordstriden</h2>
    <!-- Container för att visa HP-status -->
    <div class="player-health-status">
      <!-- Renderar spelare/motståndare och deras HP-status -->
      <div class="player">
        <p class="styled">Hjälte<br>HP: {{ playerHP }}</p>
      </div>
      <div class="opponent">
        <p class="styled">Lurifax<br>HP: {{ opponentHP }}</p>
      </div>
    </div>
    <!-- Om spelet inte är över visas innehållet -->
    <div v-if="!gameOver">
      <p>Gissa ordet: <strong>{{ scrambledWord }}</strong></p>
      <!-- Inmatningsfält för svar, binder svaret till userAnswer, @keyup.enter anropar funktionen onEnterPress -->
      <input
        v-model="userAnswer"
        @keyup.enter="onEnterPress"
        placeholder="Skriv ditt svar här..."
      />
      <!-- Knappar för att ge upp/skicka svar visas om feedback inte syns -->
      <button v-if="!feedback" @click="surrenderRound">Ge upp</button>
      <button v-if="!feedback" @click="submitAnswer">Attack!</button>

      <!-- Visar feedback (rätt eller fel) om den finns -->
      <p v-if="feedback" v-html="feedback"></p>

      <!-- Knapp för nästa runda visas om feedback syns -->
      <button v-if="feedback" @click="nextRound">Nästa runda</button>
    </div>

    <!-- Om spelet är över visas innehållet -->
    <div v-else>
      <h3>Game Over!</h3>
      <!-- Meddelande för vinst/förlust och knapp för att starta om spelet -->
      <p v-if="playerHP <= 0">😢 Du förlorade!<br>💪 Ge inte upp och försök igen!</p>
      <p v-else>👑 Du vann!<br>🥳 Den onda trollen Lurifax är besegrad!</p>
      <button @click="restartGame">Spela igen!</button>
    </div>
  </div>
</template>

<script setup>
// Composition API
// Importerar ref från Vue för att skapa reaktiva variabler
import { ref } from 'vue';

// Ljudfiler för olika knappar och händelser
const correctAnswerAudio = new Audio('/audio/battle-correct-answer.mp3');
const incorrectAnswerAudio = new Audio('/audio/battle-incorrect-answer.mp3');
const surrenderRoundAudio = new Audio('/audio/battle-give-up.mp3');
const nextRoundAudio = new Audio('/audio/battle-next-round.mp3');
const startBattleAudio = new Audio('/audio/start-battle.mp3');

// Definierar en array med 50 ord för spelet
const vocabularyList = [
// Djur
"Katt",
"Hund",
"Björn",
"Räv",
"Örn",
"Häst",
"Får",
"Säl",
"Varg",
"Uggla",
// Frukt & Grönsaker
"Äpple",
"Banan",
"Apelsin",
"Morot",
"Tomat",
"Päron",
"Paprika",
"Vindruva",
"Potatis",
"Melon",
// Klädesplagg
"Tröja",
"Byxa",
"Skjorta",
"Mössa",
"Handske",
"Strumpa",
"Kappa",
"Klänning",
"Sko",
"Jacka",
// Fordon
"Bil",
"Tåg",
"Cykel",
"Båt",
"Motorcykel",
"Lastbil",
"Helikopter",
"Raket",
"Buss",
"Moped",
// Saker i hemmet
"Bord",
"Stol",
"Säng",
"Fönster",
"Soffa",
"Dator",
"Gardin",
"Lampa",
"Klocka",
"Spegel"
];

// Variabler för att hantera spelarens och motståndarens HP samt skada (vid rätt/fel svar)
const damageOnCorrect = 10;
const damageOnIncorrect = 10;

// Skapar reaktiva variabler med ref
const playerHP = ref(100);
const opponentHP = ref(100);
const currentWord = ref("");
const scrambledWord = ref("");
const userAnswer = ref("");
const feedback = ref("");
const gameOver = ref(false);

// Funktion för att blanda om bokstäverna i ett ord
const scramble = (word) => {
  // Delar upp ordet i en array, blandar slumpmässigt och slår ihop igen
  let scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
  // Om scramble:ade ordet är samma som originalet, försök igen
  if (scrambled === word) {
    return scramble(word);
  } else {
    return scrambled;
  }
};

// Funktion för att starta en ny runda
const newRound = () => {
  // Välj ett slumpmässigt ord från vocabularyList och skapa ett blandat ord
  currentWord.value = vocabularyList[Math.floor(Math.random() * vocabularyList.length)];
  scrambledWord.value = scramble(currentWord.value);
  // Rensa spelarens tidigare svar och feedback
  userAnswer.value = "";
  feedback.value = "";
};

// Funktion som hanterar inlämning av svar
const submitAnswer = () => {
  if (!userAnswer.value.trim()) return; // Om inget svar matats in, avsluta funktionen

  // Rätt/fel svar ger feedback och skadar spelare/motståndare
  if (userAnswer.value.trim().toLowerCase() === currentWord.value.toLowerCase()) {
    feedback.value = `✅ Så ja!<br>🗡️ Du attackerade Lurifax!`;
    opponentHP.value -= damageOnCorrect;
    correctAnswerAudio.play();
  } else {
    feedback.value = `❌ Aj då: <strong>${currentWord.value}</strong> var rätt svar.<br>⚔️ Lurifax attackerade dig!`;
    playerHP.value -= damageOnIncorrect;
    incorrectAnswerAudio.play();
  }

  // Om spelarens/motståndarens HP är noll eller mindre, sätt gameOver till true
  if (playerHP.value <= 0 || opponentHP.value <= 0) {
    gameOver.value = true;
  }
};

// Funktion som kontrollerar vad som händer när man trycker på Enter
const onEnterPress = () => {
  if (feedback.value === '') {
    submitAnswer();
  } else {
    nextRound();
  }
};

// Funktion för att ge upp rundan
const surrenderRound = () => {
  feedback.value = `😞 Du gav upp!<br>💔 Lurifax attackerade dig!`;
  playerHP.value -= damageOnIncorrect;
  surrenderRoundAudio.play();

  if (playerHP.value <= 0) {
    gameOver.value = true;
  }
};

// Funktion för att gå vidare till nästa runda
const nextRound = () => {
  // Om spelet inte är över, starta ny runda och spela ljud
  if (!gameOver.value) {
    newRound();
    nextRoundAudio.play();
  }
};

// Funktion för att starta om spelet
const restartGame = () => {
  // Återställ spelets values och starta ny runda
  playerHP.value = 100;
  opponentHP.value = 100;
  gameOver.value = false;
  feedback.value = "";
  userAnswer.value = "";
  newRound();
  startBattleAudio.play();
};

// Starta spelet när komponenten laddas
newRound();
</script>

<style scoped>
.ordstriden-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

p {
  text-align: center;
  font-size: 1.25rem;
}

.styled {
  font-family: 'Bangers', sans-serif;
  font-size: 1.35em;
  color: #f77f00;
  text-shadow:
    -1px -1px 0 #111,
    1px -1px 0 #111,
    -1px 1px 0 #111,
    1px 1px 0 #111;
  letter-spacing: 0.15em;
}

.player-health-status {
  display: flex;
  justify-content: space-around;
  margin: 5px;
}

.player-health-status .player,
.player-health-status .opponent {
  padding: 10px;
  border-radius: 10px;
  width: 40%;
  font-family: 'Bangers', sans-serif;
  font-size: 1.2em;
}

input {
  width: 80%;
  display: block;
  margin: 20px auto;
  border: 2px solid #111;
  padding: 10px;
  font-family: "Arial", "Helvetica", "sans-serif";
  font-size: 1.1rem;
  background-color: #fff;
  border-radius: 5px;
}

button {
  margin: 0 5px;
  border: 3px solid #111;
  padding: 10px 20px;
  background-color: #f77f00;
  color: #111;
  font-size: 1.2em;
  font-family: 'Bangers', sans-serif;
  letter-spacing: 0.08em;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: #ff99cc;
}
</style>
