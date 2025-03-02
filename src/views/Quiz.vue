<template>
  <div class="quiz-container">
    <h2>Glosquiz</h2>
    <!-- Om quiz:et inte är avslutat visas innehållet -->
    <div v-if="!quizFinished">
      <!-- Renderar aktuell fråga, poäng och quizfrågan -->
      <p class="styled">Fråga {{ currentIndex + 1 }} av {{ questions.length }}</p>
      <p class="styled">Poäng: <strong>{{ score }}</strong></p>
      <p>
        Vad är det engelska ordet för:
        <strong>{{ questions[currentIndex].svenska }}</strong>
      </p>
      <!-- Inmatningsfält för svar, binder svaret till userAnswer, @keyup.enter anropar funktionen onEnterPress -->
      <input v-model="userAnswer" :class="inputClass" type="text" placeholder="Skriv översättningen..." @keyup.enter="onEnterPress" />
      <!-- Visar feedback (rätt eller fel) om den finns -->
      <p v-if="feedback" v-html="feedback"></p>
      <!-- Om feedback finns och det inte är sista frågan visas knappen för nästa fråga -->
      <button v-if="feedback !== '' && currentIndex < questions.length - 1" @click="nextQuestion">
        Nästa fråga
      </button>
      <!-- Om feedback finns och vi är på sista frågan visas knappen för att avsluta quiz:et -->
      <button v-if="feedback !== '' && currentIndex === questions.length - 1" @click="finishQuiz">
        Avsluta
      </button>
      <!-- Om feedback inte finns visas knappen för att hoppa över frågan -->
      <button v-if="feedback === ''" @click="skipQuestion">Hoppa över</button>
      <!-- Knapp för att kontrollera svaret/gå vidare, syns bara om feedback är tom -->
      <button @click="checkAnswer" v-show="feedback === ''">
        Ok!
      </button>
    </div>
    <!-- Om quiz:et är avslutat visas resultatet -->
    <div v-else>
      <h3>Ditt Resultat</h3>
      <!-- Visar antalet rätt, knappar för att starta om och som leder till en mer detaljerad resultatvy -->
      <p>{{ score }} av {{ questions.length }} rätt!</p>
      <button @click="restartQuiz">Starta om</button>
      <!-- Gå till Results.vue, tillagd av Julia -->
      <button @click="showResults">Resultat</button>
    </div>
  </div>
</template>

<script setup>
// Composition API

// Importerar ref från Vue för att skapa reaktiva variabler
import { ref, computed } from 'vue';
// Importera useRouter, tillagd av Julia 24 feb
import { useRouter } from 'vue-router';
// Importera quizStore, tillagd av Julia 24 feb
import { useQuizStore } from '../stores/quizStore';


// Använd router för att navigera till resultat-sidan, tillagd av Julia 24 feb
const router = useRouter();
const quizStore = useQuizStore();

const correctAnswers = ref([]);  // tillagd av Julia 24 feb
const errorWords = ref([]); // Tillagd av Julia 27 feb

// Ljudfiler för olika knappar och händelser
const correctAnswerAudio = new Audio('/audio/quiz-correct-answer.mp3');
const incorrectAnswerAudio = new Audio('/audio/quiz-incorrect-answer.mp3');
const skipQuestionAudio = new Audio('/audio/quiz-skip-question.mp3');
const nextQuestionAudio = new Audio('/audio/click.mp3')
const startQuizAudio = new Audio('/audio/start-quiz.mp3');
const showResultsAudio = new Audio('/audio/show-results.mp3');

