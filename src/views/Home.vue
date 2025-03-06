<template>
  <div class="content-wrapper">
    <RandomImage category="home" /> <!-- Skickar in "home" som kategori -->
    <div class="text-content">
      <h2>Välkommen!</h2>
      <p>Välkommen till Pluggpolarna - en lekfull och interaktiv plattform där barn utvecklar sina kunskaper i stavning,
        glosor och matematik genom roliga spel och utmaningar!</p>
    </div>
  </div>
</template>

<script setup>
import RandomImage from '../components/RandomImage.vue';


</script>



<style>
.text-content {
  flex: 1;
  text-align: left;
  margin-left: 20px;
  margin-right: 20px;
}

.content-wrapper {
  margin-top: 80px;
  position: relative;
}

.character-image {
  z-index: 10;
  margin-top: 40px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>