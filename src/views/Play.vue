<template>
    <div class="button-container">
        <div class="button-wrapper">
            <button class="glos-quiz" @mouseover="playSound">Glosquiz!</button>
            <p>Träna dina glosor på ett roligt sätt!</p>
        </div>
        <div class="button-wrapper">
            <button class="mattemagi" @mouseover="playSound">Mattemagi!</button>
            <p>Ett magiskt sätt att lära dig multiplikation!</p>
        </div>
        <div class="button-wrapper">
            <button class="ordstriden" @mouseover="playSound">Ordstriden!</button>
            <p>En spännande kamp för att bemästra stavning!</p>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import hoverSound from '@/assets/hover-sound.mp3';

// Funktion för att spela upp ljudet
const playSound = () => {
    const audio = new Audio(hoverSound);
    audio.play();
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Baloo+2:wght@400;700&display=swap');

div {
    background-color: #f0ebe2
}

.glos-quiz {
    background-color: #f77f00;
}

.ordstriden {
    background-color: #4cb5f5
}

.mattemagi {
    background-color: #7dffcb
}

p {
    font-family: 'Bangers', sans-serif;
}


.button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.button-wrapper {
    text-align: center;
}

button {
    background-color: #f77f00;
    color: white;
    border: 3px solid black;
    padding: 10px 20px;
    font-size: 16px;
    font-family: 'Bangers', sans-serif;
    cursor: pointer;
    border-radius: 10px;
    transition: background-color 0.3s ease;
    /* Smidig hover-effekt */
}

button:hover {
    background-color: #ff99cc;
    animation: wiggle 0.5s ease-in-out infinite;
}

@keyframes wiggle {
    0% {
        transform: rotate(0deg);
    }

    25% {
        transform: rotate(5deg);
    }

    50% {
        transform: rotate(-5deg);
    }

    75% {
        transform: rotate(5deg);
    }

    100% {
        transform: rotate(0deg);
    }
}
</style>