// Definierar en array med 100 glosor
const vocabularyList = [
  // Vanliga substantiv
  { svenska: 'Boll', engelska: 'Ball' },
  { svenska: 'Katt', engelska: 'Cat' },
  { svenska: 'Hund', engelska: 'Dog' },
  { svenska: 'Bok', engelska: 'Book' },
  { svenska: 'Penna', engelska: 'Pen' },
  { svenska: 'Skola', engelska: 'School' },
  { svenska: 'Hus', engelska: 'House' },
  { svenska: 'Bil', engelska: 'Car' },
  { svenska: 'Cykel', engelska: ['Bike', 'Bicycle'] },
  { svenska: 'Äpple', engelska: 'Apple' },
  { svenska: 'Bord', engelska: 'Table' },
  { svenska: 'Stol', engelska: 'Chair' },
  { svenska: 'Dator', engelska: 'Computer' },
  { svenska: 'Fågel', engelska: 'Bird' },
  { svenska: 'Fisk', engelska: 'Fish' },
  { svenska: 'Träd', engelska: 'Tree' },
  { svenska: 'Blomma', engelska: 'Flower' },
  { svenska: 'Gata', engelska: 'Street' },
  { svenska: 'Väska', engelska: 'Bag' },
  { svenska: 'Klocka', engelska: 'Clock' },
  // Vanliga verb
  { svenska: 'Springa', engelska: 'Run' },
  { svenska: 'Hoppa', engelska: 'Jump' },
  { svenska: 'Äta', engelska: 'Eat' },
  { svenska: 'Dricka', engelska: 'Drink' },
  { svenska: 'Läsa', engelska: 'Read' },
  { svenska: 'Skriva', engelska: 'Write' },
  { svenska: 'Sova', engelska: 'Sleep' },
  { svenska: 'Vakna', engelska: 'Wake up' },
  { svenska: 'Simma', engelska: 'Swim' },
  { svenska: 'Sjunga', engelska: 'Sing' },
  { svenska: 'Dansa', engelska: 'Dance' },
  { svenska: 'Gå', engelska: 'Walk' },
  { svenska: 'Ropa', engelska: ['Shout', 'Yell'] },
  { svenska: 'Sitta', engelska: 'Sit' },
  { svenska: 'Stå', engelska: 'Stand' },
  { svenska: 'Leka', engelska: 'Play' },
  { svenska: 'Räkna', engelska: 'Count' },
  { svenska: 'Rita', engelska: 'Draw' },
  { svenska: 'Lyssna', engelska: 'Listen' },
  { svenska: 'Titta', engelska: 'Look' },
  // Vanliga adjektiv
  { svenska: 'Glad', engelska: ['Happy', 'Glad'] },
  { svenska: 'Ledsen', engelska: 'Sad' },
  { svenska: 'Stor', engelska: 'Big' },
  { svenska: 'Liten', engelska: ['Small', 'Little'] },
  { svenska: 'Snabb', engelska: 'Fast' },
  { svenska: 'Långsam', engelska: 'Slow' },
  { svenska: 'Varm', engelska: ['Warm', 'Hot'] },
  { svenska: 'Kall', engelska: 'Cold' },
  { svenska: 'Tung', engelska: 'Heavy' },
  { svenska: 'Lätt', engelska: ['Light', 'Easy'] },
  { svenska: 'Fin', engelska: 'Pretty' },
  { svenska: 'Ful', engelska: 'Ugly' },
  { svenska: 'Snäll', engelska: 'Kind' },
  { svenska: 'Arg', engelska: 'Angry' },
  { svenska: 'Trött', engelska: 'Tired' },
  { svenska: 'Stark', engelska: 'Strong' },
  { svenska: 'Svag', engelska: 'Weak' },
  { svenska: 'Ren', engelska: 'Clean' },
  { svenska: 'Smutsig', engelska: 'Dirty' },
  { svenska: 'Ny', engelska: 'New' },
  // Färger
  { svenska: 'Röd', engelska: 'Red' },
  { svenska: 'Blå', engelska: 'Blue' },
  { svenska: 'Grön', engelska: 'Green' },
  { svenska: 'Gul', engelska: 'Yellow' },
  { svenska: 'Svart', engelska: 'Black' },
  { svenska: 'Vit', engelska: 'White' },
  { svenska: 'Brun', engelska: 'Brown' },
  { svenska: 'Grå', engelska: 'Gray' },
  { svenska: 'Rosa', engelska: 'Pink' },
  { svenska: 'Lila', engelska: 'Purple' },
  // Prepositioner
  { svenska: 'På', engelska: 'On' },
  { svenska: 'Under', engelska: 'Under' },
  { svenska: 'I', engelska: 'In' },
  { svenska: 'Vid', engelska: 'By' },
  { svenska: 'Mellan', engelska: 'Between' },
  { svenska: 'Framför', engelska: 'In front of' },
  { svenska: 'Bakom', engelska: 'Behind' },
  { svenska: 'Bredvid', engelska: 'Next to' },
  { svenska: 'Över', engelska: 'Over' },
  { svenska: 'Genom', engelska: 'Through' },
  // Pronomen och småord
  { svenska: 'Jag', engelska: 'I' },
  { svenska: 'Du', engelska: 'You' },
  { svenska: 'Han', engelska: 'He' },
  { svenska: 'Hon', engelska: 'She' },
  { svenska: 'Vi', engelska: 'We' },
  { svenska: 'De', engelska: 'They' },
  { svenska: 'Här', engelska: 'Here' },
  { svenska: 'Där', engelska: 'There' },
  { svenska: 'När', engelska: 'When' },
  { svenska: 'Varför', engelska: 'Why' },
  // Frågeord och tidsuttryck
  { svenska: 'Vad', engelska: 'What' },
  { svenska: 'Vem', engelska: 'Who' },
  { svenska: 'Hur', engelska: 'How' },
  { svenska: 'Nu', engelska: 'Now' },
  { svenska: 'Sen', engelska: 'Later' },
  { svenska: 'Idag', engelska: 'Today' },
  { svenska: 'Imorgon', engelska: 'Tomorrow' },
  { svenska: 'Igår', engelska: 'Yesterday' },
  { svenska: 'Alltid', engelska: 'Always' },
  { svenska: 'Aldrig', engelska: 'Never' }
];

