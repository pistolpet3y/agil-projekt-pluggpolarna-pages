<template>
  <div>
    <button :class="buttonClass" @click="openInfo" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <img :src="currentSrc" alt="Info button" />
    </button>
    <div v-if="showInfo" :class="modalClass">
      <div class="modal-content">
        <span class="close" @click="openInfo">&times;</span>
        <p>{{ infoContent }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  infoContent: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'green'
  }
});

const showInfo = ref(false);
const defaultSrc = `/info/info-${props.color}.png`;
const hoverSrc = `/info/info-pink.png`;
const currentSrc = ref(defaultSrc);

const openInfo = () => {
  showInfo.value = !showInfo.value;
};

const onMouseEnter = () => {
  currentSrc.value = hoverSrc;
};

const onMouseLeave = () => {
  currentSrc.value = defaultSrc;
};

const buttonClass = computed(() => `info-button info-${props.color}`);
const modalClass = computed(() => `modal modal-${props.color}`);
</script>

<style scoped>
.info-button {
  display: inline-block;
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  background: none;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
  flex-shrink: 0;
}

.info-button img {
  width: 100%;
  height: 100%;
}

.modal {
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(15px);
  z-index: 1000;
}

.modal-content {
  position: relative;
  padding: 20px;
  background: #fff;
  max-width: 375px;
  border-radius: 15px;
  border: 3px solid #111;
  background: linear-gradient(to bottom,
      lightblue 0%,
      lightblue 66%,
      #FFF8E1 100%);
}

.close {
  position: absolute;
  top: 1px;
  right: 8px;
  font-size: 1.8em;
  cursor: pointer;
}

@media only screen and (max-width: 480px) {
  .info-button {
    width: 22px;
    height: 22px;
  }
}
</style>