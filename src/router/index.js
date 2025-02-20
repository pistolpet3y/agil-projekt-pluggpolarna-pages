// Importerar funktioner från Vue Router
import { createRouter, createWebHistory } from 'vue-router';

// Importerar komponenter (vyer) som ska användas som sidor i routningen
import Home from '../views/Home.vue';
import Play from '../views/Play.vue';
import Quiz from '../views/Quiz.vue';

// Definierar en array med rutter
const routes = [
  { path: '/', component: Home },
  { path: '/play', component: Play },
  { path: '/quiz', component: Quiz }
];

// Skapar en router-instans
const router = createRouter({
  history: createWebHistory(),
  routes // Tilldelar sidans rutter till vår router
});

// Exporterar routern så att den kan användas i main.js
export default router;
