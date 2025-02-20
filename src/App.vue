<template>
  <!-- Rot-element för applikationen -->
  <div id="app">
    <header>
      <h1><img src="/public/cover-photo.png" alt="Pluggpolarna Cover"></h1>
      <!-- Navigationscontainer -->
      <nav class="navigation-list">
        <ul>
          <!-- Vue Router länkar till huvudsidorna -->
          <li><router-link to="/">Hem</router-link></li>
          <li><router-link to="/contact">Spel</router-link></li>
          <li><router-link to="/contact">Quiz</router-link></li>
        </ul>
      </nav>
    </header>
    <hr>

    <!-- Här renderas de vyer som definieras av Vue Router med en "blur" övergång -->
    <transition name="blur" mode="out-in">
      <router-view />
    </transition>

    <footer>
      <div class="social-icons">
      </div>
      <p>&copy; 2025 Pluggpolarna</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
/*
#4cb5f5 – Sky Blue
#f77f00 – Pumpkin Orange
#7dffcb – Mint Green
#ff99cc – Bubblegum Pink

logo color: linear-gradient(to right, #ff6f61, #ffb645, #f7e300, #4cb5f5, #88d9b2, #9b7eec, #f77f00, #7dffcb, #c9c9ff, #ff99cc, #34d399, #f59e42);
*/
@font-face {
  font-family: 'Baloo';
  src: url('@/assets/fonts/Baloo.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Bangers';
  src: url('@/assets/fonts/Bangers.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Kidprint';
  src: url('@/assets/fonts/Kidprint.otf') format('opentype');
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

body {
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Arial", "Helvetica", "sans-serif";
  font-size: 1.05rem;
  color: #111;
  background: #f0ebe2;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
}

h1 {
  display: block;
  margin: auto;
  border: 4px solid #4cb5f5;
  border-radius: 10px;
  font-family: 'Bangers';
  font-size: 2rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.4em;
}

h1 img {
  width: 100%;
  vertical-align: bottom;
  border-radius: 6px;
}

.navigation-list ul {
  display: flex;
  padding: 0;
  list-style-type: none;
  font-family: 'Bangers';
  font-size: 1.25em;
  letter-spacing: 0.3em;
}

.navigation-list li {
  flex: 1;
  margin: 0 1px;
  border: 4px solid #4cb5f5;
  background-color: #7dffcb;
  border-radius: 20px;
  transition: background-color 0.3s ease-in-out;
}

.navigation-list li:hover {
  background-color: #ff99cc;
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
  color: #7dffcb;
  text-shadow: 0px 0px 6px rgba(0, 0, 0, 1);
}

h2 {
  padding: 5px;
  border: 3px solid #4cb5f5;
  border-radius: 10px;
  background-color: #7dffcb;
  color: #111;
  font-family: 'Baloo';
  font-size: 1.5rem;
  font-style: italic;
  text-align: center;
  letter-spacing: 0.3em;
}

p {
  text-align: justify;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
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

footer {
  display: flex;
  margin-top: 20px;
  border: 3px solid #4cb5f5;
  justify-content: space-evenly;
  font-family: 'Kidprint MT Pro';
  font-size: 1.4rem;
  text-align: center;
  letter-spacing: 0.15em;
  background-color: #fff;
  color: #111;
  border-radius: 40px;
}

.social-icons {
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.social-icons:hover{
  transform: scale(1.03);
}
</style>
