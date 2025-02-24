<template>
  <!-- Rot-element för applikationen -->
  <div id="app">
    <header>
      <svg viewBox="0 -10 375 70" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ff6f61" />
            <stop offset="9.09%" stop-color="#ffb645" />
            <stop offset="18.18%" stop-color="#f7e300" />
            <stop offset="27.27%" stop-color="#4cb5f5" />
            <stop offset="36.36%" stop-color="#88d9b2" />
            <stop offset="45.45%" stop-color="#9b7eec" />
            <stop offset="54.54%" stop-color="#f77f00" />
            <stop offset="63.63%" stop-color="#7dffcb" />
            <stop offset="72.72%" stop-color="#c9c9ff" />
            <stop offset="81.81%" stop-color="#ff99cc" />
            <stop offset="90.90%" stop-color="#34d399" />
            <stop offset="100%" stop-color="#f59e42" />
          </linearGradient>
        </defs>

        <path id="MyPath" fill="none" d="M0 62.5 Q187.5 0 375 62.5" />

        <text text-anchor="middle" fill="url(#logoGradient)" font-family="Bangers" font-size="3.5rem">
          <textPath xlink:href="#MyPath" startOffset="50%">
            Pluggpolarna
          </textPath>
        </text>
      </svg>

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
    <div class="footer-line"></div>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
svg {
  margin-top: clamp(20px, 15vw, 170px);
}


/*
#4cb5f5 – Sky Blue
#f77f00 – Pumpkin Orange
#7dffcb – Mint Green
#ff99cc – Bubblegum Pink
*/

textPath {
  font-family: 'Bangers';
  font-size: 3.5rem;
  letter-spacing: 0.12em;
  text-shadow:
    2px 2px 1px #111;
}

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
    1px 1px 1px #111;
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
  color: #111;
  font-family: 'Baloo';
  font-size: 1.8rem;
  font-style: italic;
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

footer {
  background-image: url('/footer.png');
  background-repeat: no-repeat;
  font-family: 'Kidprint';
  width: 375px;
  height: 103px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.4rem;
  padding-bottom: 10px;
  letter-spacing: 0.2em;
}

footer p {
  margin-top: 80px;
}

.footer-line {
  display: flex;
  height: 10px;
  background: rgb(76, 181, 245);
  background: linear-gradient(90deg, rgba(76, 181, 245, 1) 10%, rgba(247, 127, 0, 1) 28%, rgba(255, 153, 204, 1) 57%, rgba(125, 255, 203, 1) 94%);
}

.social-icons {
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.social-icons:hover {
  transform: scale(1.03);
}
</style>
