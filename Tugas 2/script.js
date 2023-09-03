const char = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const playerScore = document.getElementById("score");

let score = 0;
let interval = null;

let jumlahScore = () => {
    score++;
    playerScore.innerHTML = `Score: ${score}`;
};

function jump(event) {
    if (event.keyCode === 32 && char.classList != "animate") {
        char.classList.add("animate");
        setTimeout(function () {
            char.classList.remove("animate");
        }, 500);
        interval = setInterval(jumlahScore, 100);
    }
}

document.addEventListener("keypress", jump);

const HitCactus = setInterval(function () {
    const charTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"));
    const cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    if (cactusLeft < 90 && cactusLeft > 0 && charTop >= 100) {
        cactus.style.animation = "none";
        cactus.style.display = "none";
        clearInterval(HitCactus); // Menghentikan interval HitCactus agar tidak terus berjalan setelah game over
        if (confirm("Game Over")) {
            window.location.reload();
        }
    }
}, 10);
