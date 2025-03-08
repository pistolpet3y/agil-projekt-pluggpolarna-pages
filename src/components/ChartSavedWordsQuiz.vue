<script setup>
import { ref, onMounted, computed } from 'vue'; // ref gör variabler, onMounted körs när komponenten är klar.
import Chart from 'chart.js/auto';

// Definiera props som kommer från föräldern
const { correctAnswers, errorWords } = defineProps({
  correctAnswers: Number,
  errorWords: Array,
});

// Längd på ordlistan
const totalQuestions = computed(() => {
  return (correctAnswers || 0) + (errorWords.length || 0);
});


const chartCanvas = ref(null);
const chartInstance = ref(null);

onMounted(() => {
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }

  // Skapa Chart.js-diagrammet
  chartInstance.value = new Chart(chartCanvas.value, {
    type: 'pie',
    data: {
      labels: ['Rätt', 'Fel'],
      datasets: [
        {
          label: 'Ditt resultat',
          data: [correctAnswers, errorWords.length],
          backgroundColor: ['#7dffcb', '#F5505D'], // #A4FFA7
          borderColor: '#111',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          onClick: (e) => e.stopImmediatePropagation(), // Inaktiverar klickbar label
        },
      },
    },
  });
});
</script>

<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<style scoped>
canvas {
  width: 100%;
  max-width: 300px;
  max-height: 300px;
  margin: auto;
}
</style>