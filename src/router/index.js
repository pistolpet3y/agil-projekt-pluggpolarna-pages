// Importerar funktioner från Vue Router
import { createRouter, createWebHistory } from 'vue-router';

// Importerar komponenter (vyer) som ska användas som sidor i routningen
import Home from '../views/Home.vue';
import Parent from '../views/Parent.vue';
import Results from '../views/Results.vue';

// Definierar en array med rutter
const routes = [
  { path: '/', component: Home },
  { path: '/parent', component: Parent },
  { path: '/results', component: Results }
];

// Skapar en router-instans
const router = createRouter({
  history: createWebHistory(),
  routes // Tilldelar sidans rutter till min router
});

// Exporterar routern så att den kan användas i main.js
export default router;