const totalQuestions = 10;
// Skapar reaktiva variabler med ref
const currentIndex = ref(0);
const questions = ref([]);
const userAnswer = ref("");
const feedback = ref("");
const score = ref(0);
const quizFinished = ref(false);

// Funktion som blandar en array slumpmässigt
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

// Funktion för att starta (eller starta om) quiz:et
const startQuiz = () => {
  questions.value = shuffle([...vocabularyList]).slice(0, totalQuestions); // Väljer ut slumpmässiga frågor från gloslistan
  // Ställer om alla värden för quiz:et
  currentIndex.value = 0;
  userAnswer.value = "";
  feedback.value = "";
  score.value = 0;
  quizFinished.value = false;
  errorWords.value = [];
};

// Anropar funktionen för att starta quiz:et så fort sidan laddas
startQuiz();

// Funktion som kontrollerar användarens svar och ger rätt feedback
const checkAnswer = () => {
  // Användarens svar, trimmar bort onödiga mellanslag och gör om till små bokstäver
  const userInput = userAnswer.value.trim().toLowerCase();
  const currentEntry = questions.value[currentIndex.value];

  let isCorrect = false;

  // Om det engelska ordet är en array, kolla om användarens svar finns i arrayen
  if (Array.isArray(currentEntry.engelska)) {
    isCorrect = currentEntry.engelska
      .map((word) => word.toLowerCase())
      .includes(userInput);
  } else {
    isCorrect = userInput === currentEntry.engelska.toLowerCase();
  }

  // Uppdatera poäng och feedback beroende på om svaret är rätt eller fel
  if (isCorrect) {
    feedback.value = "✅ Rätt! Bra jobbat :)";
    score.value++;
    correctAnswerAudio.play();
  } else {
    feedback.value = `❌ Fel! Rätt svar är: <strong>${questions.value[currentIndex.value].engelska}</strong>`;
    incorrectAnswerAudio.play();
    // Tillagd av Julia 27 feb: Spara felaktiga ord
    errorWords.value.push(currentEntry.svenska);
  }
};

// Skapar en computed property för att bestämma vilken klass som ska användas för input-fältet när man får feedback
const inputClass = computed(() => {
  if (!feedback.value) return '';
  return feedback.value.startsWith('✅') ? 'correct-input' : 'incorrect-input';
});

// Funktion som kontrollerar vad som händer när man trycker på Enter
const onEnterPress = () => {
  if (feedback.value === '') {
    checkAnswer();
  } else {
    nextQuestion();
    nextQuestionAudio.play();
  }
};

// Funktion för att gå vidare till nästa fråga
const nextQuestion = () => {
  // Om det inte är sista frågan, öka indexet, töm svar och rensa feedback
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++;
    userAnswer.value = "";
    feedback.value = "";
    nextQuestionAudio.play();
    // Om det är sista frågan, avsluta quiz:et
  } else {
    quizFinished.value = true;
  }
};

// Funktion för att hoppa över frågan
const skipQuestion = () => {
  errorWords.value.push(questions.value[currentIndex.value].svenska);

  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++;
    userAnswer.value = "";
    feedback.value = "";
    skipQuestionAudio.play();
  } else {
    quizFinished.value = true;
    skipQuestionAudio.play();
  }
};

const finishQuiz = () => {
  quizFinished.value = true;
};

const restartQuiz = () => {
  startQuiz();
  startQuizAudio.play();
};

// Leder till en mer detaljerad resultatvy
const showResults = () => {
  quizStore.setQuizResults(score.value, errorWords.value);  // Uppdaterar store med resultaten, ändrad av Julia 24 feb
  router.push('/results'); // Navigera till results-sidan, ändrad av Julia 24 feb
  showResultsAudio.play();
};
</script>

<style scoped>
.quiz-container {
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
}

p {
  text-align: center;
  font-size: 1.05rem;
}

.styled {
  font-family: 'Bangers', sans-serif;
  font-size: 1.35em;
  color: #7dffcb;
  text-shadow:
    -1px -1px 0 #111,
    1px -1px 0 #111,
    -1px 1px 0 #111,
    1px 1px 0 #111;
  letter-spacing: 0.15em;
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

.correct-input {
  border: 2px solid #7dffcb;
  box-shadow: 0 0 2px rgba(0, 0, 0, 1);
  color: #7dffcb;
  text-shadow:
    -1px -1px 0 #111,
    1px -1px 0 #111,
    -1px 1px 0 #111,
    1px 1px 0 #111;
}

.incorrect-input {
  border: 2px solid #F5505D;
  color: #F5505D;
}

input:focus {
  outline: none;
}

button {
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

button:hover {
  background-color: #ff99cc;
}
</style>