let gameseq = [];
let userseq = [];
let btns = ["green", "red", "yellow", "purple"];

let started = false;
let level = 0;
let highestScore = localStorage.getItem("highestScore") || 0;


let h2 = document.querySelector("#game-message");
let startBtn = document.querySelector("#start-btn");
let highestScoreDisplay = document.querySelector("#highest-score");

// Display the highest score on page load
highestScoreDisplay.innerText = `Highest Score: ${highestScore}`;

// Function to Start the Game
function startGame() {
    
    if (!started) {
        console.log("Game Started");
        started = true;
        startBtn.style.display = "none"; // Hide the button after game starts
        levelup();
    }
}

// Listen for keypress (for desktop users)
document.addEventListener("keypress", startGame);

// Listen for button click (for mobile users)
startBtn.addEventListener("click", startGame);

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {  
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameseq.push(randColor);
   // console.log(gameseq);
    gameFlash(randBtn);
}


function check(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
         // Update highest score if the current level is greater
         if (level > highestScore) {
            highestScore = level;
            localStorage.setItem("highestScore", highestScore); // Save the new highest score
            highestScoreDisplay.innerText = `Highest Score: ${highestScore}`;
        }
        
        h2.innerText = `Game Over! Your score is ${level}. Tap the button to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => document.querySelector("body").style.backgroundColor = "white", 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userseq.push(userColor);
    check(userseq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach((btn) => btn.addEventListener("click", btnPress));

function reset() {
    level = 0;
    gameseq = [];
    userseq = [];
    started = false;
    startBtn.style.display = "inline-block"; // Show the button again
}
