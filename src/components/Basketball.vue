<template>
  <img ref="basketball" src="/ball.png" alt="Basketboll" id="basketball" @click="handleClick" />
</template>

<script setup>
import { ref } from 'vue';

const basketball = ref(null);

function handleClick() {
  if (basketball.value) {
    basketball.value.classList.remove('bounce');
    // Tvingar fram en reflow så att animationen kan starta om
    void basketball.value.offsetWidth;
    basketball.value.classList.add('bounce');
  }
}
</script>

<style scoped>
#basketball {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 10;
  width: 30px;
  cursor: pointer;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.5));
}

.bounce {
  animation: bounce 1s ease;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }

  30% {
    transform: translateY(-50px);
  }

  50% {
    transform: translateY(0);
  }

  70% {
    transform: translateY(-20px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
