<template>
  <!-- Rot-element för applikationen -->
  <div id="app">
    <header>
      <!---->
      <Header />
      <!-- Navigationscontainer -->
      <nav class="navigation-list">
        <ul>
          <li @mouseover="playNavBarHoverAudio" @click="playNavBarClickAudio">
            <router-link to="/" class="button">Hem</router-link>
            <div id="blue-mark"></div>
          </li>

          <li @mouseover="playNavBarHoverAudio" @click="playNavBarClickAudio">
            <router-link to="/play" class="button">Spel</router-link>
            <div id="orange-mark"></div>
          </li>

          <li @mouseover="playNavBarHoverAudio" @click="playNavBarClickAudio">
            <router-link to="/info" class="button">Info</router-link>
            <div id="pink-mark"></div>
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
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <Footer />
  </div>
</template>

<script setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

const navBarHoverAudio = new Audio('./audio/nav-bar-hover.mp3');
const navBarClickAudio = new Audio('./audio/nav-bar-click.mp3');

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
  src: url('./fonts/Baloo.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Bangers';
  src: url('./fonts/Bangers.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}


@font-face {
  font-family: 'Kidprint';
  src: url('./fonts/Kidprint.otf') format('opentype');
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

.navigation-list li:nth-child(1) .button {
  background-color: #4cb5f5;
}

.navigation-list li:hover #blue-mark {
  display: block;
}

.navigation-list li:nth-child(2) .button {
  background-color: #f77f00;
}

.navigation-list li:nth-child(3) .button {
  background-color: #ff99cc;
}

.navigation-list {
  position: relative;
}

.navigation-list li {
  position: relative;
  list-style: none;
}

#blue-mark,
#orange-mark,
#pink-mark {
  position: absolute;
  top: 110%;
  left: 50%;
  transform: translateX(-50%);
  width: 83px;
  height: 11px;
  background-size: contain;
  background-repeat: no-repeat;
  display: none;
}

.navigation-list li:hover #blue-mark {
  display: block;
  background-image: url('./blue-line.png');
}

.navigation-list li:hover #orange-mark {
  display: block;
  background-image: url('./orange-line.png');
}

.navigation-list li:hover #pink-mark {
  display: block;
  background-image: url('./pink-line.png');
}

ul li:nth-child(1) {
  transform: rotate(-2deg);
  transition: transform 0.2s ease-in-out;
}

ul li:nth-child(1):hover {
  transform: rotate(-4deg);
}

ul li:nth-child(3) {
  transform: rotate(2deg);
}

ul li:nth-child(3):hover {
  transform: rotate(4deg);
  transition: transform 0.2s ease-in-out;
}

.button {
  border: 0 solid #E5E7EB;
  box-sizing: border-box;
  color: #000000;
  padding: 7px 20px;
  display: flex;
  font-family: bangers, Arial, Helvetica, sans-serif;
  font-size: 1.9rem;
  justify-content: center;
  text-align: center;
  min-width: 100px;
  min-height: 45px;
  cursor: pointer;

  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button:focus {
  outline: 0;
}

.button:after {
  content: '';
  position: absolute;
  border: 1px solid #000000;
  bottom: 4px;
  left: 4px;
  width: calc(100% - 1px);
  height: calc(100% - 1px);
  box-shadow: 2px -2px 1px #111,
    -1px 1px 1px #111,
    1px -1px 1px #111,
    -1px -1px 1px #111;
}

.button:hover:after {
  bottom: 2px;
  left: 2px;
}

.navigation-list li .button:hover {
  background-color: #7dffcb;
}

.navigation-list li .button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  max-width: 200px;
  text-decoration: none;
}

.navigation-list ul {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
  padding: 10px;
}

.navigation-list li {
  list-style: none;
}


@media only screen and (max-width: 480px) {

  .character-image {
    display: none;
  }

  .navigation-list li a {
    padding: 7px;
    font-size: 1.5rem;
  }

  .navigation-list ul {
    display: flex;
    justify-content: center;
    gap: 6px;
  }

  .navigation-list li {
    width: 100px;
    margin: 0 4px;
  }


  #app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .footer-span {
    display: hidden;
  }

  .footer-line {
    display: flex;
  }

  .text-content {
    flex: 1;
    text-align: left;
    margin-left: 20px !important;
    margin-right: 20px !important;
  }

  .content-wrapper {
    margin-top: 20px !important;
  }
}
</style>
