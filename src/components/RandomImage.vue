<template>
  <img :src="randomImage" alt="Tecknad figur" class="character-image" id="randomImage"
    :style="{ left: leftValue, top: isMobile ? mobileTopValue || topValue : topValue }">
</template>



<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const isMobile = ref(window.innerWidth <= 480);

const updateScreenSize = () => {
  isMobile.value = window.innerWidth <= 480;
};

window.addEventListener("resize", updateScreenSize);
const props = defineProps({
  category: String
});

const route = useRoute();
const randomImage = ref("");
const leftValue = ref("");
const topValue = ref("");

const imageSets = {
  home: [
    { src: "/p-1s.png", left: "-170px" },
    { src: "/f-1s.png", left: "370px" }
  ],
  ordstriden: [
    { src: "/p-f2.png", left: "-45px", top: "0px", mobileTop: "15px" },
    { src: "/p-k2.png", left: "-45px", top: "0px", mobileTop: "-5px" }
  ]
};

const selectedImageSet = computed(() => imageSets[props.category] || imageSets.home);
const mobileTopValue = ref("");

function choosePic() {
  const randomNum = Math.floor(Math.random() * selectedImageSet.value.length);
  const selectedImage = selectedImageSet.value[randomNum];
  console.log("Laddar bild:", selectedImage.src); // Debugging
  randomImage.value = selectedImage.src;
  leftValue.value = selectedImage.left;
  topValue.value = selectedImage.top;
  mobileTopValue.value = selectedImage.mobileTop || selectedImage.top;
}

onMounted(() => {
  choosePic();
});

watch(route, () => {
  choosePic();
});
</script>

<style scoped>
.character-image {
  z-index: 10;
  margin-top: 40px;
  position: absolute;
  transform: translateY(-50%);
}
</style>
