<template>
  <div class="quiz-container">
    <div class="header-container">
      <h2>Glosquiz</h2>
      <InfoButton color="green"
        :infoContent="`Välkommen till ditt egna Glosquiz där du får öva på de ord du lagt in.<br><br>Varje rätt svar ger dig poäng och visar hur duktig du är på engelska!<br><br>Tänk efter, skriv in din översättning och ha kul medan du lär dig nya ord! Lycka till! 🙌`"
        id="info" />
    </div>
    <!-- Meddelande som visas om inga ord finns i quizet -->
    <p v-if="vocabularyList.length === 0">
      Du har inga ord i din lista än! Lägg till ord först!
    </p>

    <!-- Button för att gå tillbaka till Parent.vue -->
    <router-link to="/parent">
      <button class="parent-button">Redigera glosor</button>
    </router-link>
    <!-- Om quiz:et inte är avslutat visas innehållet -->
    <div v-if="!quizFinished">
      <!-- Renderar aktuell fråga, poäng och quizfrågan -->
      <p class="styled">Fråga {{ currentIndex + 1 }} av {{ questions.length }}</p>
      <p class="styled">Poäng: <strong>{{ score }}</strong></p>
      <p v-if="currentQuestion">
        Vad är det engelska ordet för:
        <strong>{{ questions[currentIndex].svenska }}</strong>
      </p>
      <!-- Inmatningsfält för svar, binder svaret till userAnswer, @keyup.enter anropar funktionen onEnterPress -->
      <input v-model="userAnswer" :class="inputClass" type="text" placeholder="Skriv översättningen..."
        @keyup.enter="onEnterPress" />
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
      <button v-if="feedback === '' && currentIndex < questions.length - 1" @click="skipQuestion">Hoppa över</button>
      <!-- Knapp för att kontrollera svaret/gå vidare, syns bara om feedback är tom -->
      <button @click="checkAnswer" v-show="feedback === ''">
        Ok!
      </button>
    </div>
  </div>
</template>

<script setup>

// Importer
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
// Importera stores från pinia 
import { useQuizStore } from '../stores/quizStore';
import { useWordsStore } from '../stores/wordsStore';
// Importera info-knapp
import InfoButton from '../components/InfoButton.vue';

// Använd router 
const router = useRouter();
// Använd pinia stores
const quizStore = useQuizStore();
const wordsStore = useWordsStore();

// Antal frågor
const totalQuestions = computed(() => vocabularyList.value.length);

// Skapar reaktiva variabler med ref
const currentIndex = ref(0);
const questions = ref([]);
const userAnswer = ref("");
const feedback = ref("");
const score = ref(0);
const quizFinished = ref(false);
const errorWords = ref([]);
const vocabularyList = ref([]);

// Ljudfiler för olika knappar och händelser
const correctAnswerAudio = new Audio('/audio/quiz-correct-answer.mp3');
const incorrectAnswerAudio = new Audio('/audio/quiz-incorrect-answer.mp3');
const skipQuestionAudio = new Audio('/audio/quiz-skip-question.mp3');
const nextQuestionAudio = new Audio('/audio/click.mp3')
const startQuizAudio = new Audio('/audio/start-quiz.mp3');
const showResultsAudio = new Audio('/audio/show-results.mp3');
const clickAudio = '/audio/click.mp3'

// Funktion som spelar upp ljud
const playClickAudio = () => {
  const audio = new Audio(clickAudio);
  audio.play();
};

// Kontroll för att den ska returnera null om inga ord finns tillagt
const currentQuestion = computed(() => {
  return questions.value[currentIndex.value] || null;
})

// Funktion som blandar en array slumpmässigt
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

// Funktion för att starta (eller starta om) quiz:et
const startQuiz = () => {
  errorWords.value = []; // Rensa tidigare felaktiga ord
  if (vocabularyList.value.length === 0) return; // Säkerställ att det finns glosor
  questions.value = shuffle([...vocabularyList.value]).slice(0, totalQuestions.value);
  currentIndex.value = 0;
  userAnswer.value = "";
  feedback.value = "";
  score.value = 0;
  quizFinished.value = false;
};

// Lägg till en watcher för att vänta på att glosorna har laddats
watch(
  () => wordsStore.words,
  (newWords) => {
    if (Array.isArray(newWords) && newWords.length > 0) {
      vocabularyList.value = newWords;
      startQuiz();  // Startar quizet 
    }
  },
  { immediate: true }
);

onMounted(() => {
  wordsStore.loadWords();  // Ladda glosorna när komponenten monteras
});

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
    feedback.value = "✅ Rätt! Bra jobbat! :)";
    score.value++;
    correctAnswerAudio.play();
  } else {
    feedback.value = `❌ Fel! Rätt svar var: <strong>${questions.value[currentIndex.value].engelska}</strong>`;
    incorrectAnswerAudio.play();
    // Sparar felaktiga ord
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

// Avsluta quizet
const finishQuiz = () => {
  quizFinished.value = true;
  showResults();
};

/*
// Starta om quizet
const restartQuiz = () => {
  startQuiz();
  startQuizAudio.play();
};
*/

// Leder till en mer detaljerad resultatvy
const showResults = () => {
  quizStore.setQuizResults(score.value, errorWords.value);  // Uppdaterar store med resultaten
  router.push('/resultssavedwordsquiz'); // Navigera till results-sidan
  showResultsAudio.play();
};
</script>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: center;
  /* Centrerar innehållet horisontellt */
  position: relative;
  /* Behåller möjligheten att positionera innehåll */
}

#info {
  margin-left: 10px;
  /* Skapar mellanrum mellan rubrik och knapp */
}


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
  border: 3px solid #111;
  padding: 10px;
  font-family: "Arial", "Helvetica", "sans-serif";
  font-size: 1.1rem;
  letter-spacing: 0.15em;
  background-color: #fff;
  border-radius: 5px;
}

.correct-input {
  border: 3px solid #7dffcb;
  box-shadow: 0 0 5px rgba(0, 0, 0, 1);
  color: #7dffcb;
  text-shadow:
    -1px -1px 0 #111,
    1px -1px 0 #111,
    -1px 1px 0 #111,
    1px 1px 0 #111;
}

.incorrect-input {
  border: 3px solid #F5505D;
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

.parent-button {
  margin-bottom: 10px;
  background-color: #f77f00;
}

button:hover {
  background-color: #ff99cc;
}

@media only screen and (max-width: 480px) {
  h2 {
    font-size: 1.5rem;
    margin-top: -15px !important;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.1rem !important;
    margin-top: 4px !important;
    margin-bottom: 10px !important;
  }

  input {
    width: 75%;
  }

  button {
    padding: 8px 13px;
  }

  #info {
    transform: translateY(-60%);
    display: inline-block;
  }
}
</style>