<template>
  <!-- Rot-element för applikationen -->
  <div id="app">
    <header>


      <div id="banner"><img src="/cover-photo.png" alt="Pluggpolarna Cover"></div>
      <div id="tagLine">
        <p><span style="color: #4cb5f5;">Lär,</span> <span style="color: #f77f00">Lek</span> <span
            style="color: #7dffcb;">och</span> <span style="color: #ff99cc;">Lyckas!</span>
        </p>
      </div>
      <!-- Navigationscontainer -->
      <nav class=" navigation-list">
        <ul>
          <!-- Vue Router länkar till huvudsidorna -->
          <li><router-link to="/">Hem</router-link></li>
          <li><router-link to="/play">Spel</router-link></li>
          <li><router-link to="/quiz">Quiz</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Här renderas de vyer som definieras av Vue Router med en "blur" övergång -->
    <main>
      <transition name="blur" mode="out-in">
        <router-view />
      </transition>
    </main>

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
  background: linear-gradient(180deg, rgba(210, 222, 230, 1) 0%, rgba(240, 235, 226, 1) 100%);
  background-repeat: no-repeat;
  background-attachment: fixed;
}

#tagLine {
  text-align: center;
  display: flex;
  margin: auto;
  justify-content: center;
  font-family: 'Bangers';
  font-size: 1.5rem;
  letter-spacing: 0.3em;
  margin-bottom: 40px;
}

#tagLine p {
  text-shadow:
    1px 1px 0 #111;
}

#banner {
  display: block;
  margin: auto;
}

#banner img {
  margin-top: 80px;
  margin-bottom: 10px;
  width: 100%;
  vertical-align: bottom;
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
  border: 1px solid #000000;
  background-color: #7dffcb;
  color: #ffff;
  padding: 0px;
  font-size: 20px;
  width: 110px;
  border-radius: 10px;
  margin: auto;
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
  transition: opacity 0.3s ease-in-out;
}

.navigation-list li:hover::after {
  opacity: 1;
}

.navigation-list li:hover {
  box-shadow: 0px 2px 20px #4fcc9c;
  top: 3px;
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
  color: #000000;
  transition: color 0.3s ease-in-out, text-shadow 0.3s ease-in-out;
}

/*.navigation-list li a:hover {
  color: #ff99cc;
  text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.397);
}
*/

h2 {
  padding: 5px;
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
  background-image: url('/footer.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  justify-content: space-evenly;
  font-family: 'Kidprint';
  font-size: 1.4rem;
  text-align: center;
  letter-spacing: 0.15em;
  color: #111;
}

.social-icons {
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.social-icons:hover {
  transform: scale(1.03);
}
</style>
