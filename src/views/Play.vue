<template>
    <div class="button-container">
        <div class="button-wrapper">
            <RouterLink to="/quiz">
                <button class="glos-quiz" @mouseover="playSound">Glosquiz!</button>
            </RouterLink>
            <p class="orange">Träna dina glosor på ett roligt sätt!</p>
        </div>
        <div class="button-wrapper">
            <button class="mattemagi" @mouseover="playSound">Mattemagi!</button>
            <p class="green">Ett magiskt sätt att lära dig multiplikation!</p>
        </div>
        <div class="button-wrapper">
            <button class="ordstriden" @mouseover="playSound">Ordstriden!</button>
            <p class="blue">En spännande kamp för att bemästra stavning!</p>
        </div>
    </div>
</template>

<script setup>

// Funktion för att spela upp hoverljud
const hoverSound = '/hover-sound.mp3'
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
    text-shadow:
        -1px -1px 0 black,
        1px -1px 0 black,
        -1px 1px 0 black,
        1px 1px 0 black;
}

.blue {
    color: #4cb5f5;
}

.green {
    color: #7dffcb;
}

.orange {
    color: #f77f00;
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

    color: black;
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
