<script setup>
import { ref, defineProps, onMounted } from 'vue'; // ref gör variabler, defineProps tillgängligör props, onMounted körs när komponentetn är klar. 
import Chart from 'chart.js/auto';

const props = defineProps({
    correctAnswers: {
        type: Number,
    }
});

// Variabler för resultatvisning
const perfectScore = ref(false);
const mediumScore = ref(false);
const lowerScore = ref(false);
const errorWords = ref(['apple', 'banana']); // Exempel på felaktiga ord


// Funktion för att visa stjärnor (när 10/10 är korrekt)
const showStars = () => {
    console.log('Grattis! Du fick 10 rätt, här är dina stjärnor! ✨');
};

// Funktion för att visa felaktiga ord
const showErrorWords = () => {
    console.log('De här orden fick du fel på:', errorWords.value);
};


const chartCanvas = ref(null);

onMounted(() => {
    if (props.correctAnswers === 10) {
        perfectScore.value = true;
        showStars(); // Kör funktionen för stjärnorna
    } else if (props.correctAnswers >= 7) {
        mediumScore.value = true;
        showErrorWords(); // Kör funktionen för felaktiga ord
    } else {
        lowerScore.value = true;
        showErrorWords(); // Kör funktionen för felaktiga ord
    }

    // Skapa Chart.js-diagrammet
    new Chart(chartCanvas.value, {
        type: 'pie',
        data: {
            labels: ['Rätt', 'Fel'],
            datasets: [
                {
                    label: 'Ditt resultat',
                    data: [props.correctAnswers, 10 - props.correctAnswers],
                    backgroundColor: ['#A4FFA7', '#F5505D'],
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    onClick: (e) => e.stopImmediatePropagation(), // Inaktiverar klickbar legend
                },
            },
        },
    });
});
</script>

<template>
    <canvas ref="chartCanvas"></canvas>
    <p v-if="perfectScore">Du hade alla rätt! Enastående, vilken stjärna!</p>
    <p v-if="mediumScore">Du har xx rätt! Bra jobbat! Du behöver jobba vidare på följande ord:</p>
    <p v-if="lowerScore"> Du hade xx rätt. Fortsätt kämpa! Du behöver jobba vidare på följande ord:</p>
    <ul v-if="mediumScore || lowerScore">
        <li v-for="word in errorWords" :key="word"> {{ word }}</li>
    </ul>
</template>

<style scoped>
canvas {
    max-width: 200px;
    max-height: 200px;
    margin: auto;
}
</style>