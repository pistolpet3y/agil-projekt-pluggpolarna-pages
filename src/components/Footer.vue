<template>
  <div class="social-icons">
    <img src="./socials/social_fb.png" alt="facebook">
    <img src="./socials/social_ig.png" alt="instagram">
    <img src="./socials/social_x.png" alt="x">
  </div>
  <Basketball />
  <meta content="width=device-width, initial-scale=1" name="viewport" />
  <footer style="position: relative;">
    <p>&copy; 2025 Pluggpolarna</p>
    <!-- Footer-line visas ovanpå -->
    <div class="footer-line"></div>
    <!-- Footer-span ligger bakom -->
    <div class="footer-span"></div>
  </footer>
</template>

<script>
import Basketball from './Basketball.vue';

export default {
  name: 'App',
  components: {
    Basketball
  }
};
</script>


<style scoped>
.social-icons {
  width: 375px;
  position: relative;
  bottom: -45px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: auto;
  display: flex;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  z-index: 2;
}

.social-icons img {
  width: 25px;
  height: 25px;
}

.social-icons img:hover {
  transform: scale(1.5);
}

footer {
  background-image: url('.footer.png');
  background-repeat: no-repeat;
  font-family: 'Kidprint';
  max-width: 375px;
  height: 103px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.4rem;
  padding-bottom: 10px;
  letter-spacing: 0.2em;
  position: relative;
  bottom: 10px;
}

footer p {
  margin-top: 80px;
}

.footer-line {
  position: fixed;
  bottom: 0;
  width: 375px;
  height: 10px;
  z-index: 1;
  background: linear-gradient(90deg, rgba(76, 181, 245, 1) 10%, rgba(247, 127, 0, 1) 28%, rgba(255, 153, 204, 1) 57%, rgba(125, 255, 203, 1) 94%);
}

.footer-span {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 10px;
  z-index: -1;
  background: linear-gradient(90deg, rgba(76, 181, 245, 1) 50%, rgba(125, 255, 203, 1) 50%);
}

@media screen and (max-width: 480px) {

  footer {
    bottom: 7px;
  }
}
</style>