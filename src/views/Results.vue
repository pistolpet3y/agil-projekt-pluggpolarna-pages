<script setup>
import { ref } from 'vue';
import Chart from '../components/Chart.vue';

const correctAnswers = ref(7); // Exempelvärde, ska komma från quiz-logiken
</script>

<style></style>

<template>
    <div>
        <h3>Ditt resultat</h3>
        <Chart :correctAnswers="correctAnswers" />
    </div>
</template>
