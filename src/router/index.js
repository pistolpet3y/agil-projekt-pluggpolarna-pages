// Importerar funktioner från Vue Router
import { createRouter, createWebHistory } from 'vue-router';

// Importerar komponenter (vyer) som ska användas som sidor i routningen
import Home from '../views/Home.vue';
import Play from '../views/Play.vue';
import Quiz from '../views/Quiz.vue';
import Parent from '../views/Parent.vue';
import Results from '../views/Results.vue';

// Definierar en array med rutter
const routes = [
  { path: '/', component: Home },
  { path: '/parent', component: Parent },
  { path: '/play', component: Play },
  { path: '/quiz', component: Quiz },
  { path: '/results', component: Results },
];

// Skapar en router-instans
const router = createRouter({
  history: createWebHistory(),
  routes // Tilldelar sidans rutter till vår router
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
