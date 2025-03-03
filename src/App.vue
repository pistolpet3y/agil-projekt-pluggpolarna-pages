<template>
  <!-- Rot-element för applikationen -->
  <div id="app">
    <header>
      <Header />
      <!-- Navigationscontainer -->
      <nav class="navigation-list">
        <ul>
          <!-- Vue Router länkar till huvudsidorna -->
          <li @mouseover="playNavBarHoverAudio" @click="playNavBarClickAudio">
            <router-link to="/">Hem</router-link>
          </li>
          <li @mouseover="playNavBarHoverAudio" @click="playNavBarClickAudio">
            <router-link to="/play">Spel</router-link>
          </li>
          <li @mouseover="playNavBarHoverAudio" @click="playNavBarClickAudio">
            <router-link to="/konto">Konto</router-link>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Här renderas de vyer som definieras av Vue Router med en "blur" övergång -->
    <main>
      <transition name="blur" mode="out-in">
        <router-view />
      </transition>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

const navBarHoverAudio = new Audio('/audio/nav-bar-hover.mp3');
const navBarClickAudio = new Audio('/audio/nav-bar-click.mp3');

function playNavBarHoverAudio() {
  navBarHoverAudio.play();
};

function playNavBarClickAudio() {
  navBarClickAudio.play();
};
</script>


<style>
svg {
  margin-top: clamp(20px, 15vw, 120px);
}


/*
#4cb5f5 – Sky Blue
#f77f00 – Pumpkin Orange
#7dffcb – Mint Green
#ff99cc – Bubblegum Pink
*/

@font-face {
  font-family: 'Baloo';
  src: url('/fonts/Baloo.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Bangers';
  src: url('/fonts/Bangers.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}


@font-face {
  font-family: 'Kidprint';
  src: url('/fonts/Kidprint.otf') format('opentype');
  font-weight: bold;
  font-style: normal;
}

/* router-view transition */
.blur-enter-active,
.blur-leave-active {
  transition: filter 0.8s ease, opacity 0.8s ease;
}

.blur-enter-from,
.blur-leave-to {
  filter: blur(20px);
  opacity: 0;
}

.blur-enter-to,
.blur-leave-from {
  filter: blur(0);
  opacity: 1;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  font-family: "Arial", "Helvetica", "sans-serif";
  font-size: 1.05rem;
  color: #111;
  background: linear-gradient(to bottom,
      lightblue 0%,
      lightblue 66%,
      #FFF8E1 100%);
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.navigation-list ul {
  margin-bottom: 60px;
  display: flex;
  padding: 0;
  list-style-type: none;
  font-family: 'Bangers';
  font-size: 1.25em;
  letter-spacing: 0.3em;
}

.navigation-list li {
  width: 110px;
  margin: auto;
  border: 3px solid #111;
  background-color: #7dffcb;
  color: #fff;
  font-size: 20px;
  border-radius: 10px;
  position: relative;
  /*box-shadow: 5px 5px 5px #a3ffe0;*/
  transition: all 0.3s ease;
}

.navigation-list li::after {
  content: "";
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 10px;
  background-image: url('/underline.png');
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0;
  transition: all 0.3s ease-in-out;
}

.navigation-list li:hover::after {
  opacity: 1;
}

.navigation-list li:hover {
  box-shadow: 0px 0px 30px #f77f00;
  top: 4px;
}

.navigation-list li:active {
  box-shadow: none;
  top: 5px;
}

.navigation-list li a {
  display: block;
  padding: 12px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  color: #111;
  transition: color 0.3s ease-in-out, text-shadow 0.3s ease-in-out;
}

.navigation-list li a:hover {
  color: #f77f00;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 1);
}

h2 {
  padding: 5px;
  color: #FFF8E1;
  font-family: 'Baloo';
  font-size: 1.8rem;
  font-style: italic;
  text-align: center;
  letter-spacing: 0.3em;
  text-shadow:
    3px 3px 1px #111,
    -1px 1px 1px #111,
    1px -1px 1px #111,
    -1px -1px 1px #111;
}

h3 {
  padding: 5px;
  color: #111;
  font-family: 'Kidprint';
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  letter-spacing: 0.3em;
}

p {
  text-align: justify;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.6);
  line-height: 1.8;
}

.text-link {
  color: dodgerblue;
  text-decoration: none;
  transition: all 0.6s ease;
}

.text-link:hover {
  color: blue;
}
</style>
