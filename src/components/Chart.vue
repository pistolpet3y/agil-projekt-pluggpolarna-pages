<script setup>
import { ref, defineProps, onMounted } from 'vue'; // ref gör variabler, defineProps tillgängligör props, onMounted körs när komponentetn är klar.
import Chart from 'chart.js/auto';



// props som kommer från föräldern results.vue
const props = defineProps({
  correctAnswers: Number,
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
          data: [props.correctAnswers, 10 - props.correctAnswers],
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