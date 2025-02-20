<template>
  <div id="app">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/parent">Parent</RouterLink>
      <RouterLink to="/play">Play</RouterLink>
      <RouterLink to="/quiz">Quiz</RouterLink>
      <RouterLink to="/results">Results</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style>
nav {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: lightgray;
}

nav a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}

@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Baloo+2:wght@400;700&display=swap');

body {
  font-family: 'Baloo 2', sans-serif;
}

h1 {
  font-family: 'Bangers', cursive;
}

h2 {
  font-family: 'Bangers', cursive;
}
</style>