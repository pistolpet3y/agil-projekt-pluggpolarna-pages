// Importerar funktioner från Vue Router
import { createRouter, createWebHashHistory } from 'vue-router';

// Importerar komponenter (vyer) som ska användas som sidor i routningen
import Home from '../views/Home.vue';
import Play from '../views/Play.vue';
import Info from '../views/Info.vue';
import Glosquiz from '../views/Glosquiz.vue';
import Mattemagi from '../views/Mattemagi.vue';
import Ordstriden from '../views/Ordstriden.vue';
import Parent from '../views/Parent.vue';
import Results from '../views/Results.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';
import ChooseQuiz from '../views/ChooseQuiz.vue';
import SavedWordsQuiz from '../views/SavedWordsQuiz.vue';
import ResultsSavedWordsQuiz from '../views/ResultsSavedWordsQuiz.vue';


// Definierar en array med rutter
const routes = [
  { path: '/', component: Home },
  { path: '/play', component: Play },
  { path: '/info', component: Info },
  { path: '/glosquiz', component: Glosquiz },
  { path: '/mattemagi', component: Mattemagi },
  { path: '/ordstriden', component: Ordstriden },
  { path: '/parent', component: Parent },
  { path: '/results', component: Results },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/choosequiz', component: ChooseQuiz },
  { path: '/savedwordsquiz', component: SavedWordsQuiz },
  { path: '/resultssavedwordsquiz', component: ResultsSavedWordsQuiz },
];

// Skapar en router-instans
const router = createRouter({
  history: createWebHashHistory(),
  routes, // Tilldelar sidans rutter till vår router
  scrollBehavior() {
    return { top: 0 }; // Scrollar upp till toppen av sidan vid sidbyte
  }
});

//Koden nedan är för att byta bakgrundsbild på sidorna
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

watch(route, () => {
  choosePic(); // Triggar om vid varje sidbyte
});


// Exporterar routern så att den kan användas i main.js
export default router;
