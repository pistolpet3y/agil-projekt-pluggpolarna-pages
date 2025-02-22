<template>
  <div class="content-wrapper">
    
    <img :src="randomImage" alt="Tecknad figur" class="character-image" id="randomImage" :style="{ left: leftValue }">

    
    <div class="text-content">
      <h2>Välkommen!</h2>
      
      <p>Välkommen till Pluggpolarna - en lekfull och interaktiv plattform där barn utvecklar sina kunskaper i stavning, glosor och matematik genom roliga spel och utmaningar!</p>
      
    </div>
  </div>
</template>

<style>
.text-content {
  flex: 1; 
  text-align: left; 
  margin-left: 40px;
  margin-right: 10px;
}

.content-wrapper {
  margin-top: 150px;
  position: relative; 
}

.character-image {
  margin-top: 40px; 
  position: absolute;
  top: 50%;
  transform: translateY(-50%); 
}
</style>



<script setup>

/* script för att slumpa fram en bild */

import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const randomImage = ref("");
const leftValue = ref("");

const randomizeImage = [
  { src: "/p-1s.png", left: "-140px" },
  { src: "/f-1s.png", left: "-200px" }
];

function choosePic() {
  const randomNum = Math.floor(Math.random() * randomizeImage.length);
  const selectedImage = randomizeImage[randomNum];

  randomImage.value = selectedImage.src;
  leftValue.value = selectedImage.left;
}

onMounted(() => {
  choosePic();
});

watch(route, () => {
  choosePic();
});


</script>